const { app, BrowserWindow, clipboard, desktopCapturer, ipcMain, screen, session, shell, systemPreferences, WebContentsView, webContents } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { createKey, decryptWithKey, encryptWithKey, unlockEnvelope } = require('./secure-store');

// AI Messenger uses its own standalone encrypted vault and must never initialize
// a platform credential store. Chromium otherwise creates a "Safe Storage"
// entry in macOS Keychain even though the app never calls Electron safeStorage.
if (process.platform === 'darwin') app.commandLine.appendSwitch('use-mock-keychain');

const captureCache = new Map();
const modelDiscoveryCache = new Map();
const activeChatRequests = new Map();
const EMPTY_STATE = { version: 3, profiles: [], profileGroups: [], sessions: [], chatArchives: [], groups: [], configuration: {}, connection: {}, preferences: {}, userProfile: {} };
const MAX_STATE_BYTES = 10 * 1024 * 1024;
const MAX_API_KEY_LENGTH = 8192;
let vaultKey = null;
let vaultSalt = null;
let activeState = null;
const chatWindows = new Set();
const chatWindowsByProfile = new Map();
const detachedChatViews = new Map();
const backgroundChatViews = new Map();
const contentsOwners = new Map();
const unreadChats = new Set();
let appOnline = true;
const CONTACT_PANE_WIDTH = 420;
let contactWindow = null;
let dockedChatView = null;
let dockedModel = '';
let dockedProfileId = '';
let dockedChatKey = '';
let dockedChatQuery = null;

if (!app.isPackaged) {
  const developmentProfile = process.argv.find((argument) => argument.startsWith('--development-user-data-dir='));
  if (developmentProfile) app.setPath('userData', path.resolve(developmentProfile.slice('--development-user-data-dir='.length)));
}

function rendererUrls() {
  return new Set(['index.html', 'contact.html'].map((filename) => pathToFileURL(path.join(__dirname, filename)).href));
}

function assertTrustedSender(event) {
  if (!event?.senderFrame) throw new Error('Blocked an untrusted application request.');
  const senderUrl = new URL(event.senderFrame.url);
  senderUrl.search = '';
  senderUrl.hash = '';
  if (!rendererUrls().has(senderUrl.href)) {
    throw new Error('Blocked an untrusted application request.');
  }
}

function handle(channel, handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    try {
      assertTrustedSender(event);
      return await handler(...args);
    } catch (error) {
      console.error(`[AI Messenger security] ${channel} failed: ${error.message}`);
      throw error;
    }
  });
}

function handleWithEvent(channel, handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    try {
      assertTrustedSender(event);
      return await handler(event, ...args);
    } catch (error) {
      console.error(`[AI Messenger security] ${channel} failed: ${error.message}`);
      throw error;
    }
  });
}

function requireOnline() {
  if (!appOnline) throw new Error('AI Messenger is Offline. Set your status to Online to reconnect to Ollama.');
}

function broadcastConnectionStatus() {
  for (const contents of webContents.getAllWebContents()) {
    if (!contents.isDestroyed()) contents.send('connection:status-changed', { online: appOnline });
  }
}

function browserWindowOptions(overrides = {}) {
  return {
    frame: false,
    icon: path.join(__dirname, '..', 'assets', 'ai-messenger-1024.png'),
    backgroundColor: '#ece9d8',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: true,
      spellcheck: false,
      devTools: !app.isPackaged,
    },
    ...overrides,
  };
}

function secureViewContents(contents) {
  contents.on('will-navigate', (event) => event.preventDefault());
  contents.on('will-redirect', (event) => event.preventDefault());
  contents.setWindowOpenHandler(() => ({ action: 'deny' }));
  return contents;
}

function secureWindow(win) {
  secureViewContents(win.webContents);
  return win;
}

function createContactWindow() {
  const win = new BrowserWindow({
    ...browserWindowOptions(),
    width: 420,
    height: 680,
    minWidth: 360,
    minHeight: 520,
  });
  contactWindow = win;
  win.on('resize', layoutDockedChat);
  win.on('closed', () => {
    if (dockedChatView) {
      contentsOwners.delete(dockedChatView.webContents.id);
      if (!dockedChatView.webContents.isDestroyed()) dockedChatView.webContents.close();
    }
    for (const entry of backgroundChatViews.values()) {
      contentsOwners.delete(entry.view.webContents.id);
      if (!entry.view.webContents.isDestroyed()) entry.view.webContents.close();
    }
    backgroundChatViews.clear();
    dockedChatView = null;
    dockedModel = '';
    dockedProfileId = '';
    dockedChatKey = '';
    dockedChatQuery = null;
    contactWindow = null;
  });
  win.webContents.on('did-finish-load', sendDockState);
  secureWindow(win).loadFile(path.join(__dirname, 'contact.html'));
}

function validProfileId(profileId) {
  if (typeof profileId !== 'string' || !/^[a-zA-Z0-9-]{1,80}$/.test(profileId)) throw new Error('Invalid AI profile.');
  return profileId;
}

function createChatWindow(profileId, model) {
  const selectedProfileId = validProfileId(profileId);
  const selectedModel = validModel(model);
  const existing = chatWindowsByProfile.get(selectedProfileId);
  if (existing && !existing.isDestroyed()) {
    if (existing.isMinimized()) existing.restore();
    existing.show();
    existing.focus();
    return existing;
  }
  const win = new BrowserWindow({
    ...browserWindowOptions(),
    width: 920,
    height: 700,
    minWidth: 720,
    minHeight: 560,
  });
  chatWindows.add(win);
  chatWindowsByProfile.set(selectedProfileId, win);
  win.on('closed', () => {
    chatWindows.delete(win);
    if (chatWindowsByProfile.get(selectedProfileId) === win) chatWindowsByProfile.delete(selectedProfileId);
  });
  secureWindow(win).loadFile(path.join(__dirname, 'index.html'), { query: { profileId: selectedProfileId, model: selectedModel } });
  return win;
}

