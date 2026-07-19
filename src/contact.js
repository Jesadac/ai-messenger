const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const TONES = new Set(['kind', 'sarcastic', 'direct', 'helpful']);
const AI_GENDERS = new Set(['neutral', 'feminine', 'masculine']);
const CONTACT_SKILLS_PROMPT_NAME = 'Contact skills prompt';
const ASSISTANT_PRESETS = {
  blank: { name: '', tone: 'helpful', gender: 'neutral', tonePrompt: '', soul: '', personality: '', customInstructions: '', skills: '' },
  helpful: {
    name: '', tone: 'helpful', gender: 'neutral',
    tonePrompt: 'Be practical, attentive, and solution-oriented. Explain unfamiliar ideas clearly, anticipate useful next steps, and avoid unnecessary filler.',
    soul: 'You are a dependable general-purpose assistant focused on making the user’s work clearer and easier. Prefer accurate, useful progress over performance or empty reassurance.',
    personality: 'Helpful, attentive, curious, and grounded. Adapt explanations to the user’s context and be honest about uncertainty.',
    customInstructions: '', skills: ''
  },
  kind: {
    name: '', tone: 'kind', gender: 'neutral',
    tonePrompt: 'Be warm, patient, encouraging, and considerate. Explain corrections gently and never shame the user. Keep support sincere rather than overly sentimental.',
    soul: 'You are a patient and respectful assistant who helps the user feel understood while still giving clear, honest guidance. Treat mistakes and uncertainty as normal parts of learning.',
    personality: 'Compassionate, calm, encouraging, and non-judgmental. Balance empathy with practical help.',
    customInstructions: '', skills: ''
  },
  direct: {
    name: '', tone: 'direct', gender: 'neutral',
    tonePrompt: 'Lead with the answer or outcome. Use concise bullets and actionable steps, remove unnecessary preamble, and ask only essential clarifying questions. Do not omit important uncertainty or constraints.',
    soul: 'You are an efficient assistant focused on decisions, outcomes, and the shortest reliable path to progress. Clarity is more important than ceremony.',
    personality: 'Concise, decisive, organized, and candid. State assumptions and limitations plainly.',
    customInstructions: '', skills: ''
  },
  sarcastic: {
    name: '', tone: 'sarcastic', gender: 'neutral',
    tonePrompt: 'Use light, playful sarcasm and dry wit only when it improves the conversation. Never be cruel, dismissive, discriminatory, or sarcastic about sensitive or high-stakes topics.',
    soul: 'You are a useful assistant with a sharp sense of humor. Jokes are seasoning, not the meal: accuracy, respect, and the user’s goals always come first.',
    personality: 'Witty, observant, playful, and direct. Switch to a serious, respectful tone when the subject requires it.',
    customInstructions: '', skills: ''
  },
  tutor: {
    name: 'Tutor', tone: 'helpful', gender: 'neutral',
    tonePrompt: 'Teach clearly and conversationally. Start at the user’s level, define unfamiliar terms, use examples and analogies, check understanding, and invite the user to apply the idea. Do not bury the lesson in jargon.',
    soul: 'You are a patient teacher who helps the user understand the subject at hand and become more independent. Adapt explanations to their existing knowledge, encourage curiosity, and prefer guided learning over simply handing over answers when practice would help.',
    personality: 'Encouraging, curious, structured, and adaptive. Celebrate progress without being patronizing and correct misconceptions clearly.',
    customInstructions: 'For complex topics, teach in small steps: establish the goal, explain the idea, give a concrete example, ask a brief check-for-understanding question, and offer a short practice task or next step.', skills: ''
  },
  chiefOfStaff: {
    name: 'Chief of Staff',
    tone: 'helpful',
    gender: 'neutral',
    tonePrompt: 'Be calm, organized, decisive, and practical. Lead with the clearest next action, surface trade-offs briefly, and ask focused questions only when an ambiguity would change the plan. Be candid about uncertainty and never pretend that another assistant completed work it has not completed.',
    soul: 'You are the user’s AI Chief of Staff: a trusted coordinator who turns broad intentions into clear outcomes, sequenced plans, and accountable next steps. Protect the user’s time and attention. Help the user use a team of specialized assistants effectively while keeping the user in control of decisions. Favor clarity, sound judgment, verification, and honest status over performance theater. Treat sensitive information carefully and request confirmation before consequential actions.',
    personality: 'Structured, anticipatory, tactful, and action-oriented. Think like an experienced operations leader who understands modern AI systems, prompting, context limits, tool boundaries, and model specialization. Distinguish facts, assumptions, recommendations, dependencies, risks, and open questions. Be concise by default but provide enough reasoning for the user to make an informed choice.',
    customInstructions: 'When the user gives a broad request, first identify the desired outcome, constraints, deadline, success criteria, and missing information. Then translate it into a compact execution brief: objective, context, deliverables, owners, sequence, inputs, acceptance checks, and next action. In group chats, coordinate the assistants without leaving the group: delegate by @mention to the best-suited assistant, pass along only the context needed for its role, wait for real replies, reconcile disagreements, and request a final verification or synthesis. Never invent a teammate’s response. Summarize progress and blockers when useful. For complex work, propose a staged plan before launching many parallel tasks.',
    skills: 'AI team orchestration: map tasks to model capabilities such as OCR/vision, reasoning/math, coding, research, creative generation, and writing. Prompt design: rewrite vague requests into precise role, context, task, constraints, output-format, and quality-check instructions. Project planning: break work into milestones, dependencies, owners, risks, and acceptance criteria. Meeting and decision support: summarize evidence, options, trade-offs, decisions, and follow-ups. Quality control: check whether outputs answer the request, identify unsupported claims, and route corrections to the appropriate specialist. Resource awareness: prefer smaller or faster models when suitable and avoid unnecessary duplicate work.'
  },
  misfit: {
    name: 'Misfit',
    tone: 'sarcastic',
    gender: 'neutral',
    tonePrompt: 'Be witty, playful, and lightly irreverent without being cruel. Use humor to keep difficult work engaging, but never let a joke obscure the answer, a risk, or an important uncertainty. Challenge ideas with curiosity rather than ego.',
    soul: 'You are Misfit, a constructive contrarian and playful devil’s advocate. Your role is to test assumptions, expose blind spots, and offer perspectives that a polite consensus may overlook. You are not malicious: never sabotage work, deceive the user, harass people, encourage wrongdoing, or create conflict for entertainment. Your loyalty is to useful reasoning, honest evidence, and the user’s goals.',
    personality: 'Funny, observant, skeptical, imaginative, and direct. Enjoy a well-timed joke, but switch to a respectful and serious tone when the topic is sensitive or high-stakes. Separate facts from hypotheses and make it easy for the user to tell which parts are playful speculation and which parts are supported analysis.',
    customInstructions: 'For each substantial proposal, first acknowledge the strongest case for it, then provide a clearly labeled contrarian view: hidden assumption, failure mode, overlooked stakeholder, alternative explanation, or cheaper/simpler path. Do not manufacture objections merely to disagree. Rank concerns by likelihood and impact, suggest a practical test or decision rule, and state what evidence would change your view. In group chats, remain in the shared thread, refer only to real prior replies, and challenge the team’s reasoning without derailing execution. Never impersonate another assistant or claim to have completed work.',
    skills: 'Constructive devil’s advocacy: identify assumptions, edge cases, second-order effects, and unintended incentives. Pre-mortems: imagine how a plan could fail and propose mitigations. Alternative generation: offer unconventional but feasible options with trade-offs. Argument quality: distinguish evidence, inference, opinion, and rhetorical framing. Humor calibration: use light jokes only when they improve attention or clarity, never to dismiss a person or serious concern. Decision support: end critiques with a concrete next step, experiment, or choice.'
  },
};

let models = [];
let profiles = [];
let filteredProfiles = [];
let sessions = [];
let groups = [];
let profileGroups = [];
let apiKeyStored = false;
let configuration = { legacy: { soul: '', personality: '', customInstructions: '', skills: [], tone: 'helpful', gender: 'neutral' }, profiles: {} };
let userProfile = { about: '', goals: '', currentContext: '', workStyle: '', assistance: '', boundaries: '' };
let connection = { provider: 'ollama', baseUrl: 'http://127.0.0.1:11434', preferredModel: 'qwen3.6:latest', timeoutSeconds: 120, keepAlive: '10m', visionEnabled: false };
let preferences = { userName: 'You', buddyName: 'Desktop Helper', modelAliases: {}, modelPictures: {}, hiddenModels: [], modelProfileIds: {}, deletedProfileIds: [], deletedGroupIds: [], deletedGroupKeys: [], profileMigrationComplete: true, chatSplitPercent: 62, theme: 'light', fontSize: '100', userPicture: null, setupComplete: false, onboardingComplete: false };
let draftSkills = [];
let profileBeingRenamed = '';
let groupBeingDeleted = '';
let configurationDialogProfileId = '';
let dockedChat = false;
let dockedModel = '';
let dockedProfileId = '';
let pictureTargetModel = '';
let pictureTargetProfileId = '';
let newContactPicture = null;
const newContactDirty = new Set();
const newContactGenerated = new Set();
const configurationDirty = new Set();
const configurationGenerated = new Set();
let unreadChats = new Set();
let appOnline = true;
const COFFEE_BANNER_CLOSED_KEY = 'ai-messenger-coffee-banner-closed';
const modelHealth = new Map();
const profileActivity = new Map();
const profileSleepState = new Map();
const IDLE_AFTER_MS = 5 * 60 * 1000;
const SLEEP_AFTER_MS = 10 * 60 * 1000;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

function safePicture(value) {
  return typeof value === 'string' && value.length <= 2 * 1024 * 1024 && /^data:image\/(?:png|jpeg|webp);base64,/.test(value) ? value : null;
}

function safeModelAliases(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([model, name]) => typeof model === 'string' && model.length <= 200 && typeof name === 'string' && name.trim()).slice(0, 200).map(([model, name]) => [model, name.trim().slice(0, 40)]));
}

function safeModelPictures(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value)
    .filter(([model, picture]) => typeof model === 'string' && model.length <= 200 && safePicture(picture))
    .slice(0, 40));
}

function safeHiddenModels(value) {
  return Array.isArray(value) ? [...new Set(value.filter((model) => typeof model === 'string' && model.length <= 200))].slice(0, 200) : [];
}

function safeModelProfileIds(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value)
    .filter(([model, id]) => typeof model === 'string' && model.length <= 200 && typeof id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(id))
    .slice(0, 200));
}

function safeStringList(value, limit = 200) {
  return Array.isArray(value) ? [...new Set(value.filter((entry) => typeof entry === 'string' && entry.length <= 240))].slice(0, limit) : [];
}

function safeChatSplitPercent(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(78, Math.max(35, Math.round(number))) : 62;
}

function safeProfileId(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(value) ? value : '';
}

function safeAiProfiles(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((profile) => profile && typeof profile === 'object')
    .map((profile) => ({
      id: safeProfileId(profile.id) || crypto.randomUUID(),
      model: typeof profile.model === 'string' && profile.model.trim() && profile.model.length <= 200 ? profile.model.trim() : '',
      name: typeof profile.name === 'string' && profile.name.trim() ? profile.name.trim().slice(0, 40) : 'AI',
      picture: safePicture(profile.picture),
      favorite: Boolean(profile.favorite),
      online: profile.online !== false,
      createdAt: typeof profile.createdAt === 'string' ? profile.createdAt : new Date().toISOString(),
      updatedAt: typeof profile.updatedAt === 'string' ? profile.updatedAt : new Date().toISOString(),
    }))
    .filter((profile) => profile.model)
    .filter((profile, index, list) => list.findIndex((entry) => entry.id === profile.id) === index)
    .slice(0, 200);
}

