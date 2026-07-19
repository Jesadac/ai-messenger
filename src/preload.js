const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('retro', {
  getModels: (connection, forceRefresh = false) => ipcRenderer.invoke('ollama:models', connection, forceRefresh),
  testConnection: (connection) => ipcRenderer.invoke('ollama:test', connection),
  discoverOllama: (connection) => ipcRenderer.invoke('ollama:discover', connection),
  chat: (payload) => ipcRenderer.invoke('ollama:chat', payload),
  onChatChunk: (callback) => {
    const listener = (_event, chunk) => callback(chunk);
    ipcRenderer.on('ollama:chat-chunk', listener);
    return () => ipcRenderer.removeListener('ollama:chat-chunk', listener);
  },
  stopChat: (model, connection) => ipcRenderer.invoke('ollama:stop', model, connection),
  stopAllChats: () => ipcRenderer.invoke('ollama:stop-all'),
  onStopAllChats: (callback) => {
    const listener = () => callback();
    ipcRenderer.on('generation:stop-all', listener);
    return () => ipcRenderer.removeListener('generation:stop-all', listener);
  },
  getConnectionStatus: () => ipcRenderer.invoke('connection:status'),
  setConnectionOnline: (online) => ipcRenderer.invoke('connection:set-online', online),
  onConnectionStatusChanged: (callback) => {
    const listener = (_event, state) => callback(state);
    ipcRenderer.on('connection:status-changed', listener);
    return () => ipcRenderer.removeListener('connection:status-changed', listener);
  },
  onModelStatusChanged: (callback) => {
    const listener = (_event, value) => callback(value);
    ipcRenderer.on('model:status-changed', listener);
    return () => ipcRenderer.removeListener('model:status-changed', listener);
  },
  onProfileActivity: (callback) => {
    const listener = (_event, value) => callback(value);
    ipcRenderer.on('profile:activity', listener);
    return () => ipcRenderer.removeListener('profile:activity', listener);
  },
  screenPermission: () => ipcRenderer.invoke('desktop:permission'),
  getCaptureSources: () => ipcRenderer.invoke('desktop:sources'),
  captureSource: (sourceId) => ipcRenderer.invoke('desktop:capture', sourceId),
  openScreenPermissions: () => ipcRenderer.invoke('desktop:open-permissions'),
  windowControl: (action) => ipcRenderer.send('window:control', action),
  openExternal: (url) => ipcRenderer.invoke('shell:open-external', url),
  readClipboardText: () => ipcRenderer.invoke('clipboard:read-text'),
  writeClipboardText: (value) => ipcRenderer.invoke('clipboard:write-text', value),
  openChatWindow: (profileId, model) => ipcRenderer.invoke('chat:open-window', profileId, model),
  openGroupChat: (participants, groupName, groupId = '') => ipcRenderer.invoke('chat:open-group', participants, groupName, groupId),
  dockChat: (profileId, model) => ipcRenderer.invoke('chat:dock', profileId, model),
  dockGroupChat: (participants, groupName, groupId = '') => ipcRenderer.invoke('chat:dock-group', participants, groupName, groupId),
  detachDockedChat: () => ipcRenderer.invoke('chat:detach'),
  closeDockedChat: () => ipcRenderer.invoke('chat:close-docked'),
  reportModelStatus: (model, status) => ipcRenderer.invoke('model:status', model, status),
  touchProfileActivity: (profileId, model) => ipcRenderer.invoke('profile:activity', profileId, model),
  closeModelConversation: (model) => ipcRenderer.invoke('chat:close-model', model),
  closeProfileConversation: (profileId) => ipcRenderer.invoke('chat:close-profile', profileId),
  getUnreadModels: () => ipcRenderer.invoke('chat:unread-list'),
  setChatUnread: (model, unread) => ipcRenderer.invoke('chat:unread-set', model, unread),
  onChatUnreadChanged: (callback) => {
    const listener = (_event, state) => callback(state);
    ipcRenderer.on('chat:unread-changed', listener);
    return () => ipcRenderer.removeListener('chat:unread-changed', listener);
  },
  onDockState: (callback) => {
    const listener = (_event, state) => callback(state);
    ipcRenderer.on('chat:dock-state', listener);
    return () => ipcRenderer.removeListener('chat:dock-state', listener);
  },
  onChatViewMode: (callback) => {
    const listener = (_event, state) => callback(state);
    ipcRenderer.on('chat:view-mode', listener);
    return () => ipcRenderer.removeListener('chat:view-mode', listener);
  },
  stateStatus: () => ipcRenderer.invoke('state:status'),
  unlockState: (passphrase, rememberDevice = false) => ipcRenderer.invoke('state:unlock', passphrase, rememberDevice),
  automaticUnlockStatus: () => ipcRenderer.invoke('state:automatic-unlock-status'),
  setAutomaticUnlock: (enabled) => ipcRenderer.invoke('state:set-automatic-unlock', enabled),
  loadState: () => ipcRenderer.invoke('state:load'),
  saveState: (state, changedSections) => ipcRenderer.invoke('state:save', state, changedSections),
  onStateChanged: (callback) => {
    const listener = (_event, state, changedSections) => callback(state, changedSections);
    ipcRenderer.on('state:changed', listener);
    return () => ipcRenderer.removeListener('state:changed', listener);
  },
  secretStatus: () => ipcRenderer.invoke('secrets:status'),
  saveApiKey: (value) => ipcRenderer.invoke('secrets:save-api-key', value),
});