function normalizeChatParticipants(value) {
  if (!Array.isArray(value)) throw new Error('Choose at least two assistants.');
  return value.map((entry) => {
    if (typeof entry === 'string') return { id: '', model: validModel(entry) };
    if (!entry || typeof entry !== 'object') throw new Error('Invalid AI profile.');
    return {
      id: typeof entry.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(entry.id) ? entry.id : '',
      model: validModel(entry.model),
    };
  }).filter((entry, index, list) => list.findIndex((other) => (entry.id && other.id === entry.id) || (!entry.id && other.model === entry.model)) === index).slice(0, 8);
}

function createGroupChatWindow(participants, groupName, groupId = '') {
  const selectedParticipants = normalizeChatParticipants(participants);
  const models = selectedParticipants.map((participant) => participant.model);
  const win = new BrowserWindow({
    ...browserWindowOptions(),
    width: 960,
    height: 720,
    minWidth: 760,
    minHeight: 580,
  });
  chatWindows.add(win);
  win.on('closed', () => chatWindows.delete(win));
  secureWindow(win).loadFile(path.join(__dirname, 'index.html'), {
    query: { groupProfiles: JSON.stringify(selectedParticipants), groupModels: JSON.stringify(models), groupName, groupId },
  });
  return win;
}

function validModel(model) {
  if (typeof model !== 'string' || !model.trim() || model.length > 200) throw new Error('Invalid local model.');
  return model.trim();
}

function setChatUnread(chatId, unread) {
  const selectedChat = typeof chatId === 'string' && /^[a-zA-Z0-9-:|.]{1,200}$/.test(chatId) ? chatId : validModel(chatId);
  if (unread) unreadChats.add(selectedChat);
  else unreadChats.delete(selectedChat);
  if (contactWindow && !contactWindow.isDestroyed() && !contactWindow.webContents.isLoading()) {
    contactWindow.webContents.send('chat:unread-changed', { chatId: selectedChat, model: selectedChat, unread: Boolean(unread) });
  }
  return [...unreadChats];
}

function sendDockState() {
  if (contactWindow && !contactWindow.isDestroyed() && !contactWindow.webContents.isLoading()) {
    contactWindow.webContents.send('chat:dock-state', { docked: Boolean(dockedChatView), model: dockedModel, profileId: dockedProfileId });
  }
}

function layoutDockedChat() {
  if (!contactWindow || contactWindow.isDestroyed() || !dockedChatView) return;
  const [width, height] = contactWindow.getContentSize();
  dockedChatView.setBounds({ x: CONTACT_PANE_WIDTH, y: 0, width: Math.max(1, width - CONTACT_PANE_WIDTH), height });
}

function expandContactWindow() {
  if (!contactWindow || contactWindow.isDestroyed()) return;
  if (contactWindow.isMaximized()) contactWindow.unmaximize();
  const current = contactWindow.getBounds();
  const workArea = screen.getDisplayMatching(current).workArea;
  const width = Math.min(1260, workArea.width);
  const height = Math.min(Math.max(current.height, 680), workArea.height);
  const x = Math.max(workArea.x, Math.min(current.x, workArea.x + workArea.width - width));
  const y = Math.max(workArea.y, Math.min(current.y, workArea.y + workArea.height - height));
  contactWindow.setMinimumSize(Math.min(900, width), Math.min(520, height));
  contactWindow.setBounds({ x, y, width, height });
}

function attachDockedConversation(key, query, model = '') {
  if (!contactWindow || contactWindow.isDestroyed()) throw new Error('The contact window is not available.');
  expandContactWindow();
  if (dockedChatKey === key && dockedChatView && !dockedChatView.webContents.isDestroyed()) {
    layoutDockedChat();
    return { docked: true, model: dockedModel, profileId: dockedProfileId, key: dockedChatKey };
  }
  if (dockedChatView) {
    contactWindow.contentView.removeChildView(dockedChatView);
    contentsOwners.delete(dockedChatView.webContents.id);
    backgroundChatViews.set(dockedChatKey, {
      view: dockedChatView,
      key: dockedChatKey,
      query: dockedChatQuery,
      model: dockedModel,
    });
    dockedChatView = null;
    dockedModel = '';
    dockedProfileId = '';
    dockedChatKey = '';
    dockedChatQuery = null;
  }
  const detached = detachedChatViews.get(key);
  if (detached && !detached.view.webContents.isDestroyed()) {
    detached.moving = true;
    detached.win.contentView.removeChildView(detached.view);
    detached.win.destroy();
    detachedChatViews.delete(key);
    dockedChatView = detached.view;
    contactWindow.contentView.addChildView(dockedChatView);
    contentsOwners.set(dockedChatView.webContents.id, contactWindow);
    dockedChatView.webContents.send('chat:view-mode', { docked: true, model, profileId: query.profileId || '' });
  } else if (backgroundChatViews.has(key)) {
    const background = backgroundChatViews.get(key);
    backgroundChatViews.delete(key);
    dockedChatView = background.view;
    contactWindow.contentView.addChildView(dockedChatView);
    contentsOwners.set(dockedChatView.webContents.id, contactWindow);
    dockedChatView.webContents.send('chat:view-mode', { docked: true, model, profileId: query.profileId || '' });
  } else {
    dockedChatView = new WebContentsView({ webPreferences: browserWindowOptions().webPreferences });
    secureViewContents(dockedChatView.webContents);
    dockedChatView.setBackgroundColor('#eaf4ff');
    contactWindow.contentView.addChildView(dockedChatView);
    contentsOwners.set(dockedChatView.webContents.id, contactWindow);
    dockedChatView.webContents.loadFile(path.join(__dirname, 'index.html'), { query: { ...query, docked: '1' } });
  }
  dockedModel = model;
  dockedProfileId = query.profileId || '';
  dockedChatKey = key;
  dockedChatQuery = query;
  layoutDockedChat();
  sendDockState();
  return { docked: true, model, profileId: dockedProfileId, key };
}