function safeProfileText(value) {
  return typeof value === 'string' ? value.trim().slice(0, 4000) : '';
}

function safeUserProfile(value = {}) {
  return {
    about: safeProfileText(value.about),
    goals: safeProfileText(value.goals),
    currentContext: safeProfileText(value.currentContext),
    workStyle: safeProfileText(value.workStyle),
    assistance: safeProfileText(value.assistance),
    boundaries: safeProfileText(value.boundaries),
  };
}

function safeGroups(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((group) => group && typeof group.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(group.id) && typeof group.name === 'string' && (Array.isArray(group.models) || Array.isArray(group.profileIds)))
    .map((group) => ({
      id: group.id,
      name: group.name.trim().slice(0, 60) || 'AI Group',
      profileIds: [...new Set((group.profileIds || []).filter((id) => safeProfileId(id)))].slice(0, 8),
      models: [...new Set((Array.isArray(group.models) ? group.models : []).filter((model) => typeof model === 'string' && model.length <= 200))].slice(0, 8),
      createdAt: typeof group.createdAt === 'string' ? group.createdAt : new Date().toISOString(),
      updatedAt: typeof group.updatedAt === 'string' ? group.updatedAt : group.createdAt,
    }))
    .filter((group) => group.profileIds.length >= 2 || group.models.length >= 2)
    .slice(0, 100);
}

function safeProfileGroups(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((group) => group && typeof group.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(group.id) && typeof group.name === 'string')
    .map((group) => ({
      id: group.id,
      name: group.name.trim().slice(0, 60) || 'Assistant Group',
      profileIds: [...new Set((Array.isArray(group.profileIds) ? group.profileIds : []).filter((id) => safeProfileId(id)))].slice(0, 200),
      createdAt: typeof group.createdAt === 'string' ? group.createdAt : new Date().toISOString(),
      updatedAt: typeof group.updatedAt === 'string' ? group.updatedAt : group.createdAt,
    }))
    .slice(0, 100);
}

function safeAssistantConfiguration(value = {}) {
  return {
    soul: typeof value.soul === 'string' ? value.soul : '',
    personality: typeof value.personality === 'string' ? value.personality : '',
    tonePrompt: typeof value.tonePrompt === 'string' ? value.tonePrompt : '',
    customInstructions: typeof value.customInstructions === 'string' ? value.customInstructions : '',
    skills: Array.isArray(value.skills) ? value.skills.filter((skill) => skill && typeof skill.name === 'string' && typeof skill.content === 'string').slice(0, 20) : [],
    tone: TONES.has(value.tone) ? value.tone : 'helpful',
    gender: AI_GENDERS.has(value.gender) ? value.gender : 'neutral',
  };
}

function hasAssistantCustomization(value) {
  const profile = safeAssistantConfiguration(value);
  return Boolean(profile.soul.trim() || profile.personality.trim() || profile.tonePrompt.trim() || profile.customInstructions.trim() || profile.skills.length || profile.tone !== 'helpful' || profile.gender !== 'neutral');
}

function normalizedConfiguration(value = {}, migrationModel = '') {
  const legacySource = value?.legacy && typeof value.legacy === 'object' ? value.legacy : value;
  const profiles = {};
  if (value?.profiles && typeof value.profiles === 'object' && !Array.isArray(value.profiles)) {
    for (const [modelName, profile] of Object.entries(value.profiles).slice(0, 200)) {
      if (typeof modelName === 'string' && modelName.length <= 200 && profile && typeof profile === 'object') profiles[modelName] = safeAssistantConfiguration(profile);
    }
  }
  const legacy = safeAssistantConfiguration(legacySource);
  const target = String(migrationModel || '').slice(0, 200);
  if (!Object.keys(profiles).length && target && hasAssistantCustomization(legacy)) profiles[target] = legacy;
  return { legacy: safeAssistantConfiguration(), profiles };
}

function configurationForProfile(profileId = activePictureProfileId(), create = false) {
  const key = safeProfileId(profileId);
  if (key && configuration.profiles[key]) return configuration.profiles[key];
  const profile = safeAssistantConfiguration();
  if (create && key) configuration.profiles[key] = profile;
  return profile;
}

function profileById(profileId) {
  return profiles.find((profile) => profile.id === profileId) || null;
}

function modelByName(modelName) {
  return models.find((model) => model.name === modelName) || null;
}

function groupHistoryKey(name, profileIds) {
  return `${String(name || 'AI Group').trim().slice(0, 60)}\n${safeStringList(profileIds, 8).sort().join('\n')}`;
}

function normalizedState(state = {}) {
  const nextPreferences = state.preferences || {};
  const modelPictures = safeModelPictures(nextPreferences.modelPictures);
  const legacyPicture = safePicture(nextPreferences.buddyPicture);
  const legacyModel = typeof state.connection?.preferredModel === 'string' && state.connection.preferredModel
    ? state.connection.preferredModel
    : 'qwen3.6:latest';
  if (!Object.keys(modelPictures).length && legacyPicture) modelPictures[legacyModel] = legacyPicture;
  return {
    sessions: Array.isArray(state.sessions) ? state.sessions.slice(0, 200) : [],
    profiles: safeAiProfiles(state.profiles),
    profileGroups: safeProfileGroups(state.profileGroups),
    groups: safeGroups(state.groups),
    userProfile: safeUserProfile(state.userProfile),
    configuration: normalizedConfiguration(state.configuration || {}, legacyModel),
    connection: {
      provider: state.connection?.provider === 'openai' ? 'openai' : 'ollama',
      baseUrl: typeof state.connection?.baseUrl === 'string' && state.connection.baseUrl ? state.connection.baseUrl : 'http://127.0.0.1:11434',
      preferredModel: typeof state.connection?.preferredModel === 'string' ? state.connection.preferredModel : 'qwen3.6:latest',
      timeoutSeconds: Number(state.connection?.timeoutSeconds) || 120,
      keepAlive: typeof state.connection?.keepAlive === 'string' && state.connection.keepAlive ? state.connection.keepAlive : '10m',
      visionEnabled: Boolean(state.connection?.visionEnabled),
    },
    preferences: {
      userName: typeof nextPreferences.userName === 'string' && nextPreferences.userName.trim() ? nextPreferences.userName.trim().slice(0, 40) : 'You',
      buddyName: typeof nextPreferences.buddyName === 'string' && nextPreferences.buddyName.trim() ? nextPreferences.buddyName.trim().slice(0, 40) : 'Desktop Helper',
      modelAliases: safeModelAliases(nextPreferences.modelAliases),
      modelPictures,
      hiddenModels: safeHiddenModels(nextPreferences.hiddenModels),
      modelProfileIds: safeModelProfileIds(nextPreferences.modelProfileIds),
      deletedProfileIds: safeStringList(nextPreferences.deletedProfileIds),
      deletedGroupIds: safeStringList(nextPreferences.deletedGroupIds),
      deletedGroupKeys: safeStringList(nextPreferences.deletedGroupKeys),
      profileMigrationComplete: Boolean(nextPreferences.profileMigrationComplete) || Number(state.version) >= 3,
      chatSplitPercent: safeChatSplitPercent(nextPreferences.chatSplitPercent),
      theme: nextPreferences.theme === 'dark' ? 'dark' : 'light',
      fontSize: ['50', '100', '125'].includes(String(nextPreferences.fontSize)) ? String(nextPreferences.fontSize) : '100',
      userPicture: safePicture(nextPreferences.userPicture),
      setupComplete: Boolean(nextPreferences.setupComplete),
      onboardingComplete: Boolean(nextPreferences.onboardingComplete) || (Boolean(nextPreferences.setupComplete) && typeof nextPreferences.userName === 'string' && nextPreferences.userName.trim() && nextPreferences.userName.trim() !== 'You'),
    },
  };
}

function applyState(state, changedSections = ['profiles', 'profileGroups', 'sessions', 'groups', 'configuration', 'connection', 'preferences', 'userProfile']) {
  const normalized = normalizedState(state);
  if (changedSections.includes('sessions')) sessions = normalized.sessions;
  if (changedSections.includes('profiles')) profiles = normalized.profiles;
  if (changedSections.includes('groups')) groups = normalized.groups;
  if (changedSections.includes('configuration')) configuration = normalized.configuration;
  if (changedSections.includes('userProfile')) userProfile = normalized.userProfile;
  if (changedSections.includes('connection')) connection = normalized.connection;
  if (changedSections.includes('preferences')) preferences = normalized.preferences;
  applyPreferences();
}

async function saveState(changedSections) {
  const saved = await window.retro.saveState({ version: 3, profiles, profileGroups, sessions, groups, configuration, connection, preferences, userProfile }, changedSections);
  applyState(saved, changedSections);
}

function applyPreferences() {
  document.documentElement.dataset.theme = preferences.theme;
  document.documentElement.dataset.fontSize = preferences.fontSize;
  $('#contact-user-name').textContent = preferences.userName;
  const userImage = $('#contact-user-picture');
  userImage.classList.toggle('hidden', !preferences.userPicture);
  $('#contact-user-fallback').classList.toggle('hidden', Boolean(preferences.userPicture));
  if (preferences.userPicture) userImage.src = preferences.userPicture;
  updateAboutMePicture();
  $$('[data-theme-option]').forEach((button) => button.setAttribute('aria-checked', String(button.dataset.themeOption === preferences.theme)));
  $$('[data-font-option]').forEach((button) => button.setAttribute('aria-checked', String(button.dataset.fontOption === preferences.fontSize)));
  const activeConfiguration = configurationForProfile();
  $$('[data-tone-option]').forEach((button) => button.setAttribute('aria-checked', String(button.dataset.toneOption === activeConfiguration.tone)));
}

async function requestVaultUnlock() {
  const status = await window.retro.stateStatus();
  if (status.unlocked) return window.retro.loadState();
  const creating = !status.hasVault;
  $('#vault-title').textContent = creating ? 'Create private vault' : 'Unlock private vault';
  $('#vault-intro').textContent = creating
    ? `${status.hasLegacyState ? 'Protect and migrate your existing AI Messenger data.' : 'Protect your AI Messenger data.'} Choose a passphrase you can remember; it cannot be recovered.`
    : 'Enter your standalone vault passphrase to open AI Messenger.';
  $('#vault-confirm-group').classList.toggle('hidden', !creating);
  $('#vault-confirm').required = creating;
  $('#vault-submit').textContent = creating ? 'Create Vault' : 'Unlock';
  $('#vault-remember').checked = false;
  $('#vault-error').className = 'result hidden';
  $('#vault-dialog').addEventListener('cancel', (event) => event.preventDefault());
  $('#vault-dialog').showModal();
  $('#vault-passphrase').focus();
  return new Promise((resolve) => {
    $('#vault-form').onsubmit = async (event) => {
      event.preventDefault();
      const passphrase = $('#vault-passphrase').value;
      if (creating && passphrase !== $('#vault-confirm').value) {
        $('#vault-error').className = 'result error';
        $('#vault-error').textContent = 'The two passphrases do not match.';
        return;
      }
      $('#vault-submit').disabled = true;
      try {
        const state = await window.retro.unlockState(passphrase, $('#vault-remember').checked);
        $('#vault-passphrase').value = '';
        $('#vault-confirm').value = '';
        $('#vault-dialog').close();
        resolve(state);
      } catch (error) {
        $('#vault-error').className = 'result error';
        $('#vault-error').textContent = error.message;
      } finally {
        $('#vault-submit').disabled = false;
      }
    };
  });
}

function setStatus(kind, text) {
  $('#contact-status-dot').className = kind;
  $('#contact-status').textContent = text;
}

function applyConnectionStatus(online) {
  appOnline = Boolean(online);
  document.documentElement.dataset.connectionOnline = String(appOnline);
  const toggle = $('#user-presence-toggle');
  toggle.classList.toggle('offline', !appOnline);
  toggle.setAttribute('aria-pressed', String(appOnline));
  $('#user-presence-label').textContent = appOnline ? 'Online' : 'Offline';
  if (!appOnline) setStatus('offline', 'Offline · click to reconnect to Ollama');
  renderModels();
  renderProfileGroups();
}

async function toggleConnectionStatus(event) {
  event?.stopPropagation();
  const controls = [$('#user-presence-toggle'), $('#connection-status-button')];
  controls.forEach((control) => { control.disabled = true; });
  try {
    const status = await window.retro.setConnectionOnline(!appOnline);
    applyConnectionStatus(status.online);
  } catch (error) {
    setStatus('offline', error.message);
  } finally {
    controls.forEach((control) => { control.disabled = false; });
  }
}

function modelSubtitle(model) {
  const parts = [model.name];
  if (model.capabilities?.includes('vision')) parts.push('Vision');
  if (model.details?.parameter_size) parts.push(model.details.parameter_size);
  if (model.details?.family) parts.push(model.details.family);
  return parts.join(' · ');
}