function attachDockedChat(profileId, model) {
  const selectedProfileId = validProfileId(profileId);
  const selectedModel = validModel(model);
  const existing = chatWindowsByProfile.get(selectedProfileId);
  if (existing && !existing.isDestroyed()) existing.close();
  return attachDockedConversation(`profile:${selectedProfileId}`, { profileId: selectedProfileId, model: selectedModel }, selectedModel);
}

function attachDockedGroup(participants, groupName, groupId = '') {
  const selectedParticipants = normalizeChatParticipants(participants);
  const selectedModels = selectedParticipants.map((participant) => participant.model);
  if (selectedParticipants.length < 2) throw new Error('Choose at least two different assistants.');
  const safeName = typeof groupName === 'string' ? groupName.trim().slice(0, 60) : '';
  if (!safeName) throw new Error('Enter a group name.');
  const safeId = typeof groupId === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(groupId) ? groupId : '';
  const key = `group:${safeId || selectedParticipants.map((participant) => participant.id || participant.model).sort().join('|')}`;
  return attachDockedConversation(key, { groupProfiles: JSON.stringify(selectedParticipants), groupModels: JSON.stringify(selectedModels), groupName: safeName, groupId: safeId }, '');
}

function hostDetachedChatView(view, key, query, model) {
  const win = new BrowserWindow({
    ...browserWindowOptions(),
    width: 920,
    height: 700,
    minWidth: 720,
    minHeight: 560,
  });
  const detached = { view, win, key, query, model, moving: false };
  detachedChatViews.set(key, detached);
  chatWindows.add(win);
  win.contentView.addChildView(view);
  const layout = () => {
    const [width, height] = win.getContentSize();
    view.setBounds({ x: 0, y: 0, width, height });
  };
  contentsOwners.set(view.webContents.id, win);
  win.on('resize', layout);
  win.on('closed', () => {
    chatWindows.delete(win);
    if (detachedChatViews.get(key) === detached) detachedChatViews.delete(key);
    contentsOwners.delete(view.webContents.id);
    if (!detached.moving && !view.webContents.isDestroyed()) view.webContents.close();
  });
  layout();
  view.webContents.send('chat:view-mode', { docked: false, model });
  return win;
}

function detachDockedChat() {
  if (!contactWindow || contactWindow.isDestroyed() || !dockedChatView) return { detached: false };
  const view = dockedChatView;
  const key = dockedChatKey;
  const query = dockedChatQuery;
  const model = dockedModel;
  contactWindow.contentView.removeChildView(view);
  dockedChatView = null;
  dockedModel = '';
  dockedProfileId = '';
  dockedChatKey = '';
  dockedChatQuery = null;
  contactWindow.setMinimumSize(360, 520);
  const bounds = contactWindow.getBounds();
  contactWindow.setBounds({ ...bounds, width: CONTACT_PANE_WIDTH });
  sendDockState();
  hostDetachedChatView(view, key, query, model);
  return { detached: true, model, key };
}

function closeDockedChat() {
  if (!contactWindow || contactWindow.isDestroyed() || !dockedChatView) return { closed: false };
  const view = dockedChatView;
  dockedChatView = null;
  dockedModel = '';
  dockedProfileId = '';
  dockedChatKey = '';
  dockedChatQuery = null;
  contactWindow.contentView.removeChildView(view);
  contentsOwners.delete(view.webContents.id);
  if (!view.webContents.isDestroyed()) view.webContents.close();
  contactWindow.setMinimumSize(360, 520);
  const bounds = contactWindow.getBounds();
  contactWindow.setBounds({ ...bounds, width: CONTACT_PANE_WIDTH });
  sendDockState();
  return { closed: true };
}

function closeProfileConversation(profileId) {
  const selectedProfileId = validProfileId(profileId);
  const key = `profile:${selectedProfileId}`;
  const queryContainsProfile = (query) => {
    if (query?.profileId === selectedProfileId) return true;
    try {
      return JSON.parse(query?.groupProfiles || '[]').some((participant) => participant?.id === selectedProfileId);
    } catch {
      return false;
    }
  };
  let closed = 0;
  if (dockedChatView && (dockedChatKey === key || queryContainsProfile(dockedChatQuery))) {
    contactWindow.contentView.removeChildView(dockedChatView);
    contentsOwners.delete(dockedChatView.webContents.id);
    if (!dockedChatView.webContents.isDestroyed()) dockedChatView.webContents.close();
    dockedChatView = null;
    dockedModel = '';
    dockedProfileId = '';
    dockedChatKey = '';
    dockedChatQuery = null;
    contactWindow.setMinimumSize(360, 520);
    const bounds = contactWindow.getBounds();
    contactWindow.setBounds({ ...bounds, width: CONTACT_PANE_WIDTH });
    sendDockState();
    closed += 1;
  }
  for (const [backgroundKey, background] of backgroundChatViews) {
    if (backgroundKey !== key && !queryContainsProfile(background.query)) continue;
    backgroundChatViews.delete(backgroundKey);
    contentsOwners.delete(background.view.webContents.id);
    if (!background.view.webContents.isDestroyed()) background.view.webContents.close();
    closed += 1;
  }
  for (const detached of [...detachedChatViews.values()]) {
    if (detached.key !== key && !queryContainsProfile(detached.query)) continue;
    detached.win.close();
    closed += 1;
  }
  const standalone = chatWindowsByProfile.get(selectedProfileId);
  if (standalone && !standalone.isDestroyed()) {
    standalone.close();
    closed += 1;
  }
  setChatUnread(selectedProfileId, false);
  return { closed };
}