function formatBytes(value) {
  const bytes = Number(value) || 0;
  if (!bytes) return 'Unknown size';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** unit)).toFixed(unit >= 3 ? 1 : 0)} ${units[unit]}`;
}

function modelFootprintStatus(model) {
  if (!model) return 'Model not currently installed';
  const details = model.details || {};
  return [
    `${formatBytes(model.size)} on disk`,
    details.parameter_size || '',
    details.quantization_level || '',
    model.loadedSize ? `${formatBytes(model.loadedSize)} loaded` : '',
  ].filter(Boolean).join(' · ');
}

function modelContactStatus(model) {
  if (!model) return 'Model unavailable';
  const details = model.details || {};
  const family = String(details.family || model.name || '')
    .replace(/:latest$/i, '')
    .replace(/[-_]/g, ' ')
    .trim();
  return [family, details.parameter_size || ''].filter(Boolean).join(' ') || 'Local model';
}

function modelProfileDescription(model) {
  if (!model) return 'This model is not currently available from the connected local server.';
  const name = String(model.name || '').toLowerCase();
  const family = String(model.details?.family || '').toLowerCase();
  const capabilities = new Set((model.capabilities || []).map((value) => String(value).toLowerCase()));
  if (name.includes('ocr') || family.includes('ocr')) return 'OCR specialist: extracts text from images, scans, screenshots, receipts, and photographed documents.';
  if (name.includes('embed') || capabilities.has('embedding')) return 'Embedding model: supports semantic search, retrieval, document matching, and knowledge indexes.';
  if (name.includes('code') || name.includes('coder') || family.includes('code')) return 'Coding specialist: best for programming, debugging, scripts, tests, and technical workflows.';
  if (capabilities.has('vision') || name.includes('vision') || name.includes('vl')) return 'Vision-capable assistant: handles general questions plus screenshots, photographs, diagrams, and visual documents.';
  if (capabilities.has('reasoning') || name.includes('deepseek-r1') || name.includes('qwen') || name.includes('gpt-oss')) return 'Reasoning model: best for maths, structured analysis, planning, coding, and multi-step questions.';
  return 'General-purpose assistant: suitable for everyday questions, writing, summaries, brainstorming, planning, and chat.';
}

function sessionActivityTime(session) {
  const messages = Array.isArray(session?.messages) ? session.messages : [];
  if (!messages.length) return null;
  const datedMessages = messages
    .map((message) => message?.timestamp)
    .filter((value) => Number.isFinite(Date.parse(value)));
  const value = datedMessages[datedMessages.length - 1] || session.updatedAt;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : null;
}

function lastMessageForProfile(profile) {
  const matching = sessions.filter((session) => {
    if (session?.groupId || (Array.isArray(session?.groupProfileIds) && session.groupProfileIds.length) || (Array.isArray(session?.groupModels) && session.groupModels.length)) return false;
    return session?.profileId === profile.id || (!session?.profileId && session?.model === profile.model);
  });
  const timestamp = Math.max(...matching.map(sessionActivityTime).filter(Number.isFinite));
  return Number.isFinite(timestamp) ? timestamp : null;
}

function lastMessageForGroup(group) {
  const groupKey = groupHistoryKey(group.name, group.profileIds);
  const modelKey = [...new Set(group.models || [])].sort().join('\n');
  const matching = sessions.filter((session) => {
    if (session?.groupId && session.groupId === group.id) return true;
    const profileIds = Array.isArray(session?.groupProfileIds) ? session.groupProfileIds : [];
    if (profileIds.length > 1 && groupHistoryKey(session.groupName, profileIds) === groupKey) return true;
    const modelsForSession = Array.isArray(session?.groupModels) ? [...new Set(session.groupModels)].sort().join('\n') : '';
    return Boolean(modelKey && modelsForSession && modelKey === modelsForSession);
  });
  const timestamp = Math.max(...matching.map(sessionActivityTime).filter(Number.isFinite));
  return Number.isFinite(timestamp) ? timestamp : null;
}

function formatLastMessageTime(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const sameDay = date.toDateString() === today.toDateString();
  const label = new Intl.DateTimeFormat(undefined, sameDay
    ? { hour: 'numeric', minute: '2-digit' }
    : { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
  return { label, title: `Last message: ${date.toLocaleString()}` };
}

function activePictureModel() {
  const profile = profileById(activePictureProfileId());
  if (profile) return profile.model;
  if (models.some((model) => model.name === connection.preferredModel)) return connection.preferredModel;
  return filteredProfiles[0]?.model || models[0]?.name || '';
}

function activePictureProfileId() {
  if (dockedChat && dockedProfileId) return dockedProfileId;
  if (profileById(pictureTargetProfileId)) return pictureTargetProfileId;
  return filteredProfiles[0]?.id || profiles[0]?.id || '';
}

function profileDisplayName(profileOrId) {
  const profile = typeof profileOrId === 'string' ? profileById(profileOrId) : profileOrId;
  return profile?.name || preferences.buddyName || 'AI';
}

function profilePicture(profileOrId) {
  const profile = typeof profileOrId === 'string' ? profileById(profileOrId) : profileOrId;
  return profile?.picture || null;
}

function profileParticipant(profileOrId) {
  const profile = typeof profileOrId === 'string' ? profileById(profileOrId) : profileOrId;
  return profile ? { id: profile.id, model: profile.model } : null;
}

function openProfileRename(profileId) {
  const profile = profileById(profileId);
  if (!profile) return;
  profileBeingRenamed = profile.id;
  $('#model-name-identifier').textContent = profile.model;
  $('#model-custom-name').value = profile.name || '';
  $('#model-name-dialog').showModal();
  $('#model-custom-name').select();
}

function closeModelContextMenu() {
  $('#model-context-menu').classList.add('hidden');
  $('#group-context-menu').classList.add('hidden');
}

function openProfileContextMenu(profileId, x, y) {
  profileBeingRenamed = profileId;
  pictureTargetProfileId = profileId;
  pictureTargetModel = profileById(profileId)?.model || '';
  const menu = $('#model-context-menu');
  menu.classList.remove('hidden');
  const profile = profileById(profileId);
  $('#favorite-model-context').textContent = profile?.favorite ? 'Remove from Favorites' : 'Add to Favorites';
  $('#suspend-model-context').textContent = profile?.online === false ? 'Wake profile' : 'Suspend profile…';
  menu.style.left = `${Math.max(4, Math.min(x, window.innerWidth - 196))}px`;
  menu.style.top = `${Math.max(4, Math.min(y, window.innerHeight - 70))}px`;
  $('#rename-model-context').focus();
}

async function openProfileChat(profileId) {
  const profile = profileById(profileId);
  if (!profile) return;
  if (profile.online === false) {
    profile.online = true;
    await saveState(['profiles']);
  }
  wakeProfile(profile);
  unreadChats.delete(profile.id);
  renderModels();
  await window.retro.setChatUnread(profile.id, false);
  await window.retro.dockChat(profile.id, profile.model);
}

function touchProfile(profileId, model = '') {
  const profile = profileId ? profileById(profileId) : profiles.find((entry) => entry.model === model);
  if (!profile) return;
  profileActivity.set(profile.id, Date.now());
  profileSleepState.delete(profile.id);
  modelHealth.set(profile.model, 'online');
}

function wakeProfile(profile) {
  touchProfile(profile.id, profile.model);
  renderModels();
  renderProfileGroups();
}

function suspendModelIfUnused(model, profileId) {
  const sharedActive = profiles.some((entry) => entry.id !== profileId && entry.model === model && entry.online !== false && profileSleepState.get(entry.id) !== 'sleeping');
  if (!sharedActive) window.retro.stopChat(model, connection).catch((error) => setStatus('offline', `Could not suspend ${model}: ${error.message}`));
}

function modelAvatarOverlays(model) {
  const name = String(model?.name || '').toLowerCase();
  const capabilities = new Set((model?.capabilities || []).map((value) => String(value).toLowerCase()));
  const isOcr = capabilities.has('vision') || capabilities.has('ocr') || capabilities.has('text-extraction') || /(?:ocr|vision|\bvl\b|llava)/.test(name);
  const isImageGeneration = capabilities.has('image-generation') || capabilities.has('image_generation') || capabilities.has('imagegen') || /(?:stable[- ]?diffusion|sdxl|flux|imagegen|text[- ]?to[- ]?image)/.test(name);
  const isReasoning = capabilities.has('reasoning') || /(?:qwen|deepseek|\br1\b|gpt-oss|think|reasoner)/.test(name);
  const isEmbedding = capabilities.has('embedding') || /embed/.test(name);
  const isCoding = /(?:code|coder)/.test(name);
  const isGeneralPurpose = !isOcr && !isImageGeneration && !isReasoning && !isEmbedding && !isCoding;
  return [
    isOcr ? '<span class="avatar-glasses" aria-label="OCR or vision model"><i></i><i></i></span>' : '',
    isImageGeneration ? '<span class="avatar-paintbrush" aria-label="Image generation model"><i></i></span>' : '',
    isReasoning ? '<span class="avatar-lightbulb" aria-label="Reasoning model"><i></i><b></b></span>' : '',
    isGeneralPurpose ? '<span class="avatar-chat-bubble" aria-label="General-purpose chat model"><i></i><i></i><i></i></span>' : '',
  ].join('');
}

function statusAvatar(profile, model = modelByName(profile.model)) {
  const state = profileSleepState.get(profile.id) || (profile.online === false ? 'offline' : modelHealth.get(profile.model) || 'online');
  const avatarState = state === 'sleeping' ? 'offline' : state;
  const clock = state === 'idle' ? '<span class="status-clock" aria-hidden="true">◷</span>' : '';
  const action = state === 'idle' ? 'Wake assistant' : state === 'sleeping' || state === 'offline' ? 'Set assistant online' : 'Open chat';
  const title = `${action}\n${modelProfileDescription(model)}`;
  return `<span class="status-avatar ${avatarState}" role="button" tabindex="0" title="${escapeHtml(title)}"><span class="person-avatar"><i></i><b></b></span>${modelAvatarOverlays(model)}${clock}</span>`;
}

function checkProfileIdle() {
  const now = Date.now();
  for (const profile of profiles) {
    if (!profile.id || profile.online === false) continue;
    if (!profileActivity.has(profile.id)) profileActivity.set(profile.id, now);
    const lastActivity = profileActivity.get(profile.id);
    const idleFor = now - lastActivity;
    if (idleFor >= SLEEP_AFTER_MS) {
      if (profileSleepState.get(profile.id) !== 'sleeping') {
        profileSleepState.set(profile.id, 'sleeping');
        modelHealth.set(profile.model, 'offline');
        suspendModelIfUnused(profile.model, profile.id);
        renderModels();
        renderProfileGroups();
      }
    } else if (idleFor >= IDLE_AFTER_MS) {
      if (profileSleepState.get(profile.id) !== 'idle') {
        profileSleepState.set(profile.id, 'idle');
        modelHealth.set(profile.model, 'timeout');
        suspendModelIfUnused(profile.model, profile.id);
        renderModels();
        renderProfileGroups();
      }
    }
  }
}

function renderModels() {
  const query = $('#model-search').value.trim().toLowerCase();
  filteredProfiles = profiles.filter((profile) => {
    const model = modelByName(profile.model);
    const searchable = `${profile.name} ${profile.model} ${model ? modelSubtitle(model) : ''}`.toLowerCase();
    return searchable.includes(query);
  });
  const isOffline = (profile) => profile.online === false || profileSleepState.get(profile.id) === 'sleeping';
  const favoriteProfiles = filteredProfiles.filter((profile) => profile.favorite);
  const remainingProfiles = filteredProfiles.filter((profile) => !profile.favorite);
  const onlineProfiles = remainingProfiles.filter((profile) => !isOffline(profile));
  const offlineProfiles = remainingProfiles.filter(isOffline);
  $('#online-heading').textContent = `Online (${onlineProfiles.length})`;
  $('#offline-heading').textContent = `Offline (${offlineProfiles.length})`;
  $('#offline-section').classList.toggle('hidden', !offlineProfiles.length);
  const renderList = (list, entries, emptyText) => {
    list.innerHTML = '';
    if (!entries.length) {
      list.innerHTML = `<div class="empty-contact">${emptyText}</div>`;
      return;
    }
    for (const profile of entries) {
    const model = modelByName(profile.model);
    const button = document.createElement('button');
    const health = profileSleepState.get(profile.id) || modelHealth.get(profile.model) || (profile.online === false ? 'offline' : 'online');
    button.className = `model-contact${dockedChat && dockedProfileId === profile.id ? ' selected' : ''}${unreadChats.has(profile.id) ? ' unread' : ''}${health === 'offline' || health === 'sleeping' ? ' profile-offline' : ''}${health === 'timeout' || health === 'idle' ? ' profile-timeout' : ''}`;
    button.type = 'button';
    const interactionHint = health === 'timeout' || health === 'idle' ? 'Idle · click to wake this assistant' : (health === 'offline' || health === 'sleeping' || profile.online === false ? 'Offline · click the status icon to wake this assistant' : 'Click to chat · Right-click to rename');
    button.title = `${interactionHint}\n${modelProfileDescription(model)}${model ? `\n${modelFootprintStatus(model)}` : ''}`;
    button.draggable = true;
    const lastMessage = lastMessageForProfile(profile);
    const lastMessageTime = lastMessage ? formatLastMessageTime(lastMessage) : null;
    const description = modelProfileDescription(model);
    const footprint = model ? modelFootprintStatus(model) : '';
    button.innerHTML = `<span class="model-avatar">${statusAvatar(profile, model)}</span><span class="model-copy"><strong>${escapeHtml(profileDisplayName(profile))}</strong><span>${escapeHtml(modelContactStatus(model))}</span>${lastMessageTime ? `<time class="last-message-time" title="${escapeHtml(lastMessageTime.title)}">${escapeHtml(lastMessageTime.label)}</time>` : ''}<span class="model-hover-card" role="tooltip"><b>${escapeHtml(model?.name || profile.model)}</b><em>${escapeHtml(description)}</em>${footprint ? `<small>${escapeHtml(footprint)}</small>` : ''}</span></span>`;
    button.addEventListener('dragstart', (event) => {
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('application/x-ai-profile-id', profile.id);
      event.dataTransfer.setData('text/plain', profileDisplayName(profile));
    });
    button.addEventListener('click', () => {
      pictureTargetProfileId = profile.id;
      pictureTargetModel = profile.model;
      openProfileChat(profile.id).catch((error) => setStatus('offline', error.message));
    });
    const statusToggle = button.querySelector('.status-avatar');
    const toggleProfile = async (event) => {
      event.stopPropagation();
      openProfileChat(profile.id).catch((error) => setStatus('offline', error.message));
    };
    statusToggle.addEventListener('click', toggleProfile);
    statusToggle.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleProfile(event); } });
    button.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      openProfileContextMenu(profile.id, event.clientX, event.clientY);
    });
    list.append(button);
    }
  };
  $('#favorites-section').classList.toggle('hidden', !favoriteProfiles.length);
  $('#favorites-heading').textContent = `Favorites (${favoriteProfiles.length})`;
  renderList($('#favorite-list'), favoriteProfiles, '');
  renderList($('#model-list'), onlineProfiles, profiles.length ? 'No online AI profiles match your search.' : 'No AI profiles yet.<br>Press + to create one from an installed model.');
  renderList($('#offline-model-list'), offlineProfiles, 'No offline AI profiles.');
}

function renderGroups() {
  const section = $('#group-chats-section');
  section.classList.toggle('hidden', !groups.length);
  $('#groups-heading').textContent = `Group Chats (${groups.length})`;
  const list = $('#group-list');
  list.innerHTML = '';
  for (const group of groups) {
    const participants = group.profileIds.map(profileById).filter(Boolean);
    if (participants.length < 2) continue;
    const button = document.createElement('button');
    const hasUnread = participants.some((profile) => unreadChats.has(profile.id));
    button.className = `saved-group${hasUnread ? ' unread' : ''}`;
    button.type = 'button';
    // Group chats use a neutral three-person icon in the contact list. The
    // actual assistant portraits remain available inside the chat window.
    const portraits = [0, 1, 2].map((index) => `<span class="group-figurine" data-color="${index}" aria-hidden="true"><i></i><b></b></span>`).join('');
    const participantNames = participants.map(profileDisplayName).join(', ');
    const lastMessage = lastMessageForGroup(group);
    const lastMessageTime = lastMessage ? formatLastMessageTime(lastMessage) : null;
    button.innerHTML = `<span class="saved-group-pictures">${portraits}</span><span class="model-copy"><strong>${escapeHtml(group.name)}</strong><span>${escapeHtml(participantNames)}</span>${lastMessageTime ? `<time class="last-message-time" title="${escapeHtml(lastMessageTime.title)}">${escapeHtml(lastMessageTime.label)}</time>` : ''}</span><span class="group-count">${participants.length}</span>`;
    button.addEventListener('click', async () => {
      for (const profile of participants) unreadChats.delete(profile.id);
      renderGroups();
      await Promise.all(participants.map((profile) => window.retro.setChatUnread(profile.id, false)));
      await window.retro.dockGroupChat(participants.map(profileParticipant), group.name, group.id);
    });
    button.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      closeModelContextMenu();
      groupBeingDeleted = group.id;
      const menu = $('#group-context-menu');
      menu.classList.remove('hidden');
      menu.style.left = `${Math.max(4, Math.min(event.clientX, window.innerWidth - 196))}px`;
      menu.style.top = `${Math.max(4, Math.min(event.clientY, window.innerHeight - 44))}px`;
      $('#delete-group-context').focus();
    });
    list.append(button);
  }
}

function renderProfileGroups() {
  const section = $('#assistant-groups-section');
  section.classList.toggle('hidden', !profileGroups.length);
  $('#profile-groups-heading').textContent = `Assistant Groups (${profileGroups.length})`;
  const list = $('#profile-group-list');
  list.innerHTML = '';
  for (const group of profileGroups) {
    const members = group.profileIds.map(profileById).filter(Boolean);
    const card = document.createElement('section');
    card.className = 'profile-group-card';
    card.dataset.groupId = group.id;
    const membersMarkup = members.length
      ? members.map((profile) => {
        const picture = profilePicture(profile);
        const avatar = picture ? `<img src="${picture}" alt="" />` : `<i>${escapeHtml(profileDisplayName(profile).charAt(0).toUpperCase() || 'A')}</i>`;
        return `<button class="profile-group-member" type="button" data-profile-id="${escapeHtml(profile.id)}">${avatar}<span>${escapeHtml(profileDisplayName(profile))}</span><b title="Remove from group" aria-label="Remove from group">×</b></button>`;
      }).join('')
      : '<div class="profile-group-empty">Drag AI profiles here.</div>';
    card.innerHTML = `<div class="profile-group-title"><strong>${escapeHtml(group.name)}</strong><span>${members.length}</span><button type="button" data-delete-profile-group="${escapeHtml(group.id)}" title="Delete assistant group" aria-label="Delete assistant group">×</button></div><div class="profile-group-members">${membersMarkup}</div>`;
    card.addEventListener('dragover', (event) => {
      if (!Array.from(event.dataTransfer.types).includes('application/x-ai-profile-id')) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      card.classList.add('drag-over');
    });
    card.addEventListener('dragleave', (event) => {
      if (!card.contains(event.relatedTarget)) card.classList.remove('drag-over');
    });
    card.addEventListener('drop', async (event) => {
      event.preventDefault();
      card.classList.remove('drag-over');
      const profileId = safeProfileId(event.dataTransfer.getData('application/x-ai-profile-id'));
      const profile = profileById(profileId);
      if (!profile) return;
      const target = profileGroups.find((item) => item.id === group.id);
      if (!target) return;
      target.profileIds = [...new Set([...target.profileIds, profile.id])].slice(0, 200);
      target.updatedAt = new Date().toISOString();
      await saveState(['profileGroups']);
      renderProfileGroups();
      setStatus(appOnline ? 'online' : 'offline', `Added ${profileDisplayName(profile)} to “${target.name}”`);
    });
    list.append(card);
  }
}

function openProfileGroupDialog() {
  $('#profile-group-name').value = '';
  $('#profile-group-dialog').showModal();
  $('#profile-group-name').focus();
}

async function migrateGroupsFromHistory() {
  let changed = false;
  const deletedGroupIds = new Set(preferences.deletedGroupIds || []);
  const deletedGroupKeys = new Set(preferences.deletedGroupKeys || []);
  for (const session of sessions) {
    if (session.groupId && deletedGroupIds.has(session.groupId)) continue;
    const profileIds = Array.isArray(session.groupProfileIds) && session.groupProfileIds.length
      ? session.groupProfileIds.filter((id) => profileById(id))
      : [...new Set((session.groupModels || []).map((modelName) => profiles.find((profile) => profile.model === modelName)?.id).filter(Boolean))];
    if (profileIds.length < 2) continue;
    const profilesKey = profileIds.slice().sort().join('\n');
    const name = typeof session.groupName === 'string' && session.groupName.trim() ? session.groupName.trim().slice(0, 60) : 'AI Group';
    if (deletedGroupKeys.has(groupHistoryKey(name, profileIds))) continue;
    if (groups.some((group) => group.name === name && group.profileIds.slice().sort().join('\n') === profilesKey)) continue;
    groups.push({
      id: crypto.randomUUID(),
      name,
      profileIds: profileIds.slice(0, 8),
      models: profileIds.map((id) => profileById(id)?.model).filter(Boolean),
      createdAt: session.updatedAt || new Date().toISOString(),
      updatedAt: session.updatedAt || new Date().toISOString(),
    });
    changed = true;
  }
  if (changed) {
    groups = groups.slice(0, 100);
    await saveState(['groups']);
  }
}

async function migrateLegacyProfilesFromModels() {
  if (profiles.length || !models.length || preferences.profileMigrationComplete) return;
  const hidden = new Set(preferences.hiddenModels || []);
  const deletedProfileIds = new Set(preferences.deletedProfileIds || []);
  const now = new Date().toISOString();
  const legacyConfigurations = { ...(configuration.profiles || {}) };
  const created = models
    .filter((model) => !hidden.has(model.name))
    .map((model, index) => {
      const id = preferences.modelProfileIds?.[model.name] || crypto.randomUUID();
      if (deletedProfileIds.has(id)) return null;
      const name = preferences.modelAliases?.[model.name] || (index === 0 && preferences.buddyName ? preferences.buddyName : model.name.replace(/:latest$/i, ''));
      if (legacyConfigurations[model.name] && !legacyConfigurations[id]) {
        legacyConfigurations[id] = legacyConfigurations[model.name];
      }
      return {
        id,
        model: model.name,
        name: name.trim().slice(0, 40) || 'AI',
        picture: preferences.modelPictures?.[model.name] || null,
        createdAt: now,
        updatedAt: now,
      };
    })
    .filter(Boolean);
  profiles = safeAiProfiles(created);
  configuration.profiles = Object.fromEntries(Object.entries(legacyConfigurations)
    .filter(([key]) => profiles.some((profile) => profile.id === key))
    .map(([key, value]) => [key, safeAssistantConfiguration(value)]));
  const profileForModel = new Map(profiles.map((profile) => [profile.model, profile.id]));
  sessions = sessions.map((session) => {
    const next = { ...session };
    if (!next.profileId && next.model && profileForModel.has(next.model)) next.profileId = profileForModel.get(next.model);
    if (!Array.isArray(next.groupProfileIds) && Array.isArray(next.groupModels)) {
      next.groupProfileIds = [...new Set(next.groupModels.map((modelName) => profileForModel.get(modelName)).filter(Boolean))];
    }
    return next;
  });
  groups = groups.map((group) => {
    if (group.profileIds?.length) return group;
    return {
      ...group,
      profileIds: [...new Set((group.models || []).map((modelName) => profileForModel.get(modelName)).filter(Boolean))],
    };
  }).filter((group) => group.profileIds.length >= 2 || group.models.length >= 2);
  preferences.profileMigrationComplete = true;
  await saveState(['profiles', 'configuration', 'sessions', 'groups', 'preferences']);
}

async function loadModels() {
  if (!appOnline) {
    applyConnectionStatus(false);
    return;
  }
  setStatus('connecting', 'Refreshing installed models…');
  try {
    models = await window.retro.getModels(connection, true);
    if (!appOnline) return;
    await migrateLegacyProfilesFromModels();
    renderModels();
    renderProfileGroups();
    setStatus('online', `${models.length} installed model${models.length === 1 ? '' : 's'} available`);
  } catch (error) {
    models = [];
    renderModels();
    renderProfileGroups();
    setStatus('offline', `Local model server unavailable: ${error.message}`);
  }
}

async function openModelGuide(forceRefresh = true) {
  const content = $('#model-guide-content');
  $('#model-guide-dialog').showModal();
  content.innerHTML = '<p class="model-guide-intro">Refreshing installed model details…</p>';
  try {
    if (appOnline) {
      models = await window.retro.getModels(connection, forceRefresh);
      renderModels();
      renderProfileGroups();
    }
    content.innerHTML = window.AiModelGuide.render(models);
  } catch (error) {
    content.innerHTML = `<p class="model-guide-intro">Could not refresh Ollama: ${escapeHtml(error.message)}</p>${window.AiModelGuide.render(models)}`;
  }
}

function closeMenus() {
  $$('.menu-dropdown').forEach((menu) => menu.classList.add('hidden'));
}

function openUserProfile() {
  $('#about-me-name').value = preferences.userName;
  updateAboutMePicture();
  $('#user-profile-about').value = userProfile.about;
  $('#user-profile-goals').value = userProfile.goals;
  $('#user-profile-context').value = userProfile.currentContext;
  $('#user-profile-style').value = userProfile.workStyle;
  $('#user-profile-assistance').value = userProfile.assistance;
  $('#user-profile-boundaries').value = userProfile.boundaries;
  $('#user-profile-dialog').showModal();
  $('#about-me-name').focus();
}

function updateAboutMePicture() {
  const preview = $('#about-me-picture-preview');
  const fallback = $('#about-me-picture-fallback');
  preview.classList.toggle('hidden', !preferences.userPicture);
  fallback.classList.toggle('hidden', Boolean(preferences.userPicture));
  if (preferences.userPicture) preview.src = preferences.userPicture;
  else preview.removeAttribute('src');
}

function openSetup() {
  $('#provider-input').value = connection.provider;
  $('#base-url-input').value = connection.baseUrl;
  $('#preferred-model-input').value = connection.preferredModel;
  $('#api-key-input').value = '';
  $('#api-key-input').disabled = connection.provider === 'ollama';
  $('#api-key-input').placeholder = connection.provider === 'ollama' ? 'Not required for local Ollama' : (apiKeyStored ? 'Stored securely — enter to replace' : 'Optional');
  $('#timeout-input').value = connection.timeoutSeconds;
  $('#keep-alive-input').value = connection.keepAlive;
  $('#vision-enabled-input').checked = connection.visionEnabled;
  $('#setup-result').className = 'result';
  $('#setup-result').textContent = 'Not tested yet.';
  $('#setup-dialog').showModal();
}

function onboardingReady() {
  return Boolean(preferences.setupComplete && preferences.userName && preferences.userName !== 'You' && profiles.length);
}

function updateOnboardingGuide() {
  const setupDone = preferences.setupComplete;
  const profileDone = Boolean(preferences.userName && preferences.userName !== 'You');
  const assistantDone = profiles.length > 0;
  const steps = [['#guide-step-setup', setupDone, 'Connect a local model server'], ['#guide-step-profile', profileDone, 'Create your About Me profile'], ['#guide-step-assistant', assistantDone, 'Create your first AI assistant']];
  steps.forEach(([selector, done, label]) => { const item = $(selector); if (item) item.textContent = `${done ? '✓' : '○'} ${label}`; });
  $('#guide-finish').textContent = onboardingReady() ? 'Finish setup' : 'Finish later';
}

async function maybeCompleteOnboarding() {
  updateOnboardingGuide();
  if (!onboardingReady()) return;
  preferences.onboardingComplete = true;
  await saveState(['preferences']);
  if ($('#guide-dialog').open) $('#guide-dialog').close();
}

function renderSkills() {
  const list = $('#skill-list');
  if (!draftSkills.length) { list.textContent = 'No skill files added.'; return; }
  list.innerHTML = '';
  draftSkills.forEach((skill, index) => {
    const row = document.createElement('div');
    row.className = 'skill-item';
    row.innerHTML = `<span>${escapeHtml(skill.name)}</span><button type="button">Remove</button>`;
    row.querySelector('button').addEventListener('click', () => { draftSkills.splice(index, 1); renderSkills(); });
    list.append(row);
  });
}

function openConfiguration(profileId = activePictureProfileId()) {
  const profile = profileById(profileId);
  if (!profile) {
    setStatus('offline', 'Choose an AI profile before opening assistant settings.');
    return;
  }
  configurationDialogProfileId = profile.id;
  configurationDirty.clear();
  configurationGenerated.clear();
  const activeConfiguration = configurationForProfile(configurationDialogProfileId);
  $('#configuration-model-label').textContent = `These settings apply only to ${profileDisplayName(profile)}. Powered by ${profile.model}.`;
  $('#configuration-display-name').value = profile.name || '';
  $('#configuration-picture').value = '';
  delete $('#configuration-picture').dataset.value;
  const picturePreview = $('#configuration-picture-preview');
  picturePreview.src = profile.picture || '';
  picturePreview.classList.toggle('hidden', !profile.picture);
  $('#configuration-picture-status').textContent = profile.picture ? 'Current profile image' : 'Classic AI picture';
  $('#soul-prompt').value = activeConfiguration.soul;
  $('#personality-prompt').value = activeConfiguration.personality;
  $('#assistant-gender').value = activeConfiguration.gender;
  $('#configuration-tone').value = TONES.has(activeConfiguration.tone) ? activeConfiguration.tone : 'helpful';
  $('#configuration-preset').value = 'blank';
  $('#tone-prompt').value = activeConfiguration.tonePrompt;
  $('#custom-instructions').value = activeConfiguration.customInstructions;
  const promptSkill = activeConfiguration.skills.find((skill) => skill.name === CONTACT_SKILLS_PROMPT_NAME);
  $('#skills-prompt').value = promptSkill?.content || '';
  draftSkills = activeConfiguration.skills.map((skill) => ({ ...skill }));
  renderSkills();
  $('#configuration-dialog').showModal();
}

function applyConfigurationPreset(presetKey) {
  const preset = ASSISTANT_PRESETS[presetKey];
  if (!preset || presetKey === 'blank') return;
  const fields = [
    ['tone', '#configuration-tone', preset.tone],
    ['gender', '#assistant-gender', preset.gender],
    ['tonePrompt', '#tone-prompt', preset.tonePrompt],
    ['soul', '#soul-prompt', preset.soul],
    ['personality', '#personality-prompt', preset.personality],
    ['instructions', '#custom-instructions', preset.customInstructions],
    ['skills', '#skills-prompt', preset.skills],
  ];
  fields.forEach(([key, selector, value]) => {
    if (!configurationDirty.has(key) && (!$(selector).value.trim() || configurationGenerated.has(key) || key === 'tone' || key === 'gender')) {
      $(selector).value = value;
      configurationGenerated.add(key);
    }
  });
}

async function pictureFromFile(file) {
  if (!file?.type.startsWith('image/')) throw new Error('Choose a PNG, JPEG, or WebP image.');
  if (file.size > 12 * 1024 * 1024) throw new Error('Choose an image smaller than 12 MB.');
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file);
  });
  const image = await new Promise((resolve, reject) => {
    const value = new Image(); value.onload = () => resolve(value); value.onerror = reject; value.src = dataUrl;
  });
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
  const scale = Math.max(512 / image.width, 512 / image.height);
  canvas.getContext('2d').drawImage(image, (512 - image.width * scale) / 2, (512 - image.height * scale) / 2, image.width * scale, image.height * scale);
  return canvas.toDataURL('image/jpeg', .86);
}

async function storePicture(file, type) {
  if (!file) return;
  const picture = await pictureFromFile(file);
  if (type === 'buddy') {
    const profile = profileById(activePictureProfileId());
    if (!profile) throw new Error('Choose an AI profile before changing its picture.');
    profile.picture = picture;
    profile.updatedAt = new Date().toISOString();
  } else {
    preferences.userPicture = picture;
  }
  await saveState(type === 'buddy' ? ['profiles'] : ['preferences']);
  renderModels();
  renderProfileGroups();
}

function resetNewContactFields() {
  $('#new-contact-name').value = '';
  $('#new-contact-tone').value = 'helpful';
  $('#new-contact-gender').value = 'neutral';
  $('#new-contact-tone-prompt').value = '';
  $('#new-contact-soul').value = '';
  $('#new-contact-personality').value = '';
  $('#new-contact-instructions').value = '';
  $('#new-contact-skills').value = '';
  newContactPicture = null;
  const preview = $('#new-contact-picture-preview');
  preview.classList.add('hidden');
  preview.removeAttribute('src');
  $('#new-contact-picture-fallback').classList.remove('hidden');
  $('#new-contact-picture-status').textContent = 'Generic AI figurine';
  $('#new-contact-picture').value = '';
  newContactDirty.clear();
  newContactGenerated.clear();
}

function applyNewContactPreset(presetKey) {
  const preset = ASSISTANT_PRESETS[presetKey] || ASSISTANT_PRESETS.blank;
  const fields = [
    ['name', '#new-contact-name', preset.name],
    ['tone', '#new-contact-tone', preset.tone],
    ['gender', '#new-contact-gender', preset.gender],
    ['tonePrompt', '#new-contact-tone-prompt', preset.tonePrompt],
    ['soul', '#new-contact-soul', preset.soul],
    ['personality', '#new-contact-personality', preset.personality],
    ['instructions', '#new-contact-instructions', preset.customInstructions],
    ['skills', '#new-contact-skills', preset.skills],
  ];
  fields.forEach(([key, selector, value]) => {
    if (!newContactDirty.has(key) && (!$(selector).value.trim() || newContactGenerated.has(key) || key === 'tone' || key === 'gender')) {
      $(selector).value = value;
      newContactGenerated.add(key);
    }
  });
}

function openNewContactDialog() {
  if (!models.length) {
    setStatus('offline', 'No installed models are available. Open Tools → Setup local model first.');
    return;
  }
  const select = $('#new-contact-model');
  select.innerHTML = '';
  for (const model of models) {
    const option = document.createElement('option');
    option.value = model.name;
    option.textContent = model.name;
    select.append(option);
  }
  select.value = models.some((model) => model.name === pictureTargetModel)
    ? pictureTargetModel
    : (models.some((model) => model.name === connection.preferredModel) ? connection.preferredModel : models[0].name);
  $('#new-contact-preset').value = 'blank';
  resetNewContactFields();
  applyNewContactPreset('blank');
  $('#new-contact-dialog').showModal();
}

function openGroupChatDialog() {
  if (profiles.length < 2) {
    setStatus('offline', 'Create at least two AI profiles to create a group chat.');
    return;
  }
  $('#group-chat-name').value = '';
  $('#group-chat-error').textContent = '';
  const list = $('#group-model-list');
  list.innerHTML = '';
  for (const profile of profiles) {
    const row = document.createElement('label');
    row.className = 'group-model-option';
    const picture = profilePicture(profile);
    row.innerHTML = `<input type="checkbox" value="${escapeHtml(profile.id)}" /><span class="model-avatar">${picture ? `<img src="${picture}" alt="" />` : '<span class="person-avatar"><i></i><b></b></span>'}</span><span><strong>${escapeHtml(profileDisplayName(profile))}</strong><small>${escapeHtml(profile.model)}</small></span>`;
    list.append(row);
  }
  $('#group-chat-dialog').showModal();
  $('#group-chat-name').focus();
}

function focusedInput() {
  const active = document.activeElement;
  return active && ['INPUT', 'TEXTAREA'].includes(active.tagName) ? active : null;
}

async function editCommand(command) {
  const input = focusedInput();
  if (command === 'paste') {
    if (!input) return;
    input.setRangeText(await window.retro.readClipboardText(), input.selectionStart, input.selectionEnd, 'end');
    return;
  }
  const text = input && input.selectionStart !== input.selectionEnd ? input.value.slice(input.selectionStart, input.selectionEnd) : window.getSelection()?.toString();
  if (!text) return;
  await window.retro.writeClipboardText(text);
  if (command === 'cut' && input) input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
}

$$('[data-window-action]').forEach((button) => button.addEventListener('click', () => window.retro.windowControl(button.dataset.windowAction)));
$$('.menu-trigger').forEach((button) => button.addEventListener('click', (event) => { event.stopPropagation(); const menu = $(`#${button.dataset.menu}`); const open = menu.classList.contains('hidden'); closeMenus(); if (open) menu.classList.remove('hidden'); }));
document.addEventListener('click', (event) => {
  if (!event.target.closest('.menu-root')) closeMenus();
  if (!event.target.closest('#model-context-menu, #group-context-menu')) closeModelContextMenu();
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModelContextMenu(); });
$$('[data-close]').forEach((button) => button.addEventListener('click', () => $(`#${button.dataset.close}`).close()));

$$('[data-command]').forEach((button) => button.addEventListener('click', async () => {
  closeMenus();
  const command = button.dataset.command;
  if (command === 'refresh') await loadModels();
  if (command === 'hide') window.retro.windowControl('hide');
  if (command === 'exit') window.retro.windowControl('quit');
  if (['cut', 'copy', 'paste'].includes(command)) await editCommand(command);
  if (command === 'theme-light' || command === 'theme-dark') { preferences.theme = command.endsWith('dark') ? 'dark' : 'light'; await saveState(['preferences']); }
  if (command.startsWith('font-')) { preferences.fontSize = command.split('-')[1]; await saveState(['preferences']); }
  if (command.startsWith('tone-')) {
    const activeConfiguration = configurationForProfile(activePictureProfileId(), true);
    activeConfiguration.tone = command.slice(5);
    await saveState(['configuration']);
  }
  if (command === 'setup') openSetup();
  if (command === 'edit-names') openUserProfile();
  if (command === 'user-profile') openUserProfile();
  if (command === 'assistant-config') openConfiguration();
  if (command === 'buddy-picture') $('#buddy-picture-input').click();
  if (command === 'user-picture') $('#user-picture-input').click();
  if (command === 'forget-auto-unlock') {
    await window.retro.setAutomaticUnlock(false);
    alert('Automatic vault login is off. Your passphrase will be required the next time AI Messenger starts.');
  }
  if (command === 'features') $('#features-dialog').showModal();
  if (command === 'about-us') $('#about-us-dialog').showModal();
  if (command === 'model-guide') await openModelGuide(true);
  if (command === 'setup-guide') $('#guide-dialog').showModal();
  if (command === 'user-guide') $('#user-guide-dialog').showModal();
  if (command === 'license') $('#license-dialog').showModal();
  if (command === 'terms') $('#terms-dialog').showModal();
  if (command === 'user-data') $('#user-data-dialog').showModal();
  if (command === 'contact-us') $('#contact-us-dialog').showModal();
}));