function closeModelConversation(model) {
  const selectedModel = validModel(model);
  const key = `model:${selectedModel}`;
  const queryContainsModel = (query) => {
    if (query?.model === selectedModel) return true;
    try {
      return JSON.parse(query?.groupModels || '[]').includes(selectedModel);
    } catch {
      return false;
    }
  };
  let closed = 0;
  if (dockedChatView && (dockedChatKey === key || queryContainsModel(dockedChatQuery))) {
    contactWindow.contentView.removeChildView(dockedChatView);
    contentsOwners.delete(dockedChatView.webContents.id);
    if (!dockedChatView.webContents.isDestroyed()) dockedChatView.webContents.close();
    dockedChatView = null;
    dockedModel = '';
    dockedProfileId = '';
    dockedChatKey = '';
    dockedChatQuery = null;
    contactWindow.setMinimumSize(360, 520);
    const bounds = contactWindow.getBounds();
    contactWindow.setBounds({ ...bounds, width: CONTACT_PANE_WIDTH });
    sendDockState();
    closed += 1;
  }
  for (const [backgroundKey, background] of backgroundChatViews) {
    if (backgroundKey !== key && !queryContainsModel(background.query)) continue;
    backgroundChatViews.delete(backgroundKey);
    contentsOwners.delete(background.view.webContents.id);
    if (!background.view.webContents.isDestroyed()) background.view.webContents.close();
    closed += 1;
  }
  for (const detached of [...detachedChatViews.values()]) {
    if (detached.key !== key && !queryContainsModel(detached.query)) continue;
    detached.win.close();
    closed += 1;
  }
  return { closed };
}

function normalizeConnection(value = {}) {
  const provider = value.provider === 'openai' ? 'openai' : 'ollama';
  const rawUrl = String(value.baseUrl || 'http://127.0.0.1:11434').trim().replace(/\/$/, '');
  const parsed = new URL(rawUrl);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('The local model URL must use http or https.');
  if (!['localhost', '127.0.0.1', '::1'].includes(parsed.hostname)) throw new Error('For safety, AI Messenger connects only to a model server on this device.');
  const timeoutSeconds = Math.min(600, Math.max(10, Number(value.timeoutSeconds) || 120));
  return {
    provider,
    baseUrl: parsed.href.replace(/\/$/, ''),
    apiKey: typeof value.apiKey === 'string' && value.apiKey.length <= MAX_API_KEY_LENGTH ? value.apiKey : '',
    keepAlive: typeof value.keepAlive === 'string' && value.keepAlive.trim() ? value.keepAlive.trim() : '10m',
    visionEnabled: Boolean(value.visionEnabled),
    timeoutSeconds,
  };
}

async function resolveConnection(value) {
  const connection = normalizeConnection(value);
  if (connection.provider === 'openai' && !connection.apiKey) connection.apiKey = await loadApiKey();
  if (connection.provider === 'ollama') connection.apiKey = '';
  return connection;
}

function providerUrl(connection, route) {
  let root = connection.baseUrl;
  if (connection.provider === 'ollama') root = root.replace(/\/api$/, '');
  if (connection.provider === 'openai' && !root.endsWith('/v1')) root += '/v1';
  return `${root}${route}`;
}

async function localModelJson(connectionValue, route, options = {}) {
  const connection = await resolveConnection(connectionValue);
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (connection.apiKey) headers.Authorization = `Bearer ${connection.apiKey}`;
  const requestSignal = options.signal
    ? AbortSignal.any([options.signal, AbortSignal.timeout(connection.timeoutSeconds * 1000)])
    : AbortSignal.timeout(connection.timeoutSeconds * 1000);
  const response = await fetch(providerUrl(connection, route), {
    ...options,
    headers,
    signal: requestSignal,
  });
  if (!response.ok) throw new Error(`Local model server returned ${response.status}: ${await response.text()}`);
  return response.json();
}

handle('ollama:models', async (connectionValue, forceRefresh = false) => {
  requireOnline();
  const connection = await resolveConnection(connectionValue);
  const cacheKey = JSON.stringify({ provider: connection.provider, baseUrl: connection.baseUrl, visionEnabled: connection.visionEnabled });
  if (forceRefresh) modelDiscoveryCache.delete(cacheKey);
  const cached = modelDiscoveryCache.get(cacheKey);
  if (cached?.data && cached.expiresAt > Date.now()) return structuredClone(cached.data);
  if (cached?.promise) return structuredClone(await cached.promise);
  const request = (async () => {
    if (connection.provider === 'openai') {
      const data = await localModelJson(connection, '/models');
      return (data.data || []).map(({ id }) => ({ name: id, details: {}, capabilities: ['completion', ...(connection.visionEnabled ? ['vision'] : [])] }));
    }
    const [data, running] = await Promise.all([
      localModelJson(connection, '/api/tags'),
      localModelJson(connection, '/api/ps').catch(() => ({ models: [] })),
    ]);
    const loadedByName = new Map((running.models || []).map((model) => [model.name, model]));
    return data.models.map(({ name, details, capabilities = [], size = 0, modified_at: modifiedAt = '' }) => {
      const loaded = loadedByName.get(name);
      return {
        name,
        details,
        capabilities,
        size: Number(size) || 0,
        modifiedAt,
        loadedSize: Number(loaded?.size) || 0,
        loadedVram: Number(loaded?.size_vram) || 0,
        expiresAt: loaded?.expires_at || '',
      };
    });
  })();
  modelDiscoveryCache.set(cacheKey, { promise: request, data: null, expiresAt: 0 });
  try {
    const models = await request;
    modelDiscoveryCache.set(cacheKey, { data: models, expiresAt: Date.now() + 15_000 });
    return structuredClone(models);
  } catch (error) {
    modelDiscoveryCache.delete(cacheKey);
    throw error;
  }
});