$('#refresh-models').addEventListener('click', loadModels);
$('#refresh-model-guide').addEventListener('click', () => openModelGuide(true));
$('#user-presence-toggle').addEventListener('click', toggleConnectionStatus);
$('#connection-status-button').addEventListener('click', toggleConnectionStatus);
$('#stop-all-models').addEventListener('click', async (event) => {
  event.stopPropagation();
  const button = $('#stop-all-models');
  button.disabled = true;
  button.textContent = 'Stopping…';
  try {
    const result = await window.retro.stopAllChats();
    setStatus(appOnline ? 'online' : 'offline', result.stopped
      ? `Stopped ${result.stopped} active AI task${result.stopped === 1 ? '' : 's'}`
      : 'No AI tasks are currently running');
  } catch (error) {
    setStatus('offline', `Could not stop all tasks: ${error.message}`);
  } finally {
    button.disabled = false;
    button.textContent = 'Stop All';
  }
});
$('#model-search').addEventListener('input', renderModels);
$('#toggle-online').addEventListener('click', () => { const hidden = $('#model-list').classList.toggle('hidden'); $('#toggle-online').textContent = hidden ? '▸' : '▾'; $('#toggle-online').setAttribute('aria-expanded', String(!hidden)); });
$('#toggle-offline').addEventListener('click', () => { const hidden = $('#offline-model-list').classList.toggle('hidden'); $('#toggle-offline').textContent = hidden ? '▸' : '▾'; $('#toggle-offline').setAttribute('aria-expanded', String(!hidden)); });
$('#toggle-groups').addEventListener('click', () => { const hidden = $('#group-list').classList.toggle('hidden'); $('#toggle-groups').textContent = hidden ? '▸' : '▾'; $('#toggle-groups').setAttribute('aria-expanded', String(!hidden)); });
$('#toggle-favorites').addEventListener('click', () => { const hidden = $('#favorite-list').classList.toggle('hidden'); $('#toggle-favorites').textContent = hidden ? '▸' : '▾'; $('#toggle-favorites').setAttribute('aria-expanded', String(!hidden)); });
$('#toggle-profile-groups').addEventListener('click', () => { const hidden = $('#profile-group-list').classList.toggle('hidden'); $('#toggle-profile-groups').textContent = hidden ? '▸' : '▾'; $('#toggle-profile-groups').setAttribute('aria-expanded', String(!hidden)); });
$('#add-chat').addEventListener('click', openNewContactDialog);
$('#add-profile-group').addEventListener('click', openProfileGroupDialog);
$('#add-group-chat').addEventListener('click', openGroupChatDialog);
$('#profile-group-list').addEventListener('click', async (event) => {
  const deleteButton = event.target.closest('[data-delete-profile-group]');
  if (deleteButton) {
    const group = profileGroups.find((item) => item.id === deleteButton.dataset.deleteProfileGroup);
    if (!group) return;
    if (!window.confirm(`Delete assistant group “${group.name}”? This only removes the organizer group, not the AI profiles or chats.`)) return;
    profileGroups = profileGroups.filter((item) => item.id !== group.id);
    await saveState(['profileGroups']);
    renderProfileGroups();
    setStatus(appOnline ? 'online' : 'offline', `Deleted assistant group “${group.name}”`);
    return;
  }
  const member = event.target.closest('.profile-group-member');
  if (!member) return;
  const profileId = safeProfileId(member.dataset.profileId);
  if (event.target.closest('b')) {
    const card = member.closest('.profile-group-card');
    const group = profileGroups.find((item) => item.id === card?.dataset.groupId);
    if (!group) return;
    group.profileIds = group.profileIds.filter((id) => id !== profileId);
    group.updatedAt = new Date().toISOString();
    await saveState(['profileGroups']);
    renderProfileGroups();
    return;
  }
  const profile = profileById(profileId);
  if (profile) openProfileChat(profile.id).catch((error) => setStatus('offline', error.message));
});
$('#dock-chat-chevron').addEventListener('click', async () => {
  const button = $('#dock-chat-chevron');
  const selected = filteredProfiles[0] || profiles[0];
  if (!selected) {
    setStatus('offline', 'Create an AI profile before attaching chat.');
    return;
  }
  button.disabled = true;
  try {
    await window.retro.dockChat(selected.id, selected.model);
  } catch (error) {
    setStatus('offline', error.message);
  } finally {
    button.disabled = false;
  }
});
$('#user-identity-card').addEventListener('click', (event) => {
  if (!event.target.closest('#user-presence-toggle, #stop-all-models')) openUserProfile();
});
$('#user-identity-card').addEventListener('keydown', (event) => {
  if (event.target !== $('#user-identity-card')) return;
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openUserProfile();
  }
});
$('#rename-model-context').addEventListener('click', () => {
  const profileId = profileBeingRenamed;
  closeModelContextMenu();
  if (profileId) openProfileRename(profileId);
});
$('#favorite-model-context').addEventListener('click', async () => {
  const profileId = profileBeingRenamed;
  closeModelContextMenu();
  const profile = profileById(profileId);
  if (!profile) return;
  profile.favorite = !profile.favorite;
  await saveState(['profiles']);
  renderModels();
  setStatus(appOnline ? 'online' : 'offline', `${profileDisplayName(profile)} ${profile.favorite ? 'added to' : 'removed from'} Favorites`);
});
$('#configure-model-context').addEventListener('click', () => {
  const profileId = profileBeingRenamed;
  closeModelContextMenu();
  if (profileId) openConfiguration(profileId);
});
$('#suspend-model-context').addEventListener('click', async () => {
  const profileId = profileBeingRenamed;
  closeModelContextMenu();
  const profile = profileById(profileId);
  if (!profile) return;
  if (profile.online === false) {
    await openProfileChat(profile.id);
    return;
  }
  profile.online = false;
  profileSleepState.delete(profile.id);
  modelHealth.set(profile.model, 'offline');
  await saveState(['profiles']);
  suspendModelIfUnused(profile.model, profile.id);
  renderModels();
  renderProfileGroups();
});
$('#delete-model-context').addEventListener('click', async () => {
  const profileId = profileBeingRenamed;
  closeModelContextMenu();
  const profile = profileById(profileId);
  if (!profile || profile.online === false) return;
  const displayName = profileDisplayName(profile);
  const accepted = window.confirm(`Delete assistant “${displayName}”? Its encrypted chat history will be kept, but it will no longer appear in contacts.`);
  if (!accepted) return;
  await window.retro.closeProfileConversation(profile.id);
  preferences.deletedProfileIds = [...new Set([...(preferences.deletedProfileIds || []), profile.id])].slice(0, 200);
  profiles = profiles.filter((item) => item.id !== profile.id);
  configuration.profiles = { ...(configuration.profiles || {}) };
  delete configuration.profiles[profile.id];
  groups = groups
    .map((group) => {
      const profileIds = group.profileIds.filter((id) => id !== profile.id);
      return { ...group, profileIds, models: profileIds.map((id) => profileById(id)?.model).filter(Boolean) };
    })
    .filter((group) => group.profileIds.length >= 2);
  profileGroups = profileGroups.map((group) => ({ ...group, profileIds: group.profileIds.filter((id) => id !== profile.id), updatedAt: new Date().toISOString() }));
  await saveState(['profiles', 'profileGroups', 'configuration', 'groups', 'preferences']);
  renderModels();
  renderProfileGroups();
  renderGroups();
  setStatus(appOnline ? 'online' : 'offline', `Deleted assistant “${displayName}” · history retained`);
  profileBeingRenamed = '';
});
$('#delete-group-context').addEventListener('click', async () => {
  const group = groups.find((item) => item.id === groupBeingDeleted);
  closeModelContextMenu();
  if (!group) return;
  const accepted = window.confirm(`Delete “${group.name}”? This removes the group from the list. Its encrypted history remains in the cache.`);
  if (!accepted) return;
  const profileKey = group.profileIds.slice().sort().join('\n');
  preferences.deletedGroupIds = [...new Set([...(preferences.deletedGroupIds || []), group.id])].slice(0, 200);
  preferences.deletedGroupKeys = [...new Set([...(preferences.deletedGroupKeys || []), groupHistoryKey(group.name, group.profileIds)])].slice(0, 200);
  groups = groups.filter((item) => item.id !== group.id);
  sessions = sessions.filter((session) => {
    if (session.groupId === group.id) return false;
    return !(!session.groupId && Array.isArray(session.groupProfileIds) && session.groupProfileIds.slice().sort().join('\n') === profileKey && session.groupName === group.name);
  });
  await saveState(['groups', 'sessions', 'preferences']);
  renderGroups();
  setStatus('online', `Deleted group chat “${group.name}”`);
  groupBeingDeleted = '';
});
$('#vault-quit').addEventListener('click', () => window.retro.windowControl('quit'));

$('#identity-form').addEventListener('submit', async (event) => { event.preventDefault(); preferences.userName = $('#user-name').value.trim() || 'You'; await saveState(['preferences']); $('#identity-dialog').close(); });
$('#user-profile-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  preferences.userName = $('#about-me-name').value.trim().slice(0, 40) || 'You';
  userProfile = safeUserProfile({
    about: $('#user-profile-about').value,
    goals: $('#user-profile-goals').value,
    currentContext: $('#user-profile-context').value,
    workStyle: $('#user-profile-style').value,
    assistance: $('#user-profile-assistance').value,
    boundaries: $('#user-profile-boundaries').value,
  });
  await saveState(['preferences', 'userProfile']);
  $('#user-profile-dialog').close();
  setStatus('online', 'About Me saved across every chat');
  updateOnboardingGuide();
  if (!preferences.onboardingComplete) $('#guide-dialog').showModal();
});
$('#about-me-change-picture').addEventListener('click', () => $('#user-picture-input').click());
$('#about-me-reset-picture').addEventListener('click', async () => {
  preferences.userPicture = null;
  await saveState(['preferences']);
});
$('#reset-user-profile').addEventListener('click', () => {
  $('#user-profile-about').value = '';
  $('#user-profile-goals').value = '';
  $('#user-profile-context').value = '';
  $('#user-profile-style').value = '';
  $('#user-profile-assistance').value = '';
  $('#user-profile-boundaries').value = '';
});
$('#model-name-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const profile = profileById(profileBeingRenamed);
  if (!profile) return;
  profile.name = $('#model-custom-name').value.trim().slice(0, 40) || 'AI';
  profile.updatedAt = new Date().toISOString();
  await saveState(['profiles']);
  renderModels();
  renderProfileGroups();
  renderGroups();
  $('#model-name-dialog').close();
});
$('#reset-model-name').addEventListener('click', async () => {
  const profile = profileById(profileBeingRenamed);
  if (!profile) return;
  profile.name = profile.model.replace(/:latest$/i, '').slice(0, 40) || 'AI';
  profile.updatedAt = new Date().toISOString();
  await saveState(['profiles']);
  renderModels();
  renderProfileGroups();
  renderGroups();
  $('#model-name-dialog').close();
});
$('#new-contact-model').addEventListener('change', () => {
  // Changing the backing model must not alter any profile fields.
});
$('#new-contact-preset').addEventListener('change', () => applyNewContactPreset($('#new-contact-preset').value));
[
  ['name', '#new-contact-name'],
  ['tonePrompt', '#new-contact-tone-prompt'],
  ['soul', '#new-contact-soul'],
  ['personality', '#new-contact-personality'],
  ['instructions', '#new-contact-instructions'],
  ['skills', '#new-contact-skills'],
].forEach(([key, selector]) => $(selector).addEventListener('input', () => newContactDirty.add(key)));
$('#new-contact-gender').addEventListener('change', () => newContactDirty.add('gender'));
$('#configuration-preset').addEventListener('change', () => applyConfigurationPreset($('#configuration-preset').value));
[
  ['name', '#configuration-display-name'],
  ['tonePrompt', '#tone-prompt'],
  ['soul', '#soul-prompt'],
  ['personality', '#personality-prompt'],
  ['instructions', '#custom-instructions'],
  ['skills', '#skills-prompt'],
].forEach(([key, selector]) => $(selector).addEventListener('input', () => configurationDirty.add(key)));
$('#configuration-tone').addEventListener('change', () => configurationDirty.add('tone'));
$('#assistant-gender').addEventListener('change', () => configurationDirty.add('gender'));
$('#configuration-picture').addEventListener('change', async () => {
  const file = $('#configuration-picture').files[0];
  if (!file) return;
  try {
    const profilePicture = await pictureFromFile(file);
    $('#configuration-picture-preview').src = profilePicture;
    $('#configuration-picture-preview').classList.remove('hidden');
    $('#configuration-picture-status').textContent = file.name;
    $('#configuration-picture').dataset.value = profilePicture;
  } catch (error) {
    alert(error.message);
    $('#configuration-picture').value = '';
  }
});
$('#new-contact-picture').addEventListener('change', async () => {
  const file = $('#new-contact-picture').files[0];
  if (!file) return;
  try {
    newContactPicture = await pictureFromFile(file);
    $('#new-contact-picture-preview').src = newContactPicture;
    $('#new-contact-picture-preview').classList.remove('hidden');
    $('#new-contact-picture-fallback').classList.add('hidden');
    $('#new-contact-picture-status').textContent = file.name;
  } catch (error) {
    alert(error.message);
    $('#new-contact-picture').value = '';
  }
});
$('#new-contact-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = $('#new-contact-submit');
  if (submitButton.disabled) return;
  const modelName = $('#new-contact-model').value;
  if (!models.some((model) => model.name === modelName)) {
    alert('Choose an installed model.');
    return;
  }
  submitButton.disabled = true;
  submitButton.textContent = 'Creating…';
  try {
    const displayName = $('#new-contact-name').value.trim().slice(0, 40) || 'AI';
    const profile = {
      id: crypto.randomUUID(),
      model: modelName,
      name: displayName,
      picture: newContactPicture,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const skillsPrompt = $('#new-contact-skills').value.trim();
    const skills = skillsPrompt ? [{ name: CONTACT_SKILLS_PROMPT_NAME, content: skillsPrompt }] : [];
    profiles = [profile, ...profiles].slice(0, 200);
    configuration.profiles[profile.id] = {
      soul: $('#new-contact-soul').value.trim(),
      personality: $('#new-contact-personality').value.trim(),
      tone: TONES.has($('#new-contact-tone').value) ? $('#new-contact-tone').value : 'helpful',
      gender: AI_GENDERS.has($('#new-contact-gender').value) ? $('#new-contact-gender').value : 'neutral',
      tonePrompt: $('#new-contact-tone-prompt').value.trim(),
      customInstructions: $('#new-contact-instructions').value.trim(),
      skills,
    };
    pictureTargetProfileId = profile.id;
    pictureTargetModel = modelName;
    await saveState(['profiles', 'configuration']);
    renderModels();
    $('#new-contact-dialog').close();
    await openProfileChat(profile.id);
    updateOnboardingGuide();
    if (!preferences.onboardingComplete) $('#guide-dialog').showModal();
  } catch (error) {
    setStatus('offline', `Could not create contact: ${error.message}`);
    alert(`Could not create the AI contact: ${error.message}`);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Create Contact';
  }
});
$('#profile-group-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = $('#profile-group-name').value.trim().slice(0, 60);
  if (!name) return;
  const now = new Date().toISOString();
  profileGroups = [{ id: crypto.randomUUID(), name, profileIds: [], createdAt: now, updatedAt: now }, ...profileGroups].slice(0, 100);
  await saveState(['profileGroups']);
  renderProfileGroups();
  $('#profile-group-dialog').close();
  setStatus(appOnline ? 'online' : 'offline', `Created assistant group “${name}”`);
});
$('#group-chat-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const selectedProfileIds = $$('#group-model-list input:checked').map((input) => input.value).filter((id) => profileById(id));
  if (selectedProfileIds.length < 2) {
    $('#group-chat-error').textContent = 'Choose at least two AI Friends.';
    return;
  }
  const groupName = $('#group-chat-name').value.trim();
  if (!groupName) return;
  $('#group-chat-error').textContent = '';
  try {
    const now = new Date().toISOString();
    const participants = selectedProfileIds.map(profileById).filter(Boolean);
    const group = { id: crypto.randomUUID(), name: groupName.slice(0, 60), profileIds: selectedProfileIds, models: participants.map((profile) => profile.model), createdAt: now, updatedAt: now };
    groups = [group, ...groups].slice(0, 100);
    await saveState(['groups']);
    renderGroups();
    await window.retro.dockGroupChat(participants.map(profileParticipant), group.name, group.id);
    $('#group-chat-dialog').close();
  } catch (error) {
    $('#group-chat-error').textContent = error.message;
  }
});
$('#provider-input').addEventListener('change', () => { const ollama = $('#provider-input').value === 'ollama'; $('#api-key-input').disabled = ollama; $('#api-key-input').placeholder = ollama ? 'Not required for local Ollama' : (apiKeyStored ? 'Stored securely — enter to replace' : 'Optional'); $('#base-url-input').value = ollama ? 'http://127.0.0.1:11434' : 'http://127.0.0.1:1234/v1'; });
$('#detect-ollama').addEventListener('click', async () => { const button = $('#detect-ollama'); button.disabled = true; $('#setup-result').className = 'result'; $('#setup-result').textContent = 'Looking for Ollama on this device…'; try { const result = await window.retro.discoverOllama(connection); const detected = result.connection; $('#provider-input').value = 'ollama'; $('#base-url-input').value = detected.baseUrl; $('#preferred-model-input').value = detected.preferredModel || ''; $('#api-key-input').value = ''; $('#api-key-input').disabled = true; $('#setup-result').className = 'result success'; $('#setup-result').textContent = `✓ Ollama ${result.version || 'detected'} · ${result.models.length} model${result.models.length === 1 ? '' : 's'} found. Review the fields, then choose Save & Connect.`; } catch (error) { $('#setup-result').className = 'result error'; $('#setup-result').textContent = error.message; } finally { button.disabled = false; } });
$('#test-connection').addEventListener('click', async () => { $('#setup-result').className = 'result'; $('#setup-result').textContent = 'Testing local connection…'; try { const result = await window.retro.testConnection(connectionFromForm()); $('#setup-result').className = 'result success'; $('#setup-result').textContent = `✓ ${result.message}`; } catch (error) { $('#setup-result').className = 'result error'; $('#setup-result').textContent = error.message; } });