handle('ollama:test', async (connectionValue) => {
  requireOnline();
  const connection = await resolveConnection(connectionValue);
  if (connection.provider === 'openai') {
    const data = await localModelJson(connection, '/models');
    return { ok: true, message: `Connected. Found ${(data.data || []).length} models.` };
  }
  const data = await localModelJson(connection, '/api/version');
  return { ok: true, message: `Connected to Ollama${data.version ? ` ${data.version}` : ''}.` };
});

handle('ollama:discover', async (connectionValue = {}) => {
  requireOnline();
  const candidates = [];
  try {
    const configured = normalizeConnection({ ...connectionValue, provider: 'ollama' });
    candidates.push(configured.baseUrl);
  } catch {
    // Ignore an incomplete manual setup and continue with the standard endpoint.
  }
  candidates.push('http://127.0.0.1:11434');
  for (const baseUrl of [...new Set(candidates)]) {
    const candidate = { provider: 'ollama', baseUrl, preferredModel: '', timeoutSeconds: 10, keepAlive: '10m', visionEnabled: false };
    try {
      const [version, tags] = await Promise.all([
        localModelJson(candidate, '/api/version'),
        localModelJson(candidate, '/api/tags'),
      ]);
      const models = Array.isArray(tags.models) ? tags.models : [];
      return {
        connection: { ...candidate, preferredModel: models[0]?.name || '' },
        version: typeof version.version === 'string' ? version.version : '',
        models: models.map((model) => ({ name: model.name, details: model.details || {}, capabilities: model.capabilities || [] })).slice(0, 200),
      };
    } catch {
      // Try the next explicitly allowed loopback endpoint.
    }
  }
  throw new Error('Ollama was not detected on this device. Start Ollama or choose Manual configuration.');
});

handleWithEvent('ollama:chat', async (event, payload) => {
  requireOnline();
  if (!payload || typeof payload.model !== 'string' || !Array.isArray(payload.messages)) {
    throw new Error('Invalid chat request.');
  }
  if (payload.model.length > 200 || payload.messages.length > 24) throw new Error('Chat request is too large.');
  const requestId = typeof payload.requestId === 'string' && /^[a-zA-Z0-9-]{1,100}$/.test(payload.requestId) ? payload.requestId : '';
  let requestBytes = 0;
  for (const message of payload.messages) {
    if (!message || !['system', 'user', 'assistant'].includes(message.role) || typeof message.content !== 'string') throw new Error('Invalid chat message.');
    requestBytes += Buffer.byteLength(message.content);
    if (message.images) {
      if (!Array.isArray(message.images) || message.images.length > 2 || message.images.some((image) => typeof image !== 'string')) throw new Error('Invalid chat image.');
      requestBytes += message.images.reduce((total, image) => total + Buffer.byteLength(image), 0);
    }
  }
  if (requestBytes > 30 * 1024 * 1024) throw new Error('Chat request is larger than 30 MB.');
  const systemMessage = payload.messages.find((message) => message.role === 'system');
  const conversation = payload.messages.filter((message) => message.role !== 'system').slice(-23);
  const connection = await resolveConnection(payload.connection);
  const messages = systemMessage ? [systemMessage, ...conversation] : conversation;
  const requestKey = event.sender.id;
  activeChatRequests.get(requestKey)?.controller.abort();
  const controller = new AbortController();
  const abortOnClose = () => controller.abort();
  const activeRequest = { controller, model: payload.model, connection };
  activeChatRequests.set(requestKey, activeRequest);
  event.sender.once('destroyed', abortOnClose);
  try {
    if (connection.provider === 'openai') {
      const openAiMessages = messages.map((message) => {
        if (!message.images?.length) return { role: message.role, content: message.content };
        return {
          role: message.role,
          content: [
            { type: 'text', text: message.content || '' },
            ...message.images.map((image) => ({ type: 'image_url', image_url: { url: `data:image/jpeg;base64,${image}` } })),
          ],
        };
      });
      const data = await localModelJson(connection, '/chat/completions', {
        method: 'POST',
        body: JSON.stringify({ model: payload.model, messages: openAiMessages, stream: false }),
        signal: controller.signal,
      });
      if (!data.choices?.[0]?.message) throw new Error('The OpenAI-compatible server returned no assistant message.');
      return data.choices[0].message;
    }
    const streamConnection = await resolveConnection(connection);
    const response = await fetch(providerUrl(streamConnection, '/api/chat'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: payload.model,
        messages,
        stream: true,
        think: payload.model.toLowerCase().includes('gpt-oss')
          ? (payload.thinkingMode === 'deep' ? 'high' : 'low')
          : payload.thinkingMode === 'deep',
        keep_alive: connection.keepAlive,
      }),
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(connection.timeoutSeconds * 1000)]),
    });
    if (!response.ok) throw new Error(`Local model server returned ${response.status}: ${await response.text()}`);
    if (!response.body) throw new Error('Ollama did not provide a streaming response.');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let message = { role: 'assistant', content: '' };
    const consumeLine = (line) => {
      if (!line.trim()) return;
      const chunk = JSON.parse(line);
      if (chunk.message?.content) {
        message = { ...message, ...chunk.message, content: `${message.content}${chunk.message.content}` };
        if (requestId && !event.sender.isDestroyed()) event.sender.send('ollama:chat-chunk', { requestId, content: chunk.message.content });
      }
    };
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      lines.forEach(consumeLine);
      if (done) break;
    }
    consumeLine(buffer);
    if (!message.content && !message.thinking) throw new Error('Ollama returned no assistant message.');
    return message;
  } catch (error) {
    if (controller.signal.aborted) throw new Error('Generation stopped.');
    throw error;
  } finally {
    event.sender.removeListener('destroyed', abortOnClose);
    if (activeChatRequests.get(requestKey) === activeRequest) activeChatRequests.delete(requestKey);
  }
});
handleWithEvent('ollama:stop', async (event, model, connectionValue) => {
  const request = activeChatRequests.get(event.sender.id);
  if (request) request.controller.abort();
  let unloaded = false;
  if (typeof model === 'string' && model.trim() && connectionValue?.provider !== 'openai') {
    const selectedModel = validModel(model);
    const connection = await resolveConnection(connectionValue);
    await localModelJson(connection, '/api/generate', {
      method: 'POST',
      body: JSON.stringify({ model: selectedModel, keep_alive: 0 }),
    });
    unloaded = true;
  }
  return { stopped: Boolean(request), unloaded };
});
handle('ollama:stop-all', async () => {
  const requests = [...activeChatRequests.values()];
  for (const request of requests) request.controller.abort();
  activeChatRequests.clear();
  for (const contents of webContents.getAllWebContents()) {
    if (!contents.isDestroyed()) contents.send('generation:stop-all');
  }
  const ollamaRequests = requests.filter((request) => request.connection.provider === 'ollama');
  const uniqueModels = new Map(ollamaRequests.map((request) => [
    `${request.connection.baseUrl}\n${request.model}`,
    request,
  ]));
  const unloadResults = await Promise.allSettled([...uniqueModels.values()].map((request) => localModelJson(request.connection, '/api/generate', {
    method: 'POST',
    body: JSON.stringify({ model: request.model, keep_alive: 0 }),
  })));
  return {
    stopped: requests.length,
    unloaded: unloadResults.filter((result) => result.status === 'fulfilled').length,
  };
});
handle('connection:status', () => ({ online: appOnline }));
handle('model:status', (model, status) => {
  if (typeof model !== 'string' || model.length > 200) return { ok: false };
  const normalized = ['online', 'timeout', 'offline'].includes(status) ? status : 'online';
  if (contactWindow && !contactWindow.isDestroyed() && !contactWindow.webContents.isLoading()) {
    contactWindow.webContents.send('model:status-changed', { model, status: normalized });
  }
  return { ok: true };
});
handle('profile:activity', (profileId, model) => {
  if (typeof profileId !== 'string' || profileId.length > 80) return { ok: false };
  if (contactWindow && !contactWindow.isDestroyed() && !contactWindow.webContents.isLoading()) {
    contactWindow.webContents.send('profile:activity', { profileId, model: typeof model === 'string' ? model : '' });
  }
  return { ok: true };
});
handle('shell:open-external', async (url) => {
  if (!['https://buymeacoffee.com/jesadac', 'https://aimessenger.sermocast.com', 'https://x.com/retraimessenger'].includes(url)) throw new Error('External link blocked.');
  await shell.openExternal(url);
  return { ok: true };
});
handle('connection:set-online', (online) => {
  appOnline = Boolean(online);
  modelDiscoveryCache.clear();
  if (!appOnline) {
    for (const request of activeChatRequests.values()) request.controller.abort();
    activeChatRequests.clear();
  }
  broadcastConnectionStatus();
  return { online: appOnline };
});

handle('desktop:permission', () => {
  if (process.platform !== 'darwin') return 'granted';
  return systemPreferences.getMediaAccessStatus('screen');
});

handle('desktop:sources', async () => {
  const sources = await desktopCapturer.getSources({
    types: ['screen', 'window'],
    thumbnailSize: { width: 640, height: 400 },
    fetchWindowIcons: true,
  });

  captureCache.clear();
  for (const source of sources) captureCache.set(source.id, source);
  return sources.map((source) => ({
    id: source.id,
    name: source.name,
    thumbnail: source.thumbnail.toDataURL(),
    icon: source.appIcon?.isEmpty() ? null : source.appIcon?.toDataURL(),
  }));
});

handle('desktop:capture', async (sourceId) => {
  if (typeof sourceId !== 'string' || sourceId.length > 500) throw new Error('Invalid screen source.');
  const known = captureCache.get(sourceId);
  if (!known) throw new Error('That screen or window is no longer available.');

  const sources = await desktopCapturer.getSources({
    types: [sourceId.startsWith('screen:') ? 'screen' : 'window'],
    thumbnailSize: { width: 1600, height: 1000 },
  });
  const source = sources.find((item) => item.id === sourceId);
  if (!source || source.thumbnail.isEmpty()) throw new Error('Unable to capture that source. Check Screen Recording permission.');
  return { name: source.name, dataUrl: source.thumbnail.toDataURL() };
});

handle('desktop:open-permissions', async () => {
  await shell.openExternal('x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture');
});

ipcMain.on('window:control', (event, action) => {
  assertTrustedSender(event);
  if (!['minimize', 'maximize', 'hide', 'close', 'quit'].includes(action)) return;
  const win = BrowserWindow.fromWebContents(event.sender) || contentsOwners.get(event.sender.id);
  if (!win) return;
  if (action === 'minimize') win.minimize();
  if (action === 'maximize') win.isMaximized() ? win.unmaximize() : win.maximize();
  if (action === 'hide') win.hide();
  if (action === 'close') win.close();
  if (action === 'quit') app.quit();
});