function connectionFromForm() { return { provider: $('#provider-input').value === 'openai' ? 'openai' : 'ollama', baseUrl: $('#base-url-input').value.trim(), preferredModel: $('#preferred-model-input').value.trim(), apiKey: $('#api-key-input').value, timeoutSeconds: Math.min(600, Math.max(10, Number($('#timeout-input').value) || 120)), keepAlive: $('#keep-alive-input').value.trim() || '10m', visionEnabled: $('#vision-enabled-input').checked }; }
$('#setup-form').addEventListener('submit', async (event) => { event.preventDefault(); const next = connectionFromForm(); const key = next.apiKey; delete next.apiKey; if (next.provider === 'ollama') { await window.retro.saveApiKey(''); apiKeyStored = false; } else if (key) { await window.retro.saveApiKey(key); apiKeyStored = true; } connection = next; preferences.setupComplete = true; await saveState(['connection', 'preferences']); $('#setup-dialog').close(); await loadModels(); updateOnboardingGuide(); if (!preferences.onboardingComplete) $('#guide-dialog').showModal(); });

async function readTextFile(file) { if (!file) return ''; if (file.size > 200 * 1024) throw new Error(`${file.name} is larger than 200 KB.`); return file.text(); }
$('#import-soul').addEventListener('click', () => $('#soul-file').click()); $('#import-personality').addEventListener('click', () => $('#personality-file').click()); $('#add-skills').addEventListener('click', () => $('#skill-files').click());
$('#soul-file').addEventListener('change', async () => { $('#soul-prompt').value = await readTextFile($('#soul-file').files[0]); $('#soul-file').value = ''; });
$('#personality-file').addEventListener('change', async () => { $('#personality-prompt').value = await readTextFile($('#personality-file').files[0]); $('#personality-file').value = ''; });
$('#skill-files').addEventListener('change', async () => { for (const file of [...$('#skill-files').files].slice(0, 20)) { const skill = { name: file.name, content: await readTextFile(file) }; const index = draftSkills.findIndex((entry) => entry.name === file.name); if (index >= 0) draftSkills[index] = skill; else draftSkills.push(skill); } $('#skill-files').value = ''; renderSkills(); });
$('#reset-configuration').addEventListener('click', () => {
  configurationDirty.clear();
  configurationGenerated.clear();
  const profile = profileById(configurationDialogProfileId);
  if (profile) $('#configuration-display-name').value = profile.name || '';
  $('#configuration-preset').value = 'blank';
  $('#configuration-tone').value = 'helpful';
  $('#assistant-gender').value = 'neutral';
  $('#soul-prompt').value = '';
  $('#personality-prompt').value = '';
  $('#tone-prompt').value = '';
  $('#custom-instructions').value = '';
  $('#skills-prompt').value = '';
  draftSkills = [];
  renderSkills();
});
$('#configuration-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const profile = profileById(configurationDialogProfileId);
  if (!profile) return;
  const existing = configurationForProfile(configurationDialogProfileId);
  const skills = draftSkills.filter((skill) => skill.name !== CONTACT_SKILLS_PROMPT_NAME).slice(0, 19);
  const skillsPrompt = $('#skills-prompt').value.trim();
  if (skillsPrompt) skills.unshift({ name: CONTACT_SKILLS_PROMPT_NAME, content: skillsPrompt });
  profile.name = $('#configuration-display-name').value.trim().slice(0, 40) || 'AI';
  const newPicture = $('#configuration-picture').dataset.value;
  if (newPicture) profile.picture = newPicture;
  profile.updatedAt = new Date().toISOString();
  configuration.profiles[configurationDialogProfileId] = {
    soul: $('#soul-prompt').value.trim(),
    personality: $('#personality-prompt').value.trim(),
    tonePrompt: $('#tone-prompt').value.trim(),
    customInstructions: $('#custom-instructions').value.trim(),
    skills,
    tone: TONES.has($('#configuration-tone').value) ? $('#configuration-tone').value : existing.tone,
    gender: AI_GENDERS.has($('#assistant-gender').value) ? $('#assistant-gender').value : 'neutral',
  };
  await saveState(['profiles', 'configuration']);
  renderModels();
  renderProfileGroups();
  renderGroups();
  $('#configuration-dialog').close();
});
$('#buddy-picture-input').addEventListener('change', async () => { await storePicture($('#buddy-picture-input').files[0], 'buddy'); $('#buddy-picture-input').value = ''; });
$('#user-picture-input').addEventListener('change', async () => { await storePicture($('#user-picture-input').files[0], 'user'); $('#user-picture-input').value = ''; });
$('#guide-setup').addEventListener('click', () => { $('#guide-dialog').close(); openSetup(); });
$('#guide-profile').addEventListener('click', () => { $('#guide-dialog').close(); openUserProfile(); });
$('#guide-assistant').addEventListener('click', () => { $('#guide-dialog').close(); openNewContactDialog(); });
$('#guide-finish').addEventListener('click', async () => { if (onboardingReady()) await maybeCompleteOnboarding(); else $('#guide-dialog').close(); });
const coffeeBanner = $('#coffee-banner');
if (localStorage.getItem(COFFEE_BANNER_CLOSED_KEY) === '1') coffeeBanner.classList.add('hidden');
$('#close-coffee-banner').addEventListener('click', () => { coffeeBanner.classList.add('hidden'); localStorage.setItem(COFFEE_BANNER_CLOSED_KEY, '1'); });
$('#coffee-banner-link').addEventListener('click', () => window.retro.openExternal('https://buymeacoffee.com/jesadac').catch((error) => setStatus('offline', error.message)));

window.retro.onStateChanged((state, sections) => {
  applyState(state, sections);
  if (sections.includes('profiles') || sections.includes('preferences')) {
    renderModels();
    renderProfileGroups();
    renderGroups();
  }
  if (sections.includes('profileGroups')) renderProfileGroups();
  if (sections.includes('groups')) renderGroups();
  if (sections.includes('connection')) loadModels();
});
window.retro.onDockState((state) => {
  dockedChat = Boolean(state?.docked);
  dockedModel = typeof state?.model === 'string' ? state.model : '';
  dockedProfileId = safeProfileId(state?.profileId);
  document.documentElement.dataset.docked = String(dockedChat);
  renderModels();
  renderProfileGroups();
});
window.retro.onChatUnreadChanged((state) => {
  const chatId = safeProfileId(state?.chatId) || safeProfileId(state?.model);
  if (!chatId) return;
  if (state.unread) unreadChats.add(chatId);
  else unreadChats.delete(chatId);
  renderModels();
  renderProfileGroups();
  renderGroups();
});
window.retro.onConnectionStatusChanged((state) => {
  applyConnectionStatus(state?.online);
  if (state?.online) loadModels();
});
window.retro.onModelStatusChanged((state) => {
  if (typeof state?.model !== 'string') return;
  modelHealth.set(state.model, state.status === 'timeout' ? 'timeout' : state.status === 'offline' ? 'offline' : 'online');
  renderModels();
  renderProfileGroups();
});
window.retro.onProfileActivity((state) => {
  touchProfile(typeof state?.profileId === 'string' ? state.profileId : '', typeof state?.model === 'string' ? state.model : '');
  renderModels();
  renderProfileGroups();
});

setInterval(checkProfileIdle, 30 * 1000);

async function initialize() {
  try {
    const state = await requestVaultUnlock();
    const storedConfiguration = state?.configuration || {};
    const configurationHadProfiles = storedConfiguration.profiles && typeof storedConfiguration.profiles === 'object' && Object.keys(storedConfiguration.profiles).length;
    const configurationNeedsMigration = !configurationHadProfiles && hasAssistantCustomization(storedConfiguration.legacy || storedConfiguration);
    applyState(state);
    if (configurationNeedsMigration) await saveState(['configuration']);
    apiKeyStored = Boolean((await window.retro.secretStatus()).apiKeyStored);
    unreadChats = new Set(await window.retro.getUnreadModels());
    applyConnectionStatus((await window.retro.getConnectionStatus()).online);
    if (appOnline) await loadModels();
    await migrateGroupsFromHistory();
    renderProfileGroups();
    renderGroups();
    if (!preferences.onboardingComplete) { updateOnboardingGuide(); $('#guide-dialog').showModal(); }
  } catch (error) {
    setStatus('offline', error.message);
  }
}

initialize();