handle('clipboard:read-text', () => clipboard.readText().slice(0, 1024 * 1024));
handle('clipboard:write-text', (value) => {
  if (typeof value !== 'string' || value.length > 1024 * 1024) throw new Error('Clipboard text must be smaller than 1 MB.');
  clipboard.writeText(value);
});

handle('chat:open-window', (profileId, model) => {
  const selectedProfileId = validProfileId(profileId);
  const selectedModel = validModel(model);
  setChatUnread(selectedProfileId, false);
  createChatWindow(selectedProfileId, selectedModel);
  return { ok: true };
});
handle('chat:open-group', (participants, groupName, groupId = '') => {
  const selectedParticipants = normalizeChatParticipants(participants);
  if (selectedParticipants.length < 2) throw new Error('Choose at least two different assistants.');
  const safeGroupName = typeof groupName === 'string' ? groupName.trim().slice(0, 60) : '';
  if (!safeGroupName) throw new Error('Enter a group name.');
  const safeGroupId = typeof groupId === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(groupId) ? groupId : '';
  for (const participant of selectedParticipants) setChatUnread(participant.id || participant.model, false);
  createGroupChatWindow(selectedParticipants, safeGroupName, safeGroupId);
  return { ok: true };
});
handle('chat:dock', (profileId, model) => {
  const selectedProfileId = validProfileId(profileId);
  const selectedModel = validModel(model);
  setChatUnread(selectedProfileId, false);
  return attachDockedChat(selectedProfileId, selectedModel);
});
handleWithEvent('chat:dock-group', (event, participants, groupName, groupId = '') => {
  if (dockedChatView?.webContents.id === event.sender.id) {
    setImmediate(() => {
      try {
        attachDockedGroup(participants, groupName, groupId);
      } catch (error) {
        console.error(`[AI Messenger] Could not attach group chat: ${error.message}`);
      }
    });
    return { scheduled: true };
  }
  return attachDockedGroup(participants, groupName, groupId);
});
handle('chat:detach', detachDockedChat);
handle('chat:close-docked', closeDockedChat);
handle('chat:close-model', closeModelConversation);
handle('chat:close-profile', closeProfileConversation);
handle('chat:unread-list', () => [...unreadChats]);
handle('chat:unread-set', (chatId, unread) => setChatUnread(chatId, Boolean(unread)));

function stateFilePath() {
  return path.join(app.getPath('userData'), 'ai-messenger-state.enc');
}

function legacyStateFilePath() {
  return path.join(app.getPath('userData'), 'ai-messenger-state.json');
}

function secretFilePath() {
  return path.join(app.getPath('userData'), 'ai-messenger-api-key.enc');
}

function automaticUnlockFilePath() {
  return path.join(app.getPath('userData'), 'ai-messenger-auto-unlock.key');
}

function ensureVaultUnlocked() {
  if (!vaultKey || !vaultSalt) throw new Error('The standalone local vault is locked.');
}

async function writeEncryptedFile(destination, plainText) {
  ensureVaultUnlocked();
  const encrypted = encryptWithKey(plainText, vaultKey, vaultSalt);
  const temporary = `${destination}.tmp`;
  await fs.mkdir(path.dirname(destination), { recursive: true, mode: 0o700 });
  await fs.chmod(path.dirname(destination), 0o700);
  await fs.writeFile(temporary, encrypted, { mode: 0o600 });
  await fs.chmod(temporary, 0o600);
  await fs.rename(temporary, destination);
  await fs.chmod(destination, 0o600);
}

async function readEncryptedFile(filename) {
  ensureVaultUnlocked();
  return decryptWithKey(await fs.readFile(filename, 'utf8'), vaultKey);
}

async function setAutomaticUnlock(enabled) {
  if (!enabled) {
    await fs.rm(automaticUnlockFilePath(), { force: true });
    return { enabled: false };
  }
  ensureVaultUnlocked();
  const destination = automaticUnlockFilePath();
  const temporary = `${destination}.tmp`;
  const storedKey = JSON.stringify({ version: 1, key: vaultKey.toString('base64'), salt: vaultSalt.toString('base64') });
  await fs.mkdir(path.dirname(destination), { recursive: true, mode: 0o700 });
  await fs.chmod(path.dirname(destination), 0o700);
  await fs.writeFile(temporary, storedKey, { mode: 0o600 });
  await fs.chmod(temporary, 0o600);
  await fs.rename(temporary, destination);
  await fs.chmod(destination, 0o600);
  return { enabled: true };
}

async function tryAutomaticUnlock() {
  if (vaultKey) return true;
  try {
    const saved = JSON.parse(await fs.readFile(automaticUnlockFilePath(), 'utf8'));
    if (saved.version !== 1) return false;
    const key = Buffer.from(saved.key || '', 'base64');
    const salt = Buffer.from(saved.salt || '', 'base64');
    if (key.length !== 32 || salt.length !== 16) return false;
    const encryptedState = await fs.readFile(stateFilePath(), 'utf8');
    const state = JSON.parse(decryptWithKey(encryptedState, key));
    vaultKey = key;
    vaultSalt = salt;
    activeState = state;
    return true;
  } catch (error) {
    if (error.code !== 'ENOENT') console.error(`[AI Messenger security] Automatic vault unlock failed: ${error.message}`);
    return false;
  }
}

async function saveApiKey(value) {
  if (typeof value !== 'string' || value.length > MAX_API_KEY_LENGTH) throw new Error('Invalid API key.');
  if (!value) {
    await fs.rm(secretFilePath(), { force: true });
    return;
  }
  await writeEncryptedFile(secretFilePath(), value);
}

async function loadApiKey() {
  try {
    return await readEncryptedFile(secretFilePath());
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

async function loadState() {
  ensureVaultUnlocked();
  if (activeState) return structuredClone(activeState);
  try {
    activeState = JSON.parse(await readEncryptedFile(stateFilePath()));
    return structuredClone(activeState);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  activeState = { ...EMPTY_STATE };
  return structuredClone(activeState);
}

async function saveState(state, changedSections = ['profiles', 'profileGroups', 'sessions', 'chatArchives', 'groups', 'configuration', 'connection', 'preferences', 'userProfile']) {
  const incoming = state && typeof state === 'object' ? structuredClone(state) : { ...EMPTY_STATE };
  if (incoming.connection && typeof incoming.connection === 'object') delete incoming.connection.apiKey;
  const sections = Array.isArray(changedSections) ? changedSections : [];
  const nextState = activeState ? structuredClone(activeState) : { ...EMPTY_STATE };
  if (sections.includes('sessions')) {
    const byId = new Map((nextState.sessions || []).filter((session) => session?.id).map((session) => [session.id, session]));
    for (const session of incoming.sessions || []) {
      if (session?.id) byId.set(session.id, session);
    }
    nextState.sessions = [...byId.values()].sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''))).slice(0, 200);
  }
  if (sections.includes('chatArchives')) {
    const byId = new Map((nextState.chatArchives || []).filter((archive) => archive?.id).map((archive) => [archive.id, archive]));
    for (const archive of incoming.chatArchives || []) {
      if (archive?.id) byId.set(archive.id, archive);
    }
    nextState.chatArchives = [...byId.values()].sort((a, b) => String(b.archivedAt || b.updatedAt || '').localeCompare(String(a.archivedAt || a.updatedAt || ''))).slice(0, 200);
  }
  if (sections.includes('profiles') && Array.isArray(incoming.profiles)) nextState.profiles = incoming.profiles.slice(0, 200);
  if (sections.includes('profileGroups') && Array.isArray(incoming.profileGroups)) nextState.profileGroups = incoming.profileGroups.slice(0, 100);
  if (sections.includes('groups') && Array.isArray(incoming.groups)) nextState.groups = incoming.groups.slice(0, 100);
  for (const section of ['configuration', 'preferences', 'userProfile']) {
    if (sections.includes(section) && incoming[section] && typeof incoming[section] === 'object') nextState[section] = incoming[section];
  }
  if (sections.includes('connection') && incoming.connection && typeof incoming.connection === 'object') {
    const safeConnection = normalizeConnection(incoming.connection);
    delete safeConnection.apiKey;
    nextState.connection = safeConnection;
  }
  nextState.version = 3;
  const serialized = JSON.stringify(nextState);
  if (Buffer.byteLength(serialized) > MAX_STATE_BYTES) throw new Error('AI Messenger cache is larger than 10 MB.');
  await writeEncryptedFile(stateFilePath(), serialized);
  activeState = nextState;
  const changedState = { version: activeState.version };
  for (const section of sections) {
    if (section in activeState) changedState[section] = activeState[section];
  }
  for (const contents of webContents.getAllWebContents()) {
    if (!contents.isDestroyed()) contents.send('state:changed', structuredClone(changedState), sections);
  }
  return structuredClone(activeState);
}

handle('state:load', loadState);
handle('state:save', saveState);
handle('state:status', async () => {
  const exists = async (filename) => fs.access(filename).then(() => true).catch(() => false);
  if (!vaultKey) await tryAutomaticUnlock();
  return { hasVault: await exists(stateFilePath()), hasLegacyState: await exists(legacyStateFilePath()), unlocked: Boolean(vaultKey), automaticUnlock: await exists(automaticUnlockFilePath()) };
});
handle('state:unlock', async (passphrase, rememberDevice = false) => {
  if (typeof passphrase !== 'string') throw new Error('A vault passphrase is required.');
  try {
    const encryptedState = await fs.readFile(stateFilePath(), 'utf8');
    const unlocked = await unlockEnvelope(encryptedState, passphrase);
    vaultKey = unlocked.key;
    vaultSalt = unlocked.salt;
    activeState = JSON.parse(unlocked.plainText);
    await setAutomaticUnlock(Boolean(rememberDevice));
    return structuredClone(activeState);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const created = await createKey(passphrase);
  vaultKey = created.key;
  vaultSalt = created.salt;
  let state = { ...EMPTY_STATE };
  try {
    state = JSON.parse(await fs.readFile(legacyStateFilePath(), 'utf8'));
    const legacyKey = typeof state.connection?.apiKey === 'string' ? state.connection.apiKey : '';
    if (state.connection) delete state.connection.apiKey;
    if (legacyKey) await saveApiKey(legacyKey);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  state.version = 3;
  activeState = state;
  await saveState(state);
  await fs.rm(legacyStateFilePath(), { force: true });
  await setAutomaticUnlock(Boolean(rememberDevice));
  return state;
});
handle('state:set-automatic-unlock', (enabled) => setAutomaticUnlock(Boolean(enabled)));
handle('state:automatic-unlock-status', async () => ({ enabled: await fs.access(automaticUnlockFilePath()).then(() => true).catch(() => false) }));
handle('secrets:status', async () => ({ apiKeyStored: Boolean(await loadApiKey()), storage: 'standalone encrypted vault' }));
handle('secrets:save-api-key', saveApiKey);

app.on('web-contents-created', (_event, contents) => {
  contents.setWindowOpenHandler(() => ({ action: 'deny' }));
  contents.on('will-attach-webview', (event) => event.preventDefault());
});

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  if (process.platform === 'darwin') app.dock.setIcon(path.join(__dirname, '..', 'assets', 'ai-messenger-1024.png'));
  createContactWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createContactWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (vaultKey) vaultKey.fill(0);
  vaultKey = null;
  vaultSalt = null;
  activeState = null;
});
