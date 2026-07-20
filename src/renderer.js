const els = {
  statusDot: document.querySelector('#status-dot'),
  statusText: document.querySelector('#status-text'),
  chatColumn: document.querySelector('.chat-column'),
  chatResizeDivider: document.querySelector('#chat-resize-divider'),
  modelSelect: document.querySelector('#model-select'),
  modelCaption: document.querySelector('#model-caption'),
  groupMentions: document.querySelector('#group-mentions'),
  mentionAutocomplete: document.querySelector('#mention-autocomplete'),
  messages: document.querySelector('#messages'),
  composer: document.querySelector('#composer'),
  prompt: document.querySelector('#prompt'),
  send: document.querySelector('#send-button'),
  stop: document.querySelector('#stop-button'),
  inviteButton: document.querySelector('#invite-button'),
  sendFileButton: document.querySelector('#send-file-button'),
  sendFileInput: document.querySelector('#send-file-input'),
  clearChatButton: document.querySelector('#clear-chat-button'),
  startNewChatButton: document.querySelector('#start-new-chat-button'),
  thinkingMode: document.querySelector('#thinking-mode'),
  capture: document.querySelector('#capture-button'),
  attachment: document.querySelector('#attachment'),
  attachmentImage: document.querySelector('#attachment-image'),
  attachmentName: document.querySelector('#attachment-name'),
  removeAttachment: document.querySelector('#remove-attachment'),
  dialog: document.querySelector('#source-dialog'),
  sourceGrid: document.querySelector('#source-grid'),
  permissionWarning: document.querySelector('#permission-warning'),
  openPermissions: document.querySelector('#open-permissions'),
  closeDialog: document.querySelector('#close-dialog'),
  inviteDialog: document.querySelector('#invite-dialog'),
  inviteForm: document.querySelector('#invite-form'),
  inviteModel: document.querySelector('#invite-model'),
  inviteDialogTitle: document.querySelector('#invite-dialog-title'),
  groupParticipantManager: document.querySelector('#group-participant-manager'),
  closeInviteDialog: document.querySelector('#close-invite-dialog'),
  cancelInvite: document.querySelector('#cancel-invite'),
  emojiButton: document.querySelector('#emoji-button'),
  emojiPicker: document.querySelector('#emoji-picker'),
  closeEmojiPicker: document.querySelector('#close-emoji-picker'),
  imageUploadButton: document.querySelector('#image-upload-button'),
  imageUploadInput: document.querySelector('#image-upload-input'),
  identityDialog: document.querySelector('#identity-dialog'),
  identityForm: document.querySelector('#identity-form'),
  userNameInput: document.querySelector('#user-name-input'),
  closeIdentityDialog: document.querySelector('#close-identity-dialog'),
  cancelIdentity: document.querySelector('#cancel-identity'),
  userProfileDialog: document.querySelector('#user-profile-dialog'),
  userProfileForm: document.querySelector('#user-profile-form'),
  aboutMeName: document.querySelector('#about-me-name'),
  aboutMePicturePreview: document.querySelector('#about-me-picture-preview'),
  aboutMePictureFallback: document.querySelector('#about-me-picture-fallback'),
  aboutMeChangePicture: document.querySelector('#about-me-change-picture'),
  aboutMeResetPicture: document.querySelector('#about-me-reset-picture'),
  userProfileAbout: document.querySelector('#user-profile-about'),
  userProfileGoals: document.querySelector('#user-profile-goals'),
  userProfileContext: document.querySelector('#user-profile-context'),
  userProfileStyle: document.querySelector('#user-profile-style'),
  userProfileAssistance: document.querySelector('#user-profile-assistance'),
  userProfileBoundaries: document.querySelector('#user-profile-boundaries'),
  closeUserProfileDialog: document.querySelector('#close-user-profile-dialog'),
  cancelUserProfile: document.querySelector('#cancel-user-profile'),
  resetUserProfile: document.querySelector('#reset-user-profile'),
  modelNameDialog: document.querySelector('#model-name-dialog'),
  modelNameForm: document.querySelector('#model-name-form'),
  modelNameIdentifier: document.querySelector('#model-name-identifier'),
  modelCustomName: document.querySelector('#model-custom-name'),
  closeModelNameDialog: document.querySelector('#close-model-name-dialog'),
  cancelModelName: document.querySelector('#cancel-model-name'),
  resetModelName: document.querySelector('#reset-model-name'),
  buddyPictureInput: document.querySelector('#buddy-picture-input'),
  userPictureInput: document.querySelector('#user-picture-input'),
  userPictureCard: document.querySelector('#user-picture-card'),
  buddyCustomPicture: document.querySelector('#buddy-custom-picture'),
  buddyCapabilityStrip: document.querySelector('#buddy-capability-strip'),
  userCustomPicture: document.querySelector('#user-custom-picture'),
  buddyDefaultPicture: document.querySelector('#buddy-default-picture'),
  userDefaultPicture: document.querySelector('#user-default-picture'),
  groupPictureGrid: document.querySelector('#group-picture-grid'),
  historyDialog: document.querySelector('#history-dialog'),
  historyDialogTitle: document.querySelector('#history-dialog-title'),
  historyList: document.querySelector('#history-list'),
  closeHistoryDialog: document.querySelector('#close-history-dialog'),
  cancelHistory: document.querySelector('#cancel-history'),
  historyViewerDialog: document.querySelector('#history-viewer-dialog'),
  historyViewerTitle: document.querySelector('#history-viewer-title'),
  historyViewerContent: document.querySelector('#history-viewer-content'),
  closeHistoryViewer: document.querySelector('#close-history-viewer'),
  cancelHistoryViewer: document.querySelector('#cancel-history-viewer'),
  configurationDialog: document.querySelector('#configuration-dialog'),
  configurationForm: document.querySelector('#configuration-form'),
  configurationModelLabel: document.querySelector('#configuration-model-label'),
  closeConfigurationDialog: document.querySelector('#close-configuration-dialog'),
  cancelConfiguration: document.querySelector('#cancel-configuration'),
  resetConfiguration: document.querySelector('#reset-configuration'),
  soulPrompt: document.querySelector('#soul-prompt'),
  personalityPrompt: document.querySelector('#personality-prompt'),
  assistantGender: document.querySelector('#assistant-gender'),
  tonePrompt: document.querySelector('#tone-prompt'),
  customInstructions: document.querySelector('#custom-instructions'),
  importSoul: document.querySelector('#import-soul'),
  importPersonality: document.querySelector('#import-personality'),
  addSkills: document.querySelector('#add-skills'),
  soulFileInput: document.querySelector('#soul-file-input'),
  personalityFileInput: document.querySelector('#personality-file-input'),
  skillFileInput: document.querySelector('#skill-file-input'),
  skillList: document.querySelector('#skill-list'),
  featuresDialog: document.querySelector('#features-dialog'),
  closeFeaturesDialog: document.querySelector('#close-features-dialog'),
  aboutUsDialog: document.querySelector('#about-us-dialog'),
  closeFeatures: document.querySelector('#close-features'),
  licenseDialog: document.querySelector('#license-dialog'),
  termsDialog: document.querySelector('#terms-dialog'),
  userDataDialog: document.querySelector('#user-data-dialog'),
  contactUsDialog: document.querySelector('#contact-us-dialog'),
  userGuideDialog: document.querySelector('#user-guide-dialog'),
  modelGuideDialog: document.querySelector('#model-guide-dialog'),
  modelGuideContent: document.querySelector('#model-guide-content'),
  closeModelGuideDialog: document.querySelector('#close-model-guide-dialog'),
  closeModelGuide: document.querySelector('#close-model-guide'),
  refreshModelGuide: document.querySelector('#refresh-model-guide'),
  setupDialog: document.querySelector('#setup-dialog'),
  setupForm: document.querySelector('#setup-form'),
  closeSetupDialog: document.querySelector('#close-setup-dialog'),
  cancelSetup: document.querySelector('#cancel-setup'),
  providerInput: document.querySelector('#provider-input'),
  baseUrlInput: document.querySelector('#base-url-input'),
  preferredModelInput: document.querySelector('#preferred-model-input'),
  apiKeyInput: document.querySelector('#api-key-input'),
  timeoutInput: document.querySelector('#timeout-input'),
  keepAliveInput: document.querySelector('#keep-alive-input'),
  visionEnabledInput: document.querySelector('#vision-enabled-input'),
  setupTestResult: document.querySelector('#setup-test-result'),
  detectOllama: document.querySelector('#detect-ollama'),
  testConnection: document.querySelector('#test-connection'),
  setupGuideDialog: document.querySelector('#setup-guide-dialog'),
  closeSetupGuideDialog: document.querySelector('#close-setup-guide-dialog'),
  dismissSetupGuide: document.querySelector('#dismiss-setup-guide'),
  openSetupFromGuide: document.querySelector('#open-setup-from-guide'),
  detachChat: document.querySelector('#detach-chat'),
  closeDockedChat: document.querySelector('#close-docked-chat'),
  vaultDialog: document.querySelector('#vault-dialog'),
  vaultDialogTitle: document.querySelector('#vault-dialog-title'),
  vaultForm: document.querySelector('#vault-form'),
  vaultIntro: document.querySelector('#vault-intro'),
  vaultPassphrase: document.querySelector('#vault-passphrase'),
  vaultPassphraseConfirm: document.querySelector('#vault-passphrase-confirm'),
  vaultConfirmGroup: document.querySelector('#vault-confirm-group'),
  vaultRemember: document.querySelector('#vault-remember'),
  vaultError: document.querySelector('#vault-error'),
  unlockVault: document.querySelector('#unlock-vault'),
  quitFromVault: document.querySelector('#quit-from-vault'),
};

let history = [];
let attachment = null;
let modelCapabilities = new Map();
let sessions = [];
let chatArchives = [];
let groups = [];
let profiles = [];
let installedModels = [];
let activeSessionId = null;
let assistantConfiguration = { soul: '', personality: '', customInstructions: '', skills: [], tone: 'helpful', gender: 'neutral' };
let assistantProfiles = { legacy: { soul: '', personality: '', customInstructions: '', skills: [], tone: 'helpful', gender: 'neutral' }, profiles: {} };
let userProfile = { about: '', goals: '', currentContext: '', workStyle: '', assistance: '', boundaries: '' };
let configurationDraftSkills = [];
let apiKeyStored = false;
let generationStopped = false;
let activeGenerationModel = '';
let activeStreamRequestId = '';
let activeStreamArticle = null;
let activeStreamRawContent = '';
let appOnline = true;
let mentionMatches = [];
let activeMentionIndex = 0;
let mentionRange = null;
let groupStackTopModel = '';
const chatQuery = new URLSearchParams(window.location.search);
const requestedProfileId = /^[a-zA-Z0-9-]{1,80}$/.test(chatQuery.get('profileId') || '') ? chatQuery.get('profileId') : '';
const requestedWindowModel = chatQuery.get('model')?.slice(0, 200) || '';
const requestedGroupProfiles = (() => {
  try {
    const value = JSON.parse(chatQuery.get('groupProfiles') || '[]');
    return Array.isArray(value) ? value.map((entry) => ({
      id: typeof entry?.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(entry.id) ? entry.id : '',
      model: typeof entry?.model === 'string' && entry.model.length <= 200 ? entry.model : '',
    })).filter((entry) => entry.model).slice(0, 8) : [];
  } catch {
    return [];
  }
})();
const requestedGroupModels = (() => {
  if (requestedGroupProfiles.length) return requestedGroupProfiles.map((profile) => profile.model);
  try {
    const value = JSON.parse(chatQuery.get('groupModels') || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((model) => typeof model === 'string' && model.length <= 200))].slice(0, 8) : [];
  } catch {
    return [];
  }
})();
const requestedGroupName = (chatQuery.get('groupName') || 'AI Group').trim().slice(0, 60) || 'AI Group';
const requestedGroupId = /^[a-zA-Z0-9-]{1,80}$/.test(chatQuery.get('groupId') || '') ? chatQuery.get('groupId') : '';
const isGroupChat = requestedGroupModels.length >= 2;
let isDockedChat = chatQuery.get('docked') === '1';

function applyChatViewMode(state = {}) {
  isDockedChat = Boolean(state.docked);
  document.documentElement.dataset.docked = String(isDockedChat);
  els.detachChat.classList.toggle('hidden', !isDockedChat);
  els.closeDockedChat.classList.toggle('hidden', !isDockedChat);
}

applyChatViewMode({ docked: isDockedChat });

let llmConnection = {
  provider: 'ollama',
  baseUrl: 'http://127.0.0.1:11434',
  preferredModel: 'qwen3.6:latest',
  timeoutSeconds: 120,
  keepAlive: '10m',
  visionEnabled: false,
};
let userPreferences = {
  userName: 'You',
  buddyName: 'Desktop Helper',
  modelAliases: {},
  modelPictures: {},
  hiddenModels: [],
  modelProfileIds: {},
  deletedProfileIds: [],
  deletedGroupIds: [],
  deletedGroupKeys: [],
  profileMigrationComplete: true,
  chatSplitPercent: 62,
  theme: 'light',
  fontSize: '100',
  userPicture: null,
  setupComplete: false,
  onboardingComplete: false,
};

const TONE_PROMPTS = {
  kind: 'Be consistently warm, patient, encouraging, and considerate. Acknowledge the user’s feelings and effort when relevant. Explain corrections gently, never shame the user, and prefer supportive language without becoming overly sentimental or verbose.',
  sarcastic: 'Use light, playful sarcasm and dry wit where appropriate. Keep jokes clearly friendly and never cruel, demeaning, discriminatory, or dismissive. Prioritize a correct and useful answer over the joke, and avoid sarcasm for sensitive, medical, legal, financial, or emotionally serious topics.',
  direct: 'Be concise and direct. Lead with the answer or outcome, remove unnecessary preamble, and use short actionable steps when needed. Ask only essential clarifying questions. Do not omit important safety warnings, constraints, or uncertainty merely to be brief.',
  helpful: 'Be practical, attentive, and solution-oriented. Explain unfamiliar ideas clearly, anticipate likely next questions, and provide actionable steps at an appropriate level of detail. Balance friendliness with accuracy and avoid unnecessary filler.',
};

const LEGACY_PREFERENCE_KEYS = [
  'ai-messenger-user-name',
  'ai-messenger-buddy-name',
  'ai-messenger-theme',
  'ai-messenger-font-size',
  'ai-messenger-buddy-picture',
  'ai-messenger-user-picture',
  'ai-messenger-setup-complete',
];

function readLegacyPreferences() {
  if (!LEGACY_PREFERENCE_KEYS.some((key) => localStorage.getItem(key) !== null)) return null;
  return {
    userName: localStorage.getItem('ai-messenger-user-name') || 'You',
    buddyName: localStorage.getItem('ai-messenger-buddy-name') || 'Desktop Helper',
    theme: localStorage.getItem('ai-messenger-theme') || 'light',
    fontSize: localStorage.getItem('ai-messenger-font-size') || '100',
    buddyPicture: localStorage.getItem('ai-messenger-buddy-picture'),
    userPicture: localStorage.getItem('ai-messenger-user-picture'),
    setupComplete: localStorage.getItem('ai-messenger-setup-complete') === 'true',
  };
}

function clearLegacyPreferences() {
  LEGACY_PREFERENCE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function safeName(value, fallback) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 40) : fallback;
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
      id: safeProfileId(profile.id),
      model: typeof profile.model === 'string' && profile.model.trim() && profile.model.length <= 200 ? profile.model.trim() : '',
      name: safeName(profile.name, 'AI'),
      picture: safePicture(profile.picture),
      useGenericAvatar: Boolean(profile.useGenericAvatar),
      online: profile.online !== false,
      createdAt: typeof profile.createdAt === 'string' ? profile.createdAt : new Date().toISOString(),
      updatedAt: typeof profile.updatedAt === 'string' ? profile.updatedAt : new Date().toISOString(),
    }))
    .filter((profile) => profile.id && profile.model)
    .slice(0, 200);
}

function profileById(profileId) {
  return profiles.find((profile) => profile.id === profileId) || null;
}

function profileForModel(modelName, profileId = '') {
  if (profileId) return profileById(profileId) || null;
  if (isGroupChat) {
    const participant = requestedGroupProfiles.find((entry) => entry.model === modelName);
    if (participant?.id) return profileById(participant.id) || { id: participant.id, model: participant.model, name: userPreferences.modelAliases?.[participant.model] || buddyName, picture: userPreferences.modelPictures?.[participant.model] || null };
  }
  return profileById(requestedProfileId) || profiles.find((profile) => profile.model === modelName) || null;
}

function currentProfile() {
  return isGroupChat ? null : profileForModel(selectedModelName());
}

function currentProfileId() {
  return isGroupChat ? '' : (currentProfile()?.id || requestedProfileId || '');
}

function sessionMatchesCurrentProfile(session) {
  const profileId = currentProfileId();
  return profileId ? session.profileId === profileId : !session.profileId;
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

function safeAssistantConfiguration(value = {}) {
  return {
    soul: typeof value.soul === 'string' ? value.soul : '',
    personality: typeof value.personality === 'string' ? value.personality : '',
    tonePrompt: typeof value.tonePrompt === 'string' ? value.tonePrompt : '',
    customInstructions: typeof value.customInstructions === 'string' ? value.customInstructions : '',
    skills: Array.isArray(value.skills) ? value.skills.filter((skill) => skill && typeof skill.name === 'string' && typeof skill.content === 'string').slice(0, 20) : [],
    tone: value.tone in TONE_PROMPTS ? value.tone : 'helpful',
    gender: ['neutral', 'feminine', 'masculine'].includes(value.gender) ? value.gender : 'neutral',
    presetKey: typeof value.presetKey === 'string' ? value.presetKey.slice(0, 80) : '',
    customRole: typeof value.customRole === 'string' ? value.customRole.trim().slice(0, 60) : '',
  };
}

function hasAssistantCustomization(value) {
  const profile = safeAssistantConfiguration(value);
  return Boolean(profile.soul.trim() || profile.personality.trim() || profile.tonePrompt.trim() || profile.customInstructions.trim() || profile.skills.length || profile.tone !== 'helpful' || profile.gender !== 'neutral');
}

function normalizedAssistantProfiles(value = {}, migrationModel = '') {
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

function activateAssistantProfile(modelName = selectedModelName()) {
  const key = isGroupChat ? (profileForModel(modelName)?.id || String(modelName || '').slice(0, 200)) : (currentProfileId() || String(modelName || llmConnection.preferredModel || '').slice(0, 200));
  assistantConfiguration = safeAssistantConfiguration(assistantProfiles.profiles[key]);
  applyAssistantTone(assistantConfiguration.tone, false);
  return assistantConfiguration;
}

function saveActiveAssistantProfile() {
  const key = currentProfileId() || selectedModelName();
  if (!key) return false;
  assistantProfiles.profiles = { ...(assistantProfiles.profiles || {}), [key]: safeAssistantConfiguration(assistantConfiguration) };
  return true;
}

async function requestVaultUnlock() {
  const status = await window.retro.stateStatus();
  if (status.unlocked) return window.retro.loadState();
  const creating = !status.hasVault;
  els.vaultDialogTitle.textContent = creating ? 'Create private vault' : 'Unlock private vault';
  els.vaultIntro.textContent = creating
    ? `${status.hasLegacyState ? 'Protect and migrate your existing AI Messenger data.' : 'Protect your AI Messenger data.'} Choose a passphrase you can remember; it cannot be recovered by the app.`
    : 'Enter your standalone vault passphrase to open AI Messenger.';
  els.vaultConfirmGroup.classList.toggle('hidden', !creating);
  els.vaultPassphraseConfirm.required = creating;
  els.unlockVault.textContent = creating ? 'Create Vault' : 'Unlock';
  els.vaultRemember.checked = false;
  els.vaultError.className = 'setup-test-result hidden';
  els.vaultDialog.addEventListener('cancel', (event) => event.preventDefault(), { once: true });
  els.vaultDialog.showModal();
  els.vaultPassphrase.focus();

  return new Promise((resolve) => {
    els.vaultForm.onsubmit = async (event) => {
      event.preventDefault();
      const passphrase = els.vaultPassphrase.value;
      if (creating && passphrase !== els.vaultPassphraseConfirm.value) {
        els.vaultError.className = 'setup-test-result error';
        els.vaultError.textContent = 'The two passphrases do not match.';
        return;
      }
      els.unlockVault.disabled = true;
      els.vaultError.className = 'setup-test-result';
      els.vaultError.textContent = creating ? 'Creating encrypted vault…' : 'Unlocking encrypted vault…';
      try {
        const state = await window.retro.unlockState(passphrase, els.vaultRemember.checked);
        els.vaultPassphrase.value = '';
        els.vaultPassphraseConfirm.value = '';
        els.vaultDialog.close();
        resolve(state);
      } catch (error) {
        els.vaultError.className = 'setup-test-result error';
        els.vaultError.textContent = error.message;
      } finally {
        els.unlockVault.disabled = false;
      }
    };
  });
}

applyAssistantTone('helpful', false);
let userName = userPreferences.userName;
let buddyName = userPreferences.buddyName;

applyTheme(userPreferences.theme, false);
applyFontSize(userPreferences.fontSize, false);
applyChatSplit(userPreferences.chatSplitPercent, false);
applyNames();
applyProfilePicture('buddy', null);
applyProfilePicture('user', null);

function setStatus(kind, text) {
  els.statusDot.className = kind;
  const isTyping = /typing|thinking/i.test(String(text || ''));
  els.statusDot.classList.toggle('typing', isTyping);
  els.statusText.classList.toggle('typing', isTyping);
  els.statusText.textContent = text;
}

function reportBackgroundError(prefix, error) {
  const message = error?.message || String(error || 'Unknown error');
  console.error(`[AI Messenger] ${prefix}:`, error);
  setStatus('offline', `${prefix}: ${message}`);
}

function applyConnectionStatus(online) {
  appOnline = Boolean(online);
  document.documentElement.dataset.connectionOnline = String(appOnline);
  if (!appOnline) {
    els.send.disabled = true;
    setStatus('offline', 'Offline · reconnect from the main Messenger window');
  } else if (!activeGenerationModel) {
    els.send.disabled = false;
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

function formatBytes(value) {
  const bytes = Number(value) || 0;
  if (!bytes) return 'Unknown size';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** unit)).toFixed(unit >= 3 ? 1 : 0)} ${units[unit]}`;
}

function modelCapabilityBadges(model) {
  if (!model) return [{ icon: '?', label: 'Model unavailable', className: 'unknown' }];
  const name = String(model.name || '').toLowerCase();
  const family = String(model.details?.family || '').toLowerCase();
  const capabilities = new Set(model.capabilities || []);
  const badges = [];
  if (capabilities.has('vision') || name.includes('vision') || name.includes('vl')) badges.push({ icon: 'OCR', label: 'Vision and OCR', className: 'vision' });
  if (name.includes('ocr') || family.includes('ocr')) badges.push({ icon: 'OCR', label: 'OCR specialist', className: 'vision' });
  if (name.includes('code') || name.includes('coder') || family.includes('code')) badges.push({ icon: '</>', label: 'Coding', className: 'code' });
  if (name.includes('qwen') || name.includes('deepseek') || name.includes('r1') || name.includes('gpt-oss')) badges.push({ icon: 'THK', label: 'Reasoning', className: 'reasoning' });
  if (capabilities.has('embedding') || name.includes('embed')) badges.push({ icon: 'IDX', label: 'Embeddings/search', className: 'search' });
  badges.push({ icon: 'Q&A', label: 'General questions and chat', className: 'chat' });
  return badges.filter((badge, index, list) => list.findIndex((entry) => entry.icon === badge.icon && entry.label === badge.label) === index).slice(0, 4);
}

function renderCapabilityBadges(model) {
  return modelCapabilityBadges(model).map((badge) => `<i class="cap-${badge.className}" title="${escapeHtml(badge.label)}" aria-label="${escapeHtml(badge.label)}">${escapeHtml(badge.icon)}</i>`).join('');
}

function installedModelByName(modelName) {
  return installedModels.find((model) => model.name === modelName) || null;
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

function formatMessageTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { label: '', title: '' };
  const now = new Date();
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const label = messageDay === today ? time : `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${time}`;
  return { label, title: date.toLocaleString() };
}

function addMessage(role, content, image = null, modelName = '', addressedModels = [], profileId = '', isThinking = false, timestamp = new Date().toISOString()) {
  const article = document.createElement('article');
  article.className = `message ${role}`;
  if (modelName) article.dataset.model = modelName;
  if (profileId) article.dataset.profileId = profileId;
  if (role === 'assistant' && isGroupChat) {
    article.style.setProperty('--assistant-name-color', assistantNameColor(modelName, profileId));
    const stillInGroup = requestedGroupProfiles.some((participant) => (profileId && participant.id ? participant.id === profileId : participant.model === modelName));
    if (!stillInGroup) {
      article.classList.add('former-group-participant');
      article.style.setProperty('--assistant-name-color', '#7a7a7a');
    }
  }
  const author = role === 'user' ? userName : assistantDisplayName(modelName || selectedModelName(), profileId);
  const addressLabel = role === 'user' && addressedModels.length
    ? `<div class="message-address">To: ${addressedModels.map((target) => `@${groupMentionEntries().find((entry) => entry.modelName === target)?.handle || formatModelName(target)}`).map(escapeHtml).join(', ')}</div>`
    : '';
  if (isThinking) article.classList.add('thinking');
  const authorLabel = isThinking ? `${author} is thinking…` : `${author} says:`;
  const time = timestamp ? formatMessageTimestamp(timestamp) : { label: '', title: '' };
  const timestampMarkup = time.label ? `<time class="message-timestamp" title="${escapeHtml(time.title)}">${escapeHtml(time.label)}</time>` : '';
  article.innerHTML = `<div class="message-author">${escapeHtml(authorLabel)}</div>${timestampMarkup}${addressLabel}<div class="bubble">${image ? `<img src="${image}" alt="Attached desktop snapshot" />` : ''}${escapeHtml(content)}</div>`;
  els.messages.append(article);
  els.messages.scrollTop = els.messages.scrollHeight;
  return article;
}

function assistantNameColor(modelName, profileId = '') {
  // Use the saved profile id when available so a participant keeps the same
  // readable label colour across group sessions and restored history.
  const key = profileId || modelName || 'assistant';
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) hash = ((hash * 31) + key.charCodeAt(index)) >>> 0;
  const colors = ['#d10061', '#1565a9', '#7a3aa0', '#a05000', '#087a5f', '#a41632', '#486300', '#6f4b16'];
  return colors[hash % colors.length];
}

function updateStreamingMessage(article, content) {
  if (!article) return;
  const bubble = article.querySelector('.bubble');
  if (article.classList.contains('thinking') && String(content || '').trim()) {
    const author = assistantDisplayName(article.dataset.model || selectedModelName(), article.dataset.profileId || '');
    const authorElement = article.querySelector('.message-author');
    if (authorElement) authorElement.textContent = `${author} says:`;
    article.classList.remove('thinking');
  }
  if (bubble) bubble.textContent = content || (article.classList.contains('thinking') ? '' : '▋');
  els.messages.scrollTop = els.messages.scrollHeight;
}

function modelSuitabilityNotice(modelName) {
  const model = installedModelByName(modelName);
  const name = String(modelName || '').toLowerCase();
  const family = String(model?.details?.family || '').toLowerCase();
  const capabilities = new Set(model?.capabilities || []);
  if (name.includes('ocr') || family.includes('ocr')) return 'I’m an OCR and vision specialist. I focus on extracting text from images and documents; general questions, planning, maths, or open-ended conversation may be less reliable.';
  if (name.includes('embed') || capabilities.has('embedding')) return 'I’m an embeddings specialist focused on search, document matching, and retrieval. I’m not designed for normal chat or long-form answers.';
  if (name.includes('code') || name.includes('coder') || family.includes('code')) return 'I’m a coding-focused assistant. I work best on programming and technical tasks and may be less reliable for broad conversation or visual-document work.';
  return '';
}

function assistantIntroduction(modelName, profileId = '', includeSafety = false) {
  const introduction = isChiefOfStaff(modelName, profileId)
    ? `Hi ${userName}! I’m your Chief of Staff. I coordinate this AI team and turn your goals into clear next steps.`
    : `Hi ${userName}! I’m ready to help.`;
  const suitability = modelSuitabilityNotice(modelName);
  const safety = includeSafety ? ' AI can make mistakes. Confirm important information before relying on it.' : '';
  return `${introduction}${suitability ? ` ${suitability}` : ''}${safety}`;
}

function renderEmptyChat(message = null) {
  els.messages.innerHTML = '';
  if (isGroupChat) {
    const introductions = requestedGroupModels.map((modelName, index) => ({
      modelName,
      profileId: requestedGroupProfiles[index]?.id || '',
    })).sort((left, right) => {
      const chiefRank = (entry) => isChiefOfStaff(entry.modelName, entry.profileId) ? 0 : 1;
      const ocrRank = (entry) => isOcrModel(entry.modelName) ? 0 : 1;
      return chiefRank(left) - chiefRank(right) || ocrRank(left) - ocrRank(right);
    });
    introductions.forEach(({ modelName, profileId }) => {
      addMessage('assistant', assistantIntroduction(modelName, profileId), null, modelName, [], profileId);
    });
    // Keep the safety notice in its own short message. With three or more
    // participants, the third assistant delivers it; with two, the Chief (or
    // first assistant) follows up after the specialist introduction.
    const warningEntry = introductions.length >= 3
      ? introductions[2]
      : (introductions.find((entry) => isChiefOfStaff(entry.modelName, entry.profileId)) || introductions[0]);
    if (warningEntry) addMessage('assistant', 'AI can make mistakes. Confirm important information before relying on it.', null, warningEntry.modelName, [], warningEntry.profileId);
  } else {
    addMessage('assistant', `${assistantIntroduction(els.modelSelect.value, currentProfileId(), true)} I’m online and ready to chat${(modelCapabilities.get(els.modelSelect.value) || []).includes('vision') ? ', including help with images and desktop snapshots' : ''}.`);
  }
  if (message) addMessage('assistant', message);
}

function cleanHistoricalAssistantContent(content, modelName, profileId = '') {
  let cleaned = String(content || '');
  const label = assistantDisplayName(modelName || selectedModelName(), profileId);
  const referenceName = assistantReferenceName(modelName || selectedModelName(), profileId);
  for (const prefix of [`${label}: `, `${referenceName}: `]) {
    if (cleaned.startsWith(prefix)) cleaned = cleaned.slice(prefix.length);
  }
  for (const possessive of [`I’m ${label}, your Chief of Staff`, `I'm ${label}, your Chief of Staff`]) {
    if (cleaned.startsWith(possessive)) cleaned = cleaned.replace(possessive, 'I’m your Chief of Staff');
  }
  for (const greeting of [`Hi ${userName}! I’m ${label}.`, `Hi ${userName}! I'm ${label}.`]) {
    if (cleaned.startsWith(greeting)) cleaned = cleaned.replace(greeting, `Hi ${userName}! I’m ready to help.`);
  }
  return cleanAssistantFormatting(cleaned);
}

function cleanAssistantFormatting(value) {
  return String(value || '')
    .replace(/\r\n?/g, '\n')
    .replace(/^```[^\n]*\n?/gm, '')
    .replace(/```/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^(?:---|___|\*\*\*)\s*$/gm, '')
    .replace(/\*\*|__|~~/g, '')
    .replace(/(^|[^\w])\*([^*\n]+)\*(?=[^\w]|$)/g, '$1$2')
    .replace(/(^|[^\w_])_([^_\n]+)_(?=[^\w_]|$)/g, '$1$2')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function renderConversation() {
  els.messages.innerHTML = '';
  if (!history.length) {
    renderEmptyChat();
    if (isGroupChat) renderGroupPictures();
    return;
  }
  for (const message of history) {
    const content = message.displayContent || message.content || '(Empty message)';
    addMessage(message.role, message.role === 'assistant' ? cleanHistoricalAssistantContent(content, message.model || '', message.profileId || '') : content, null, message.model || '', message.addressedModels || [], message.profileId || '', false, message.timestamp || null);
  }
  if (isGroupChat) renderGroupPictures();
}

function cachedHistory() {
  return history.slice(-100).map((message) => ({ role: message.role, content: message.content || '', displayContent: message.displayContent || '', model: message.model || '', profileId: message.profileId || '', addressedModels: Array.isArray(message.addressedModels) ? message.addressedModels.slice(0, 8) : [], timestamp: typeof message.timestamp === 'string' ? message.timestamp : '', hadImage: Boolean(message.images?.length) }));
}

function compactInstruction(value, limit) {
  const compact = String(value || '').trim().replace(/\s+/g, ' ');
  if (!compact || limit <= 0) return '';
  return compact.length <= limit ? compact : `${compact.slice(0, Math.max(0, limit - 28)).trimEnd()} [trimmed for context budget]`;
}

function buildBoundedBrief(items, maxChars) {
  const brief = [];
  const seen = [];
  let used = 0;
  for (const [label, value, perItemLimit] of items) {
    const text = compactInstruction(value, Math.min(perItemLimit, Math.max(0, maxChars - used)));
    const normalized = text.toLocaleLowerCase();
    if (!text || seen.some((previous) => previous === normalized || previous.includes(normalized) || normalized.includes(previous))) continue;
    const entry = `${label}: ${text}`;
    if (used + entry.length > maxChars) break;
    brief.push(entry);
    seen.push(normalized);
    used += entry.length + 2;
  }
  return brief;
}

function estimatedTokensForMessage(message) {
  const text = `${message?.content || ''}\n${message?.displayContent || ''}`;
  // Four characters per token is deliberately conservative for regular chat.
  // Vision inputs add substantially more context even when their bytes are not
  // retained in saved history.
  return Math.ceil(text.length / 4) + (message?.images?.length ? 1500 * message.images.length : 0);
}

function contextCapacityForModel(modelName) {
  const details = installedModelByName(modelName)?.details || {};
  const candidates = [details.context_length, details.contextLength, details.num_ctx, details.numCtx]
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value >= 1024 && value <= 1_000_000);
  return candidates[0] || 8192;
}

function currentContextEstimate(pendingContent = '', pendingAttachment = null) {
  const targetModels = isGroupChat ? requestedGroupModels : [selectedModelName()];
  const capacity = Math.min(...targetModels.map(contextCapacityForModel));
  const historyTokens = history.reduce((total, message) => total + estimatedTokensForMessage(message), 0);
  const pendingTokens = Math.ceil(String(pendingContent || '').length / 4) + (pendingAttachment?.dataUrl ? 1500 : 0) + (pendingAttachment?.text ? Math.ceil(pendingAttachment.text.length / 4) : 0);
  // Reserve room for the system brief and a useful response.
  return { capacity, estimated: historyTokens + pendingTokens + 2200 };
}

function restoreAttachment(savedAttachment) {
  if (!savedAttachment) return;
  attachment = savedAttachment;
  if (savedAttachment.dataUrl) {
    els.attachmentImage.classList.remove('hidden');
    els.attachmentImage.src = savedAttachment.dataUrl;
  } else {
    els.attachmentImage.classList.add('hidden');
  }
  els.attachmentName.textContent = savedAttachment.name || 'Attached file';
  els.attachment.classList.remove('hidden');
}

let contextWarningDismissedSessionId = '';
async function archiveForFreshContextIfNeeded(pendingContent) {
  const { capacity, estimated } = currentContextEstimate(pendingContent, attachment);
  const utilization = estimated / capacity;
  if (utilization >= 1) {
    showStartNewChatAction();
    return { capacity, estimated, full: true };
  }
  if (utilization < 0.72 || contextWarningDismissedSessionId === activeSessionId) return { capacity, estimated, full: false };
  const startFresh = window.confirm(`This chat is nearing its context capacity (${Math.round(utilization * 100)}% estimated). Would you like to start a new chat now? The current conversation will remain available in Chat History.`);
  if (!startFresh) {
    contextWarningDismissedSessionId = activeSessionId;
    return { capacity, estimated, full: false };
  }
  const savedAttachment = attachment ? { ...attachment } : null;
  await newChat();
  restoreAttachment(savedAttachment);
  contextWarningDismissedSessionId = '';
  return { capacity, estimated, full: false };
}

function showStartNewChatAction() {
  els.startNewChatButton.classList.remove('hidden');
}

function hideStartNewChatAction() {
  els.startNewChatButton.classList.add('hidden');
}

function isContextLimitError(error) {
  return /context\s*(?:window|length).*(?:full|exceed|limit)|(?:maximum|token)\s+context|prompt\s+(?:is\s+)?too\s+long|num_ctx/i.test(String(error?.message || error || ''));
}

function sessionTitle() {
  const firstUser = history.find((message) => message.role === 'user' && message.content)?.content;
  return firstUser ? firstUser.slice(0, 52) : 'New chat';
}

async function persistState(changedSections = ['sessions', 'chatArchives', 'configuration', 'connection', 'preferences', 'userProfile']) {
  const saved = await window.retro.saveState({
    version: 3,
    profiles: profiles.slice(0, 200),
    sessions: sessions.slice(0, 200),
    chatArchives: chatArchives.slice(0, 200),
    groups: groups.slice(0, 100),
    configuration: assistantProfiles,
    connection: llmConnection,
    preferences: userPreferences,
    userProfile,
  }, changedSections);
  if (Array.isArray(saved?.sessions)) sessions = saved.sessions.slice(0, 200);
  if (Array.isArray(saved?.chatArchives)) chatArchives = saved.chatArchives.slice(0, 200);
}

async function persistCurrentSession() {
  if (!activeSessionId) activeSessionId = crypto.randomUUID();
  const session = {
    id: activeSessionId,
    title: sessionTitle(),
    updatedAt: new Date().toISOString(),
    model: els.modelSelect.value || '',
    profileId: isGroupChat ? '' : currentProfileId(),
    groupId: isGroupChat ? requestedGroupId : '',
    groupModels: isGroupChat ? requestedGroupModels : [],
    groupProfileIds: isGroupChat ? requestedGroupProfiles.map((profile) => profile.id).filter(Boolean) : [],
    groupName: isGroupChat ? requestedGroupName : '',
    messages: cachedHistory(),
  };
  const existingIndex = sessions.findIndex((item) => item.id === activeSessionId);
  if (existingIndex >= 0) sessions.splice(existingIndex, 1);
  sessions.unshift(session);
  await persistState(['sessions']);
}

async function archiveCurrentThread() {
  if (!history.length) return;
  const archive = {
    id: crypto.randomUUID(),
    sourceSessionId: activeSessionId || '',
    title: sessionTitle(),
    archivedAt: new Date().toISOString(),
    model: els.modelSelect.value || '',
    profileId: isGroupChat ? '' : currentProfileId(),
    groupId: isGroupChat ? requestedGroupId : '',
    groupModels: isGroupChat ? requestedGroupModels : [],
    groupProfileIds: isGroupChat ? requestedGroupProfiles.map((profile) => profile.id).filter(Boolean) : [],
    groupName: isGroupChat ? requestedGroupName : '',
    messages: cachedHistory(),
  };
  chatArchives.unshift(archive);
  chatArchives = chatArchives.slice(0, 200);
  await persistState(['chatArchives']);
}

async function newChat() {
  if (activeSessionId || history.length) await persistCurrentSession();
  await archiveCurrentThread();
  activeSessionId = crypto.randomUUID();
  contextWarningDismissedSessionId = '';
  hideStartNewChatAction();
  history = [];
  clearAttachment();
  renderEmptyChat();
  await persistCurrentSession();
  setStatus('online', isGroupChat ? 'Group context cleared · previous conversation kept in Chat History' : 'Chat cleared · previous conversation kept in Chat History');
  els.prompt.focus();
}

function renderHistoryList(allChats = false) {
  els.historyList.innerHTML = '';
  const groupKey = requestedGroupModels.slice().sort().join('\n');
  const groupProfileKey = requestedGroupProfiles.map((profile) => profile.id).filter(Boolean).sort().join('\n');
  const matchesCurrentChat = (session) => {
    if (!session.messages?.length) return false;
    if (allChats) return true;
    if (isGroupChat) return requestedGroupId
      ? session.groupId === requestedGroupId || (!session.groupId && (!session.groupName || session.groupName === requestedGroupName) && ((Array.isArray(session.groupProfileIds) && session.groupProfileIds.slice().sort().join('\n') === groupProfileKey) || (Array.isArray(session.groupModels) && session.groupModels.slice().sort().join('\n') === groupKey)))
      : (Array.isArray(session.groupProfileIds) && session.groupProfileIds.slice().sort().join('\n') === groupProfileKey) || (Array.isArray(session.groupModels) && session.groupModels.slice().sort().join('\n') === groupKey);
    return !session.groupModels?.length && (!els.modelSelect.value || session.model === els.modelSelect.value) && sessionMatchesCurrentProfile(session);
  };
  const archiveIds = new Set();
  const available = [
    ...chatArchives.filter(matchesCurrentChat).map((archive) => {
      archiveIds.add(archive.sourceSessionId || archive.id);
      return { ...archive, isArchived: true };
    }),
    ...sessions.filter((session) => !archiveIds.has(session.id)).filter(matchesCurrentChat),
  ];
  if (!available.length) {
    els.historyList.innerHTML = '<span class="history-empty">No cached chats yet.</span>';
    return;
  }
  for (const session of available) {
    const entry = document.createElement('div');
    entry.className = 'history-entry';
    const date = (session.archivedAt || session.updatedAt) ? new Date(session.archivedAt || session.updatedAt).toLocaleString() : 'Unknown date';
    const audience = session.groupModels?.length
      ? (session.groupName || 'AI Group')
      : assistantDisplayName(session.model || '', session.profileId || '');
    entry.innerHTML = `<div><strong>${escapeHtml(session.title || 'Untitled chat')}</strong><span>${escapeHtml(audience)} · ${escapeHtml(date)} · ${session.messages.length} messages${session.isArchived ? ' · Archived' : ''}${session.model ? ` · ${escapeHtml(session.model)}` : ''}</span></div><button type="button">View</button>`;
    entry.querySelector('button').addEventListener('click', () => {
      openHistoryViewer(session);
      els.historyDialog.close();
    });
    els.historyList.append(entry);
  }
}

function openHistoryViewer(session) {
  const heading = session.title || 'Untitled chat';
  const transcript = (session.messages || []).map((message) => {
    const timestamp = message.timestamp ? formatMessageTimestamp(message.timestamp) : '';
    const author = message.role === 'user'
      ? userName
      : assistantReferenceName(message.model || session.model || '', message.profileId || session.profileId || '');
    const rawContent = message.displayContent || message.content || '(Empty message)';
    const content = message.role === 'assistant'
      ? cleanHistoricalAssistantContent(rawContent, message.model || session.model || '', message.profileId || session.profileId || '')
      : rawContent;
    return `${timestamp ? `[${timestamp}] ` : ''}${author}: ${content}`;
  }).join('\n\n');
  els.historyViewerTitle.textContent = heading;
  els.historyViewerContent.textContent = transcript || 'No messages were saved in this chat.';
  els.historyViewerDialog.showModal();
}

function openHistoryDialog() {
  if (els.historyDialogTitle) els.historyDialogTitle.textContent = 'Chat History';
  renderHistoryList(false);
  els.historyDialog.showModal();
}

async function openAllChatLogs() {
  await persistCurrentSession().catch((error) => reportBackgroundError('Could not save chat history', error));
  if (els.historyDialogTitle) els.historyDialogTitle.textContent = 'All Chat Logs';
  renderHistoryList(true);
  els.historyDialog.showModal();
}

function restoreLatestConversation() {
  const groupKey = requestedGroupModels.slice().sort().join('\n');
  const groupProfileKey = requestedGroupProfiles.map((profile) => profile.id).filter(Boolean).sort().join('\n');
  const latest = sessions
    .filter((session) => {
      if (isGroupChat) return requestedGroupId
        ? session.groupId === requestedGroupId || (!session.groupId && ((Array.isArray(session.groupProfileIds) && session.groupProfileIds.slice().sort().join('\n') === groupProfileKey) || (Array.isArray(session.groupModels) && session.groupModels.slice().sort().join('\n') === groupKey)))
        : (Array.isArray(session.groupProfileIds) && session.groupProfileIds.slice().sort().join('\n') === groupProfileKey) || (Array.isArray(session.groupModels) && session.groupModels.slice().sort().join('\n') === groupKey);
      return !session.groupModels?.length && session.model === selectedModelName() && sessionMatchesCurrentProfile(session);
    })
    .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')))[0];
  if (!latest) {
    renderEmptyChat();
    return;
  }
  activeSessionId = latest.id;
  history = (Array.isArray(latest.messages) ? latest.messages : []).map(({ role, content, displayContent, model, profileId, addressedModels }) => ({
    role,
    content,
    displayContent: displayContent || '',
    model: model || '',
    profileId: profileId || '',
    addressedModels: Array.isArray(addressedModels) ? addressedModels : [],
  }));
  renderConversation();
  setStatus('online', history.length ? 'Previous conversation restored' : 'New chat restored');
}

function workspaceThreadAudience(thread) {
  if (Array.isArray(thread.groupModels) && thread.groupModels.length) return thread.groupName || 'AI Group';
  const profile = profileForModel(thread.model || '', thread.profileId || '');
  return profile?.name || thread.model || 'AI chat';
}

function workspaceMessageExcerpt(message) {
  const speaker = message.role === 'assistant'
    ? (assistantReferenceName(message.model || '', message.profileId || '') || 'Assistant')
    : userName;
  const text = String(message.displayContent || message.content || '').replace(/\s+/g, ' ').trim();
  return `${speaker}: ${text.length > 420 ? `${text.slice(0, 417)}…` : text}`;
}

function chiefWorkspaceSearchContext() {
  const request = String([...history].reverse().find((message) => message.role === 'user')?.content || '');
  const requestedSearch = /\b(search|find|look up|check|review|history|thread|chat|conversation|friend|contact|agent|model|previous|prior|remember|decid(?:e|ed|ing))\b/i.test(request);
  if (!requestedSearch) return '';
  const keywords = new Set((request.toLocaleLowerCase().match(/[\p{L}\p{N}_-]{4,}/gu) || []).slice(0, 12));
  const friendMatches = profiles.filter((profile) => {
    const text = `${profile.name} ${profile.model}`.toLocaleLowerCase();
    return /\b(friend|contact|agent|model)\b/i.test(request) || [...keywords].some((word) => text.includes(word));
  }).slice(0, 30).map((profile) => `- ${profile.name} — ${profile.model} (${profile.online === false ? 'offline' : 'online'})`);
  const threadEntries = [
    ...sessions.map((thread) => ({ ...thread, archived: false })),
    ...chatArchives.map((thread) => ({ ...thread, archived: true })),
  ].filter((thread) => thread.id !== activeSessionId && thread.sourceSessionId !== activeSessionId);
  const indexed = threadEntries.map((thread) => {
    const messageText = (thread.messages || []).map((message) => String(message.content || '')).join(' ').toLocaleLowerCase();
    const matches = [...keywords].filter((word) => messageText.includes(word)).length;
    const updated = Date.parse(thread.archivedAt || thread.updatedAt || '') || 0;
    return { thread, matches, updated };
  }).sort((left, right) => right.matches - left.matches || right.updated - left.updated);
  const excerpts = [];
  let used = 0;
  for (const { thread, matches } of indexed.filter((entry) => entry.matches || /\b(history|thread|chat|conversation|previous|prior|remember)\b/i.test(request)).slice(0, 10)) {
    const transcript = (thread.messages || []).slice(-6).map(workspaceMessageExcerpt).filter(Boolean).join('\n');
    if (!transcript) continue;
    const entry = `[${workspaceThreadAudience(thread)} — ${thread.title || 'Untitled chat'}]\n${transcript}`;
    if (used + entry.length > 7000) break;
    excerpts.push(entry);
    used += entry.length + 2;
  }
  if (!friendMatches.length && !excerpts.length) return 'CHIEF OF STAFF READ-ONLY WORKSPACE SEARCH: No matching saved agents or chat records were found for this request.';
  return [
    'CHIEF OF STAFF READ-ONLY WORKSPACE SEARCH RESULTS: AI Messenger searched the local friend list and saved chat records for the current request. You may use only these results to answer. You cannot modify profiles, chats, groups, history, settings, files, or model connections. Do not claim you performed any change.',
    friendMatches.length ? `MATCHING AI AGENTS:\n${friendMatches.join('\n')}` : '',
    excerpts.length ? `MATCHING CHAT RECORDS:\n${excerpts.join('\n\n')}` : '',
  ].filter(Boolean).join('\n\n');
}

function buildSystemPrompt(modelName = selectedModelName(), profileId = '', routingInstruction = '') {
  const profile = profileForModel(modelName, profileId);
  const modelDisplayName = profile?.name || userPreferences.modelAliases?.[modelName] || buddyName;
  const configuration = safeAssistantConfiguration(assistantProfiles.profiles[profile?.id || modelName]);
  const now = new Date();
  const localDate = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(now);
  const localTime = new Intl.DateTimeFormat(undefined, { timeStyle: 'long' }).format(now);
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'the device local time zone';
  const sections = [`You are ${modelDisplayName}, a local AI chat buddy. The user's display name is ${userName}. The chat interface already labels every assistant message with its display name and model. Never repeat your own name, model name, model size, or a speaker label in your message body. When referring to another assistant, use only their display name or @mention handle, never their model name, model size, or identifier.`, `SYSTEM LOCAL DATE AND TIME (from the user's device): ${localDate}; ${localTime}; time zone ${localTimeZone}. Use this only to answer date/time questions and interpret relative dates such as today, tomorrow, and this week. The device clock may be wrong, so do not treat it as authoritative for high-stakes deadlines.`];
  const modelIsOcr = isOcrModel(modelName);
  const modelIsChiefOfStaff = isChiefOfStaff(modelName, profileId);
  if (modelIsOcr) {
    sections.push('OCR SPECIALIST ROLE: Extract text only from the image, scan, screenshot, or document explicitly attached to the current user message. Preserve the wording, order, punctuation, and line breaks as closely as possible. Do not interpret, explain, summarize, critique, translate, answer questions about, or speculate about extracted text. Do not analyze another assistant\'s message. If no visual or document input is attached, say that there is no source to extract and stop.');
  }
  if (modelIsChiefOfStaff) {
    sections.push('CHIEF OF STAFF COORDINATION ROLE: The user is the project manager and will give you the desired outcome. Turn that outcome into a concise delegation plan for the assistants in this group. Identify which specialist should handle each part, address them by their actual @mention handles, and state the sequence and acceptance check. Do not perform a specialist task yourself when a better-suited assistant is available. Keep coordination in this shared group chat and wait for real specialist replies before synthesizing a final answer.');
    const workspaceSearch = chiefWorkspaceSearchContext();
    if (workspaceSearch) sections.push(workspaceSearch);
  }
  if (isGroupChat) {
    const participants = requestedGroupModels.map((participant, index) => assistantReferenceName(participant, requestedGroupProfiles[index]?.id || '')).join(', ');
    sections.push(`You are participating in an AI group chat named "${requestedGroupName}". Participants: ${participants}. Respond only as yourself. Never invent, simulate, predict, quote, summarize, or label a section as another participant's response or "take." You may refer to another assistant's view only when an actual prior message from that assistant is present in the conversation context. If that assistant has not replied yet, do not describe what they think or what they will say. Build on real prior contributions without merely repeating them, and clearly state disagreements when they matter.`);
    const priorResponders = [...new Set(history.filter((message) => message.role === 'assistant' && message.model && message.model !== modelName).map((message) => message.model))];
    const latestUserIndex = history.findLastIndex((message) => message.role === 'user');
    const currentRoundResponders = [...new Set(history.slice(latestUserIndex + 1).filter((message) => message.role === 'assistant' && message.model && message.model !== modelName).map((message) => message.model))];
    sections.push(priorResponders.length
      ? `OTHER ASSISTANTS WITH REAL PRIOR MESSAGES: ${priorResponders.map((participant) => assistantReferenceName(participant)).join(', ')}. You may reference only contributions actually included in the conversation context.`
      : 'OTHER ASSISTANTS WITH REAL PRIOR MESSAGES: None. Do not attribute any opinion, recommendation, wording, or future response to another assistant.');
    sections.push(currentRoundResponders.length
      ? `ASSISTANTS WHO HAVE ALREADY REPLIED TO THE CURRENT USER MESSAGE: ${currentRoundResponders.map((participant) => assistantReferenceName(participant)).join(', ')}.`
      : 'ASSISTANTS WHO HAVE ALREADY REPLIED TO THE CURRENT USER MESSAGE: None. Do not claim, preview, or write another assistant’s answer to this message.');
  }
  if (routingInstruction) sections.push(`CURRENT MESSAGE ROUTING:\n${routingInstruction}`);
  const profileDetails = buildBoundedBrief([
    ['ABOUT THE USER', userProfile.about, 450],
    ['USER GOALS', userProfile.goals, 450],
    ['CURRENT WORK AND CONTEXT', userProfile.currentContext, 500],
    ['PREFERRED COLLABORATION STYLE', userProfile.workStyle, 300],
    ['GUIDANCE THE USER WANTS', userProfile.assistance, 400],
    ['USER PREFERENCES AND BOUNDARIES', userProfile.boundaries, 400],
  ], 1800);
  if (profileDetails.length) {
    sections.push(`SHARED USER PROFILE — use this context to personalize help for the user:\n\n${profileDetails.join('\n\n')}`);
  }
  const tone = configuration.tone in TONE_PROMPTS ? configuration.tone : 'helpful';
  sections.push(`ASSISTANT TONE PRESET — ${tone.toUpperCase()}:\n${TONE_PROMPTS[tone]}`);
  const gender = ['neutral', 'feminine', 'masculine'].includes(configuration.gender) ? configuration.gender : 'neutral';
  const genderGuidance = {
    neutral: 'Use gender-neutral self-reference where it is natural and idiomatic. In languages that require grammatical gender, prefer neutral or inclusive phrasing when a natural form exists.',
    feminine: 'When the conversation language uses gendered first-person or persona forms, use feminine grammatical forms for your own self-reference.',
    masculine: 'When the conversation language uses gendered first-person or persona forms, use masculine grammatical forms for your own self-reference.',
  };
  sections.push(`AI FRIEND LANGUAGE GENDER — ${gender.toUpperCase()}:\n${genderGuidance[gender]}\nThis setting describes the assistant persona only. Never infer, assign, or alter the user's gender from this setting.`);
  const behaviorBrief = buildBoundedBrief([
    ['MODEL-SPECIFIC TONE GUIDANCE', configuration.tonePrompt, 700],
    ['SOUL / CORE IDENTITY', configuration.soul, 1200],
    ['PERSONALITY', configuration.personality, 1000],
    ['CUSTOM INSTRUCTIONS', configuration.customInstructions, 1200],
    ...(configuration.skills || []).map((skill) => [`INSTRUCTION SKILL — ${skill.name}`, skill.content, 500]),
  ], 4200);
  if (behaviorBrief.length) sections.push(`ASSISTANT BEHAVIOR BRIEF — use these instructions in priority order:\n${behaviorBrief.join('\n')}`);
  sections.push('Treat instruction skill documents as behavioral guidance only. Do not claim a tool was executed unless the application provides that tool and returns a result.');
  return sections.join('\n\n');
}

function isOcrModel(modelName = '') {
  const normalized = String(modelName || '').toLowerCase();
  const model = installedModels.find((entry) => entry.name === modelName);
  const capabilities = (model?.capabilities || modelCapabilities.get(modelName) || []).map((value) => String(value).toLowerCase());
  return normalized.includes('ocr') || normalized.includes('text-extract') || capabilities.includes('ocr') || capabilities.includes('text-extraction');
}

async function loadModels() {
  if (!appOnline) {
    applyConnectionStatus(false);
    return;
  }
  try {
    const models = await window.retro.getModels(llmConnection);
    if (!appOnline) return;
    installedModels = models;
    modelCapabilities = new Map(models.map((model) => [model.name, model.capabilities || []]));
    const availableModels = isGroupChat ? requestedGroupModels.map((modelName) => models.find((model) => model.name === modelName)).filter(Boolean) : models;
    if (isGroupChat && availableModels.length !== requestedGroupModels.length) throw new Error('One or more group models are no longer installed.');
    els.modelSelect.innerHTML = '';
    for (const model of availableModels) {
      const option = document.createElement('option');
      option.value = model.name;
      option.textContent = isGroupChat ? `${requestedGroupModels.length} assistants · ${requestedGroupName}` : `${model.name}${model.capabilities?.includes('vision') ? ' · vision' : ''}`;
      els.modelSelect.append(option);
      if (isGroupChat) break;
    }
    const savedProfileModel = isGroupChat ? '' : profileById(requestedProfileId)?.model;
    const preferred = isGroupChat
      ? availableModels.find((model) => model.name === requestedGroupModels[0])
      : models.find((model) => model.name === savedProfileModel) || models.find((model) => model.name === requestedWindowModel) || models.find((model) => model.name === llmConnection.preferredModel) || models.find((model) => model.name === 'qwen3.6:latest' && model.capabilities?.includes('vision')) || models.find((model) => model.capabilities?.includes('vision')) || models[0];
    if (!preferred) throw new Error('No local models found.');
    els.modelSelect.value = preferred.name;
    // A chat opened for a saved AI profile may switch its underlying local
    // model. The profile's name, image, tone, Soul, and skills remain attached
    // to the profile while the selected model changes.
    els.modelSelect.disabled = Boolean(isGroupChat);
    updateModelCaption();
    setStatus('online', `${llmConnection.provider === 'ollama' ? 'Ollama' : 'Local model'} online`);
  } catch (error) {
    setStatus('offline', 'Local model unavailable');
    els.modelSelect.innerHTML = '<option>Open Tools → Setup</option>';
    addMessage('assistant', `I could not reach the configured local model. ${error.message}`);
  }
}

async function openModelGuide(forceRefresh = true) {
  els.modelGuideDialog.showModal();
  els.modelGuideContent.innerHTML = '<p class="model-guide-intro">Refreshing installed model details…</p>';
  try {
    if (appOnline) installedModels = await window.retro.getModels(llmConnection, forceRefresh);
    els.modelGuideContent.innerHTML = window.AiModelGuide.render(installedModels);
  } catch (error) {
    els.modelGuideContent.innerHTML = `<p class="model-guide-intro">Could not refresh Ollama: ${escapeHtml(error.message)}</p>${window.AiModelGuide.render(installedModels)}`;
  }
}

function updateModelCaption() {
  const capabilities = isGroupChat
    ? [...new Set(requestedGroupModels.flatMap((model) => modelCapabilities.get(model) || []))]
    : modelCapabilities.get(els.modelSelect.value) || [];
  activateAssistantProfile(selectedModelName());
  const modelPickerLabel = document.querySelector('.model-picker-label');
  modelPickerLabel.classList.toggle('hidden', isGroupChat);
  els.modelSelect.classList.toggle('hidden', isGroupChat);
  document.querySelector('.model-picker-label span').textContent = 'AI MODEL';
  renderGroupMentions();
  els.modelCaption.textContent = isGroupChat
    ? `${requestedGroupModels.length} AI Friends · ${requestedGroupName} · ${requestedGroupModels.map((modelName) => modelFootprintStatus(installedModelByName(modelName))).join(' / ')}`
    : modelFootprintStatus(installedModelByName(els.modelSelect.value));
  els.capture.disabled = !capabilities.includes('vision');
  els.imageUploadButton.disabled = !capabilities.includes('vision');
  els.capture.title = capabilities.includes('vision') ? 'Attach a desktop snapshot' : 'Choose a vision-capable model to share a view';
  els.imageUploadButton.title = capabilities.includes('vision') ? 'Attach an image' : 'Choose a vision-capable model to attach images';
  if (!capabilities.includes('vision')) clearAttachment();
  applyNames();
  applyProfilePicture('buddy', selectedModelPicture());
  renderAssistantCapabilityStrip();
}

document.querySelectorAll('[data-window-action]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.windowAction === 'close' && isDockedChat) {
      window.retro.closeDockedChat().catch((error) => alert(`This chat could not be closed: ${error.message}`));
      return;
    }
    window.retro.windowControl(button.dataset.windowAction);
  });
});
els.detachChat.addEventListener('click', async () => {
  els.detachChat.disabled = true;
  try {
    if (activeSessionId || history.length) await persistCurrentSession();
    await window.retro.detachDockedChat();
  } catch (error) {
    alert(`This chat could not be detached: ${error.message}`);
  } finally {
    els.detachChat.disabled = false;
  }
});
els.closeDockedChat.addEventListener('click', async () => {
  els.closeDockedChat.disabled = true;
  try {
    if (activeSessionId || history.length) await persistCurrentSession();
    await window.retro.closeDockedChat();
  } catch (error) {
    alert(`This chat could not be closed: ${error.message}`);
  } finally {
    els.closeDockedChat.disabled = false;
  }
});
window.retro.onChatViewMode(applyChatViewMode);

function clearAttachment() {
  attachment = null;
  els.attachment.classList.add('hidden');
  els.attachmentImage.classList.remove('hidden');
  els.attachmentImage.removeAttribute('src');
}

function attachImage(dataUrl, name) {
  attachment = { dataUrl, name };
  els.attachmentImage.classList.remove('hidden');
  els.attachmentImage.src = dataUrl;
  els.attachmentName.textContent = name || 'Attached image';
  els.attachment.classList.remove('hidden');
  els.prompt.focus();
}

async function attachReviewFile(file) {
  if (!file) return;
  if (file.type.startsWith('image/')) {
    const targetModels = isGroupChat ? requestedGroupModels : [selectedModelName()];
    if (!targetModels.some((model) => (modelCapabilities.get(model) || []).includes('vision'))) {
      alert('Choose a vision-capable assistant before attaching an image.');
      return;
    }
    loadImageFile(file);
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert('Please choose a text or code file smaller than 2 MB.');
    return;
  }
  try {
    const text = await file.text();
    if (text.includes('\u0000')) throw new Error('This file is binary and cannot be read as text.');
    attachment = { name: file.name, text: text.slice(0, 500_000) };
    els.attachmentImage.classList.add('hidden');
    els.attachmentName.textContent = file.name;
    els.attachment.classList.remove('hidden');
    els.prompt.focus();
  } catch (error) {
    alert(`That file could not be attached for review: ${error.message}`);
  }
}

function openInviteDialog() {
  const currentProfileIds = isGroupChat ? requestedGroupProfiles.map((profile) => profile.id).filter(Boolean) : [currentProfileId()];
  const candidates = profiles.filter((profile) => !currentProfileIds.includes(profile.id));
  els.inviteModel.innerHTML = '';
  for (const profile of candidates) {
    const option = document.createElement('option');
    option.value = profile.id;
    option.textContent = `${profile.name} (${formatModelName(profile.model)})`;
    els.inviteModel.append(option);
  }
  const inviteLabel = document.querySelector('label[for="invite-model"]');
  const inviteSubmit = els.inviteForm.querySelector('button[type="submit"]');
  els.inviteModel.disabled = !candidates.length;
  if (inviteLabel) inviteLabel.classList.toggle('hidden', !candidates.length);
  if (inviteSubmit) inviteSubmit.classList.toggle('hidden', !candidates.length);
  if (!candidates.length && !isGroupChat) {
    alert('There are no other installed assistants available to invite.');
    return;
  }
  const description = document.querySelector('#invite-dialog-description');
  els.inviteDialogTitle.textContent = isGroupChat ? 'Manage group assistants' : 'Invite an AI Friend';
  if (description) {
    description.textContent = isGroupChat
      ? (candidates.length
        ? 'Select another installed assistant to add to this group. The group name, conversation, and saved history stay together.'
        : 'All available assistants are already in this group. You can still remove a current assistant below.')
      : 'Select another installed assistant. AI Messenger will create and open a group chat containing the current assistant and the invited assistant.';
  }
  renderGroupParticipantManager();
  els.inviteDialog.showModal();
  els.inviteModel.focus();
}

function renderGroupParticipantManager() {
  if (!els.groupParticipantManager) return;
  els.groupParticipantManager.innerHTML = '';
  els.groupParticipantManager.classList.toggle('hidden', !isGroupChat);
  if (!isGroupChat) return;
  const heading = document.createElement('strong');
  heading.textContent = 'Current assistants';
  els.groupParticipantManager.append(heading);
  const list = document.createElement('div');
  list.className = 'group-participant-list';
  requestedGroupProfiles.forEach((entry) => {
    const profile = profileById(entry.id);
    if (!profile) return;
    const row = document.createElement('div');
    row.className = 'group-participant-row';
    const name = document.createElement('span');
    name.textContent = `${profile.name} (${formatModelName(profile.model)})`;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.disabled = requestedGroupProfiles.length <= 2;
    remove.title = remove.disabled ? 'A group chat needs at least two assistants.' : `Remove ${profile.name} from this group`;
    remove.addEventListener('click', () => removeAssistantFromGroup(profile.id));
    row.append(name, remove);
    list.append(row);
  });
  els.groupParticipantManager.append(list);
}

async function removeAssistantFromGroup(profileId) {
  if (!isGroupChat || !requestedGroupId) {
    alert('This group could not be updated. Reopen it from the contact list and try again.');
    return;
  }
  const remainingProfiles = requestedGroupProfiles
    .filter((entry) => entry.id !== profileId)
    .map((entry) => profileById(entry.id))
    .filter(Boolean);
  if (remainingProfiles.length < 2) {
    alert('A group chat needs at least two assistants.');
    return;
  }
  const groupIndex = groups.findIndex((group) => group.id === requestedGroupId);
  if (groupIndex < 0) {
    alert('This group could not be updated because its saved record is unavailable. Reopen it from the contact list and try again.');
    return;
  }
  groups[groupIndex] = {
    ...groups[groupIndex],
    profileIds: remainingProfiles.map((profile) => profile.id),
    models: remainingProfiles.map((profile) => profile.model),
    updatedAt: new Date().toISOString(),
  };
  try {
    await persistState(['groups']);
    els.inviteDialog.close();
    await window.retro.dockGroupChat(remainingProfiles.map((profile) => ({ id: profile.id, model: profile.model })), requestedGroupName, requestedGroupId);
  } catch (error) {
    alert(`The assistant could not be removed from this group: ${error.message}`);
  }
}

function insertAtCursor(text) {
  const start = els.prompt.selectionStart;
  const end = els.prompt.selectionEnd;
  els.prompt.setRangeText(text, start, end, 'end');
  els.prompt.focus();
}

function applyNames() {
  const conversationName = buddyDisplayName();
  document.querySelectorAll('[data-user-name]').forEach((element) => { element.textContent = userName; });
  document.querySelectorAll('[data-buddy-name]').forEach((element) => { element.textContent = conversationName; });
  document.querySelectorAll('.message.user .message-author').forEach((element) => { element.textContent = `${userName} says:`; });
  document.querySelectorAll('.message.assistant').forEach((element) => {
    element.querySelector('.message-author').textContent = `${assistantDisplayName(element.dataset.model || selectedModelName(), element.dataset.profileId || '')} says:`;
  });
  document.title = `${isGroupChat ? 'Group Conversation' : 'Conversation'} - ${conversationName}`;
  if (isGroupChat) renderGroupMentions();
}

function formatModelName(modelName) {
  const raw = String(modelName || '').replace(/:latest$/i, '');
  const knownModels = {
    gemma4: 'Gemma 4.0',
    'qwen3.6': 'Qwen 3.6',
    'glm-ocr': 'GLM OCR',
  };
  if (knownModels[raw.toLowerCase()]) return knownModels[raw.toLowerCase()];
  const [name, size] = raw.split(':');
  const readableName = name.split(/[-_]/).filter(Boolean).map((part) => part.length <= 3 ? part.toUpperCase() : `${part[0].toUpperCase()}${part.slice(1)}`).join(' ');
  return size ? `${readableName} ${size.toUpperCase()}` : readableName || 'Local Model';
}

function buddyDisplayName() {
  if (isGroupChat) return requestedGroupName;
  const selectedModel = selectedModelName();
  return assistantDisplayName(selectedModel);
}

function assistantDisplayName(modelName, profileId = '') {
  const profile = profileForModel(modelName, profileId);
  const customName = profile?.name || userPreferences.modelAliases?.[modelName] || buddyName;
  // One-to-one chats already show the active model in the picker. Keep the
  // compact name there, while group conversations retain model context for
  // distinguishing similarly named assistants.
  return isGroupChat ? `${customName} (${formatModelName(modelName)})` : customName;
}

function assistantReferenceName(modelName, profileId = '') {
  const profile = profileForModel(modelName, profileId);
  return profile?.name || userPreferences.modelAliases?.[modelName] || buddyName || 'Assistant';
}

function isChiefOfStaff(modelName, profileId = '') {
  const profile = profileForModel(modelName, profileId);
  if (String(profile?.name || '').trim().toLowerCase() === 'chief of staff') return true;
  const configured = profileId ? assistantProfiles.profiles?.[profileId] : null;
  if (configured?.presetKey === 'chiefOfStaff' || /chief\s+of\s+staff/i.test(configured?.customRole || '')) return true;
  const configurationText = [configured?.soul, configured?.personality, configured?.customInstructions, configured?.skills?.map((skill) => skill.content).join(' ')].join(' ').toLowerCase();
  return configurationText.includes('chief of staff');
}

function groupMentionEntries() {
  const used = new Set();
  return requestedGroupModels.map((modelName, index) => {
    const profile = profileForModel(modelName, requestedGroupProfiles[index]?.id || '');
    const customName = profile?.name || userPreferences.modelAliases?.[modelName] || buddyName || `AI ${index + 1}`;
    const base = customName.trim().replace(/\s+/g, '_').replace(/[^\p{L}\p{N}_-]/gu, '') || `AI_${index + 1}`;
    let handle = base;
    let suffix = 2;
    while (used.has(handle.toLocaleLowerCase())) handle = `${base}_${suffix++}`;
    used.add(handle.toLocaleLowerCase());
    return { modelName, profileId: profile?.id || requestedGroupProfiles[index]?.id || '', handle };
  });
}

function renderGroupMentions() {
  els.groupMentions.classList.toggle('hidden', !isGroupChat);
  if (!isGroupChat) return;
  els.groupMentions.innerHTML = '<strong>Address in group:</strong>';
  for (const entry of groupMentionEntries()) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.model = entry.modelName;
    button.textContent = `@${entry.handle}`;
    button.title = `Address ${assistantDisplayName(entry.modelName, entry.profileId)} in this group`;
    button.addEventListener('click', () => insertAtCursor(`@${entry.handle} `));
    els.groupMentions.append(button);
  }
  els.prompt.placeholder = 'Type for everyone, or @mention who should respond…';
}

function resolveGroupMentions(content) {
  if (!isGroupChat) return { models: [], participants: [], tokens: [], unknown: [] };
  const entries = groupMentionEntries();
  const byHandle = new Map(entries.map((entry) => [entry.handle.toLocaleLowerCase(), entry]));
  const tokens = [...content.matchAll(/@\s*([\p{L}\p{N}_-]+)/gu)].map((match) => match[1]);
  const models = [];
  const participants = [];
  const unknown = [];
  for (const token of tokens) {
    const entry = byHandle.get(token.toLocaleLowerCase());
    if (!entry) unknown.push(token);
    else if (!participants.some((participant) => (participant.profileId || participant.modelName) === (entry.profileId || entry.modelName))) {
      models.push(entry.modelName);
      participants.push(entry);
    }
  }
  if (content.includes('@') && !tokens.length) unknown.push('@');
  if (!content.includes('@') && !models.length) {
    const leadingAddress = content.trim().replace(/^(?:ok|okay|hey|hi)\s*,?\s*/iu, '');
    for (const entry of entries) {
      const customName = profileForModel(entry.modelName, entry.profileId)?.name || userPreferences.modelAliases?.[entry.modelName] || buddyName;
      const escapedName = customName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp(`^${escapedName}\\s*[, :]`, 'iu').test(leadingAddress)) {
        models.push(entry.modelName);
        participants.push(entry);
        tokens.push(entry.handle);
        break;
      }
    }
  }
  return { models, participants, tokens, unknown };
}

function hideMentionAutocomplete() {
  mentionMatches = [];
  mentionRange = null;
  activeMentionIndex = 0;
  els.mentionAutocomplete.classList.add('hidden');
  els.mentionAutocomplete.innerHTML = '';
}

function selectMentionSuggestion(index) {
  const entry = mentionMatches[index];
  if (!entry || !mentionRange) return;
  els.prompt.setRangeText(`@${entry.handle} `, mentionRange.start, mentionRange.end, 'end');
  hideMentionAutocomplete();
  els.prompt.focus();
}

function renderMentionAutocomplete() {
  if (!isGroupChat) {
    hideMentionAutocomplete();
    return;
  }
  const caret = els.prompt.selectionStart;
  const beforeCaret = els.prompt.value.slice(0, caret);
  const match = beforeCaret.match(/(^|\s)@([\p{L}\p{N}_-]*)$/u);
  if (!match) {
    hideMentionAutocomplete();
    return;
  }
  const query = match[2].toLocaleLowerCase();
  mentionMatches = groupMentionEntries().filter((entry) => {
    const displayName = assistantDisplayName(entry.modelName, entry.profileId).toLocaleLowerCase();
    return entry.handle.toLocaleLowerCase().includes(query) || displayName.includes(query);
  });
  if (!mentionMatches.length) {
    hideMentionAutocomplete();
    return;
  }
  mentionRange = { start: caret - match[2].length - 1, end: caret };
  activeMentionIndex = Math.min(activeMentionIndex, mentionMatches.length - 1);
  els.mentionAutocomplete.innerHTML = '';
  mentionMatches.forEach((entry, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.toggle('active', index === activeMentionIndex);
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', String(index === activeMentionIndex));
    button.innerHTML = `<strong>@${escapeHtml(entry.handle)}</strong><span>${escapeHtml(assistantDisplayName(entry.modelName, entry.profileId))}</span>`;
    button.addEventListener('mousedown', (event) => {
      event.preventDefault();
      selectMentionSuggestion(index);
    });
    els.mentionAutocomplete.append(button);
  });
  els.mentionAutocomplete.classList.remove('hidden');
}

function selectedModelName() {
  return (isGroupChat ? requestedGroupModels[0] : '') || els.modelSelect.value || requestedWindowModel || llmConnection.preferredModel;
}

function markCurrentChatRead() {
  const chatIds = isGroupChat ? requestedGroupProfiles.map((profile) => profile.id || profile.model) : [currentProfileId() || selectedModelName()];
  for (const chatId of chatIds) {
    if (chatId) window.retro.setChatUnread(chatId, false).catch(() => {});
  }
}

function selectedModelPicture() {
  const profile = currentProfile();
  if (profile?.useGenericAvatar) return null;
  return profile?.picture || userPreferences.modelPictures?.[selectedModelName()] || null;
}

function openUserProfileDialog() {
  els.aboutMeName.value = userName;
  updateAboutMePicture();
  els.userProfileAbout.value = userProfile.about;
  els.userProfileGoals.value = userProfile.goals;
  els.userProfileContext.value = userProfile.currentContext;
  els.userProfileStyle.value = userProfile.workStyle;
  els.userProfileAssistance.value = userProfile.assistance;
  els.userProfileBoundaries.value = userProfile.boundaries;
  els.userProfileDialog.showModal();
  els.aboutMeName.focus();
}

function updateAboutMePicture() {
  const picture = userPreferences.userPicture;
  els.aboutMePicturePreview.classList.toggle('hidden', !picture);
  els.aboutMePictureFallback.classList.toggle('hidden', Boolean(picture));
  if (picture) els.aboutMePicturePreview.src = picture;
  else els.aboutMePicturePreview.removeAttribute('src');
}

function openModelNameDialog() {
  const modelName = selectedModelName();
  if (!modelName) return;
  els.modelNameIdentifier.textContent = formatModelName(modelName);
  els.modelCustomName.value = currentProfile()?.name || userPreferences.modelAliases?.[modelName] || buddyName;
  els.modelNameDialog.showModal();
  els.modelCustomName.select();
}

function applyProfilePicture(type, dataUrl) {
  const custom = type === 'buddy' ? els.buddyCustomPicture : els.userCustomPicture;
  const fallback = type === 'buddy' ? els.buddyDefaultPicture : els.userDefaultPicture;
  if (type === 'buddy' && isGroupChat) {
    custom.classList.add('hidden');
    fallback.classList.add('hidden');
    document.querySelector('#buddy-picture-menu-button').classList.add('hidden');
    document.querySelector('#buddy-picture-menu').classList.add('hidden');
    renderGroupPictures();
    renderAssistantCapabilityStrip();
    return;
  }
  custom.classList.toggle('hidden', !dataUrl);
  fallback.classList.toggle('hidden', Boolean(dataUrl));
  if (dataUrl) custom.src = dataUrl;
  else custom.removeAttribute('src');
  if (type === 'user') updateAboutMePicture();
  if (type === 'buddy') renderAssistantCapabilityStrip();
}

function renderAssistantCapabilityStrip() {
  if (!els.buddyCapabilityStrip) return;
  const modelNames = isGroupChat ? requestedGroupModels : [selectedModelName()];
  const uniqueModels = [...new Set(modelNames)].slice(0, 4);
  els.buddyCapabilityStrip.innerHTML = uniqueModels.map((modelName) => renderCapabilityBadges(installedModelByName(modelName))).join('');
  els.buddyCapabilityStrip.classList.toggle('hidden', !uniqueModels.length);
}

function renderGroupPictures() {
  els.groupPictureGrid.classList.remove('hidden');
  els.groupPictureGrid.classList.toggle('compact', requestedGroupModels.length > 4);
  els.groupPictureGrid.classList.toggle('dense', requestedGroupModels.length > 6);
  els.groupPictureGrid.innerHTML = '';
  const colors = ['#3e91d3', '#58ae4f', '#ec8d3d', '#9a70c9', '#d95b79', '#37a6a0', '#ca9a30', '#637fbc'];
  const latestAddress = [...history].reverse().find((message) => message.role === 'user' && Array.isArray(message.addressedModels) && message.addressedModels.length);
  const latestAssistant = [...history].reverse().find((message) => message.role === 'assistant' && message.model);
  const topModel = (groupStackTopModel && requestedGroupModels.includes(groupStackTopModel) ? groupStackTopModel : '')
    || latestAddress?.addressedModels?.find((modelName) => requestedGroupModels.includes(modelName))
    || (requestedGroupModels.includes(latestAssistant?.model) ? latestAssistant.model : requestedGroupModels[0]);
  const topIndex = Math.max(0, requestedGroupModels.indexOf(topModel));
  const stack = document.createElement('div');
  stack.className = 'group-picture-stack';
  const imageSize = requestedGroupModels.length > 6 ? 90 : requestedGroupModels.length > 4 ? 115 : 155;
  const overlapStep = requestedGroupModels.length > 6 ? 9 : requestedGroupModels.length > 4 ? 11 : 14;
  const verticalStep = requestedGroupModels.length > 6 ? 7 : requestedGroupModels.length > 4 ? 9 : 11;
  const fanStep = requestedGroupModels.length > 6 ? 18 : requestedGroupModels.length > 4 ? 27 : 42;
  stack.style.width = `${imageSize + Math.min(requestedGroupModels.length - 1, 7) * overlapStep}px`;
  stack.style.height = `${imageSize + Math.min(requestedGroupModels.length - 1, 7) * verticalStep + 18}px`;
  const ordered = requestedGroupModels.map((modelName, index) => ({ modelName, index })).sort((a, b) => {
    if (a.index === topIndex) return 1;
    if (b.index === topIndex) return -1;
    return a.index - b.index;
  });
  ordered.forEach(({ modelName, index }, stackIndex) => {
    const profileId = requestedGroupProfiles[index]?.id || '';
    const item = document.createElement('div');
    item.className = `group-picture-stack-item${index === topIndex ? ' top' : ''}`;
    item.title = assistantDisplayName(modelName, profileId);
    item.style.setProperty('--stack-index', String(stackIndex));
    item.style.left = index === topIndex ? '0px' : `${Math.max(0, ordered.length - stackIndex - 1) * overlapStep}px`;
    item.style.top = index === topIndex ? '0px' : `${Math.max(0, ordered.length - stackIndex - 1) * verticalStep}px`;
    item.style.setProperty('--fan-left', `${stackIndex * fanStep}px`);
    item.style.setProperty('--fan-top', `${Math.min(stackIndex, 5) * 2}px`);
    item.addEventListener('click', () => {
      groupStackTopModel = modelName;
      renderGroupPictures();
    });
    const profile = profileForModel(modelName, profileId);
    const picture = profile?.useGenericAvatar ? null : (profile?.picture || userPreferences.modelPictures?.[modelName]);
    if (picture) {
      const image = document.createElement('img');
      image.src = picture;
      image.alt = assistantDisplayName(modelName, profileId);
      item.append(image);
    } else {
      const fallback = document.createElement('span');
      fallback.className = 'group-picture-fallback';
      fallback.style.background = colors[index % colors.length];
      fallback.textContent = (profile?.name || userPreferences.modelAliases?.[modelName] || formatModelName(modelName) || 'AI').trim().charAt(0).toUpperCase();
      fallback.setAttribute('aria-label', assistantDisplayName(modelName, profileId));
      item.append(fallback);
    }
    stack.append(item);
  });
  const label = document.createElement('small');
  const topProfile = profileForModel(topModel, requestedGroupProfiles[topIndex]?.id || '');
  label.textContent = topProfile?.name || userPreferences.modelAliases?.[topModel] || formatModelName(topModel);
  label.title = assistantDisplayName(topModel, topProfile?.id || requestedGroupProfiles[topIndex]?.id || '');
  stack.append(label);
  els.groupPictureGrid.append(stack);
}

function storeProfilePicture(file, type) {
  if (!file || !file.type.startsWith('image/')) return;
  if (file.size > 12 * 1024 * 1024) {
    alert('Please choose an image smaller than 12 MB.');
    return;
  }
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const image = new Image();
    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      const scale = Math.max(size / image.width, size / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.86);
      if (type === 'buddy') {
        const profile = currentProfile();
        if (!profile) {
          alert('Choose an AI profile before changing its picture.');
          return;
        }
        profile.picture = dataUrl;
        profile.useGenericAvatar = false;
        profile.updatedAt = new Date().toISOString();
      } else {
        userPreferences.userPicture = dataUrl;
      }
      applyProfilePicture(type, dataUrl);
      persistState(type === 'buddy' ? ['profiles'] : ['preferences']).catch((error) => alert(`That picture could not be saved securely: ${error.message}`));
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function closeProfileMenus() {
  document.querySelectorAll('.profile-picture-menu').forEach((menu) => menu.classList.add('hidden'));
  document.querySelectorAll('.picture-caret').forEach((button) => button.setAttribute('aria-expanded', 'false'));
}

function renderSkillList() {
  els.skillList.innerHTML = '';
  if (!configurationDraftSkills.length) {
    els.skillList.innerHTML = '<span class="empty-skills">No skill files added.</span>';
    return;
  }
  configurationDraftSkills.forEach((skill, index) => {
    const item = document.createElement('div');
    item.className = 'skill-item';
    item.innerHTML = `<span title="${escapeHtml(skill.name)}">📄 ${escapeHtml(skill.name)}</span><button type="button" aria-label="Remove ${escapeHtml(skill.name)}">Remove</button>`;
    item.querySelector('button').addEventListener('click', () => {
      configurationDraftSkills.splice(index, 1);
      renderSkillList();
    });
    els.skillList.append(item);
  });
}

function openConfigurationDialog() {
  activateAssistantProfile(selectedModelName());
  if (els.configurationModelLabel) els.configurationModelLabel.textContent = `These settings apply only to ${buddyDisplayName()}.`;
  els.soulPrompt.value = assistantConfiguration.soul || '';
  els.personalityPrompt.value = assistantConfiguration.personality || '';
  els.assistantGender.value = assistantConfiguration.gender || 'neutral';
  els.tonePrompt.value = assistantConfiguration.tonePrompt || '';
  els.customInstructions.value = assistantConfiguration.customInstructions || '';
  configurationDraftSkills = (assistantConfiguration.skills || []).map((skill) => ({ ...skill }));
  renderSkillList();
  els.configurationDialog.showModal();
}

async function readInstructionFile(file) {
  if (!file) return '';
  if (file.size > 200 * 1024) throw new Error(`${file.name} is larger than 200 KB.`);
  return file.text();
}

async function importPromptFile(file, target) {
  try {
    target.value = await readInstructionFile(file);
  } catch (error) {
    alert(error.message);
  }
}

async function importSkillFiles(files) {
  try {
    for (const file of [...files].slice(0, 20)) {
      const content = await readInstructionFile(file);
      const existing = configurationDraftSkills.findIndex((skill) => skill.name === file.name);
      const skill = { name: file.name, content };
      if (existing >= 0) configurationDraftSkills[existing] = skill;
      else configurationDraftSkills.push(skill);
    }
    renderSkillList();
  } catch (error) {
    alert(error.message);
  }
}

function openSetupDialog() {
  els.providerInput.value = llmConnection.provider || 'ollama';
  els.baseUrlInput.value = llmConnection.baseUrl || 'http://127.0.0.1:11434';
  els.preferredModelInput.value = llmConnection.preferredModel || '';
  els.apiKeyInput.value = '';
  els.apiKeyInput.disabled = llmConnection.provider === 'ollama';
  els.apiKeyInput.placeholder = llmConnection.provider === 'ollama'
    ? 'Not required for local Ollama'
    : (apiKeyStored ? 'Stored securely — enter a new key to replace it' : 'Optional');
  els.timeoutInput.value = llmConnection.timeoutSeconds || 120;
  els.keepAliveInput.value = llmConnection.keepAlive || '10m';
  els.visionEnabledInput.checked = Boolean(llmConnection.visionEnabled);
  els.setupTestResult.className = 'setup-test-result';
  els.setupTestResult.textContent = 'Choose automatic detection or configure the local server manually.';
  els.setupDialog.showModal();
}

function connectionFromForm() {
  return {
    provider: els.providerInput.value === 'openai' ? 'openai' : 'ollama',
    baseUrl: els.baseUrlInput.value.trim(),
    preferredModel: els.preferredModelInput.value.trim(),
    apiKey: els.apiKeyInput.value,
    timeoutSeconds: Math.min(600, Math.max(10, Number(els.timeoutInput.value) || 120)),
    keepAlive: els.keepAliveInput.value.trim() || '10m',
    visionEnabled: els.visionEnabledInput.checked,
  };
}

async function testSetupConnection() {
  els.setupTestResult.className = 'setup-test-result';
  els.setupTestResult.textContent = 'Testing local connection…';
  els.testConnection.disabled = true;
  try {
    const result = await window.retro.testConnection(connectionFromForm());
    els.setupTestResult.className = 'setup-test-result success';
    els.setupTestResult.textContent = `✓ ${result.message}`;
  } catch (error) {
    els.setupTestResult.className = 'setup-test-result error';
    els.setupTestResult.textContent = `Connection failed: ${error.message}`;
  } finally {
    els.testConnection.disabled = false;
  }
}

async function detectOllama() {
  els.detectOllama.disabled = true;
  els.setupTestResult.className = 'setup-test-result';
  els.setupTestResult.textContent = 'Looking for Ollama on this device…';
  try {
    const result = await window.retro.discoverOllama(llmConnection);
    const detected = result.connection;
    els.providerInput.value = 'ollama';
    els.baseUrlInput.value = detected.baseUrl;
    els.preferredModelInput.value = detected.preferredModel || '';
    els.apiKeyInput.value = '';
    els.apiKeyInput.disabled = true;
    els.setupTestResult.className = 'setup-test-result success';
    els.setupTestResult.textContent = `✓ Ollama ${result.version || 'detected'} · ${result.models.length} model${result.models.length === 1 ? '' : 's'} found. Review the fields, then choose Save & Connect.`;
  } catch (error) {
    els.setupTestResult.className = 'setup-test-result error';
    els.setupTestResult.textContent = error.message;
  } finally {
    els.detectOllama.disabled = false;
  }
}

function openSetupGuide() {
  els.setupGuideDialog.showModal();
}

function applyTheme(theme, save = true) {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  userPreferences.theme = nextTheme;
  document.querySelectorAll('[data-theme-option]').forEach((button) => {
    button.setAttribute('aria-checked', String(button.dataset.themeOption === nextTheme));
  });
  if (save) persistState(['preferences']).catch((error) => console.error('Could not save theme securely:', error));
}

function applyFontSize(size, save = true) {
  const normalized = ['50', '100', '125'].includes(String(size)) ? String(size) : '100';
  document.documentElement.dataset.fontSize = normalized;
  userPreferences.fontSize = normalized;
  document.querySelectorAll('[data-font-option]').forEach((button) => {
    button.setAttribute('aria-checked', String(button.dataset.fontOption === normalized));
  });
  if (save) persistState(['preferences']).catch((error) => console.error('Could not save text size securely:', error));
}

function applyChatSplit(percent, save = true) {
  const normalized = safeChatSplitPercent(percent);
  userPreferences.chatSplitPercent = normalized;
  if (els.chatColumn) {
    els.chatColumn.style.gridTemplateRows = `minmax(175px, ${normalized}fr) 8px minmax(150px, ${100 - normalized}fr)`;
  }
  if (els.chatResizeDivider) {
    els.chatResizeDivider.setAttribute('aria-valuemin', '35');
    els.chatResizeDivider.setAttribute('aria-valuemax', '78');
    els.chatResizeDivider.setAttribute('aria-valuenow', String(normalized));
  }
  if (save) persistState(['preferences']).catch((error) => console.error('Could not save chat panel size:', error));
}

function applyAssistantTone(tone, save = true) {
  const normalized = tone in TONE_PROMPTS ? tone : 'helpful';
  assistantConfiguration.tone = normalized;
  document.querySelectorAll('[data-tone-option]').forEach((button) => {
    button.setAttribute('aria-checked', String(button.dataset.toneOption === normalized));
  });
  if (save) {
    saveActiveAssistantProfile();
    persistState(['configuration']).then(() => setStatus('online', `Assistant tone: ${normalized === 'direct' ? 'to the point' : normalized}`)).catch((error) => console.error('Could not save tone:', error));
  }
}

function selectedText() {
  if (els.prompt.selectionStart !== els.prompt.selectionEnd) {
    return els.prompt.value.slice(els.prompt.selectionStart, els.prompt.selectionEnd);
  }
  return window.getSelection()?.toString() || '';
}

async function copySelection(cut = false) {
  const text = selectedText();
  if (!text) return;
  await window.retro.writeClipboardText(text);
  if (cut && els.prompt.selectionStart !== els.prompt.selectionEnd) {
    els.prompt.setRangeText('', els.prompt.selectionStart, els.prompt.selectionEnd, 'end');
  }
}

function closeMenus() {
  document.querySelectorAll('.menu-dropdown').forEach((menu) => menu.classList.add('hidden'));
  document.querySelectorAll('.menu-trigger').forEach((button) => button.setAttribute('aria-expanded', 'false'));
}

document.querySelectorAll('.menu-trigger').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const menu = document.querySelector(`#${button.dataset.menu}`);
    const willOpen = menu.classList.contains('hidden');
    closeMenus();
    if (willOpen) {
      menu.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

document.querySelectorAll('[data-command]').forEach((button) => {
  button.addEventListener('click', async () => {
    const command = button.dataset.command;
    closeMenus();
    if (command === 'hide') window.retro.windowControl('hide');
    if (command === 'exit') window.retro.windowControl('quit');
    if (command === 'new-chat') {
      try {
        await newChat();
      } catch (error) {
        reportBackgroundError('Could not start a new chat', error);
      }
    }
    if (command === 'chat-history') openHistoryDialog();
    if (command === 'copy') await copySelection(false);
    if (command === 'cut') await copySelection(true);
    if (command === 'paste') insertAtCursor(await window.retro.readClipboardText());
    if (command === 'theme-light') applyTheme('light');
    if (command === 'theme-dark') applyTheme('dark');
    if (command === 'font-50') applyFontSize('50');
    if (command === 'font-100') applyFontSize('100');
    if (command === 'font-125') applyFontSize('125');
    if (command === 'tone-kind') applyAssistantTone('kind');
    if (command === 'tone-sarcastic') applyAssistantTone('sarcastic');
    if (command === 'tone-direct') applyAssistantTone('direct');
    if (command === 'tone-helpful') applyAssistantTone('helpful');
    if (command === 'features') els.featuresDialog.showModal();
    if (command === 'about-us') els.aboutUsDialog.showModal();
    if (command === 'license') els.licenseDialog.showModal();
    if (command === 'terms') els.termsDialog.showModal();
    if (command === 'user-data') els.userDataDialog.showModal();
    if (command === 'contact-us') els.contactUsDialog.showModal();
    if (command === 'user-guide') els.userGuideDialog.showModal();
    if (command === 'model-guide') await openModelGuide(true);
    if (command === 'setup-guide') openSetupGuide();
    if (command === 'setup') openSetupDialog();
    if (command === 'chat-logs') openAllChatLogs();
    if (command === 'edit-names') openUserProfileDialog();
    if (command === 'user-profile') openUserProfileDialog();
    if (command === 'assistant-config') openConfigurationDialog();
    if (command === 'buddy-picture') els.buddyPictureInput.click();
    if (command === 'user-picture') els.userPictureInput.click();
    if (command === 'forget-auto-unlock') {
      await window.retro.setAutomaticUnlock(false);
      alert('Automatic vault login is off. Your passphrase will be required the next time AI Messenger starts.');
    }
  });
});

document.querySelectorAll('[data-external-url]').forEach((button) => {
  button.addEventListener('click', () => window.retro.openExternal(button.dataset.externalUrl).catch((error) => reportBackgroundError('Could not open website', error)));
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.menu-root')) closeMenus();
  if (!event.target.closest('.picture-card')) closeProfileMenus();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeMenus(); closeProfileMenus(); }
  if (event.metaKey && event.key.toLowerCase() === 'n') { event.preventDefault(); newChat(); }
});

function splitPercentFromPointer(clientY) {
  if (!els.chatColumn) return userPreferences.chatSplitPercent;
  const bounds = els.chatColumn.getBoundingClientRect();
  const available = Math.max(1, bounds.height);
  return safeChatSplitPercent(((clientY - bounds.top) / available) * 100);
}

els.chatResizeDivider?.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  els.chatResizeDivider.setPointerCapture(event.pointerId);
  document.body.classList.add('resizing-chat');
  applyChatSplit(splitPercentFromPointer(event.clientY), false);
});

els.chatResizeDivider?.addEventListener('pointermove', (event) => {
  if (!els.chatResizeDivider.hasPointerCapture(event.pointerId)) return;
  applyChatSplit(splitPercentFromPointer(event.clientY), false);
});

els.chatResizeDivider?.addEventListener('pointerup', (event) => {
  if (els.chatResizeDivider.hasPointerCapture(event.pointerId)) els.chatResizeDivider.releasePointerCapture(event.pointerId);
  document.body.classList.remove('resizing-chat');
  applyChatSplit(userPreferences.chatSplitPercent, true);
});

els.chatResizeDivider?.addEventListener('pointercancel', (event) => {
  if (els.chatResizeDivider.hasPointerCapture(event.pointerId)) els.chatResizeDivider.releasePointerCapture(event.pointerId);
  document.body.classList.remove('resizing-chat');
});

els.chatResizeDivider?.addEventListener('keydown', (event) => {
  if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const step = event.shiftKey ? 8 : 4;
  if (event.key === 'ArrowUp') applyChatSplit(userPreferences.chatSplitPercent - step);
  if (event.key === 'ArrowDown') applyChatSplit(userPreferences.chatSplitPercent + step);
  if (event.key === 'Home') applyChatSplit(35);
  if (event.key === 'End') applyChatSplit(78);
});

document.querySelectorAll('.picture-caret').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const menu = button.id.startsWith('buddy') ? document.querySelector('#buddy-picture-menu') : document.querySelector('#user-picture-menu');
    const willOpen = menu.classList.contains('hidden');
    closeProfileMenus();
    if (willOpen) {
      menu.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

els.userPictureCard.addEventListener('click', (event) => {
  if (event.target.closest('.picture-caret, .profile-picture-menu')) return;
  openUserProfileDialog();
});
els.userPictureCard.addEventListener('keydown', (event) => {
  if (event.target !== els.userPictureCard) return;
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openUserProfileDialog();
  }
});

document.querySelectorAll('[data-picture-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const [type, action] = button.dataset.pictureAction.split('-');
    closeProfileMenus();
    if (type === 'buddy' && action === 'rename') {
      openModelNameDialog();
      return;
    }
    if (action === 'change') (type === 'buddy' ? els.buddyPictureInput : els.userPictureInput).click();
    if (action === 'reset') {
      if (type === 'buddy') {
        const profile = currentProfile();
        if (profile) {
          profile.picture = null;
          profile.useGenericAvatar = true;
          profile.updatedAt = new Date().toISOString();
        }
      } else {
        userPreferences.userPicture = null;
      }
      applyProfilePicture(type, null);
      persistState(type === 'buddy' ? ['profiles'] : ['preferences']).catch((error) => console.error('Could not save picture change securely:', error));
    }
  });
});

els.buddyPictureInput.addEventListener('change', () => {
  storeProfilePicture(els.buddyPictureInput.files[0], 'buddy');
  els.buddyPictureInput.value = '';
});
els.userPictureInput.addEventListener('change', () => {
  storeProfilePicture(els.userPictureInput.files[0], 'user');
  els.userPictureInput.value = '';
});

els.identityForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  userName = els.userNameInput.value.trim() || 'You';
  userPreferences.userName = userName;
  applyNames();
  await persistState(['preferences']);
  els.identityDialog.close();
});
els.closeIdentityDialog.addEventListener('click', () => els.identityDialog.close());
els.cancelIdentity.addEventListener('click', () => els.identityDialog.close());
els.userProfileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  userName = els.aboutMeName.value.trim().slice(0, 40) || 'You';
  userPreferences.userName = userName;
  userProfile = safeUserProfile({
    about: els.userProfileAbout.value,
    goals: els.userProfileGoals.value,
    currentContext: els.userProfileContext.value,
    workStyle: els.userProfileStyle.value,
    assistance: els.userProfileAssistance.value,
    boundaries: els.userProfileBoundaries.value,
  });
  applyNames();
  await persistState(['preferences', 'userProfile']);
  els.userProfileDialog.close();
  setStatus('online', 'About Me saved across every chat');
});
els.aboutMeChangePicture.addEventListener('click', () => els.userPictureInput.click());
els.aboutMeResetPicture.addEventListener('click', async () => {
  userPreferences.userPicture = null;
  applyProfilePicture('user', null);
  await persistState(['preferences']);
});
els.resetUserProfile.addEventListener('click', () => {
  els.userProfileAbout.value = '';
  els.userProfileGoals.value = '';
  els.userProfileContext.value = '';
  els.userProfileStyle.value = '';
  els.userProfileAssistance.value = '';
  els.userProfileBoundaries.value = '';
});
els.closeUserProfileDialog.addEventListener('click', () => els.userProfileDialog.close());
els.cancelUserProfile.addEventListener('click', () => els.userProfileDialog.close());
els.modelNameForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const profile = currentProfile();
  if (!profile) return;
  profile.name = els.modelCustomName.value.trim().slice(0, 40) || 'AI';
  profile.updatedAt = new Date().toISOString();
  applyNames();
  await persistState(['profiles']);
  els.modelNameDialog.close();
});
els.resetModelName.addEventListener('click', async () => {
  const profile = currentProfile();
  if (!profile) return;
  profile.name = profile.model.replace(/:latest$/i, '').slice(0, 40) || 'AI';
  profile.updatedAt = new Date().toISOString();
  applyNames();
  await persistState(['profiles']);
  els.modelNameDialog.close();
});
els.closeModelNameDialog.addEventListener('click', () => els.modelNameDialog.close());
els.cancelModelName.addEventListener('click', () => els.modelNameDialog.close());

els.closeHistoryDialog.addEventListener('click', () => els.historyDialog.close());
els.cancelHistory.addEventListener('click', () => els.historyDialog.close());
els.closeHistoryViewer.addEventListener('click', () => els.historyViewerDialog.close());
els.cancelHistoryViewer.addEventListener('click', () => els.historyViewerDialog.close());

els.closeConfigurationDialog.addEventListener('click', () => els.configurationDialog.close());
els.cancelConfiguration.addEventListener('click', () => els.configurationDialog.close());
els.importSoul.addEventListener('click', () => els.soulFileInput.click());
els.importPersonality.addEventListener('click', () => els.personalityFileInput.click());
els.addSkills.addEventListener('click', () => els.skillFileInput.click());
els.soulFileInput.addEventListener('change', async () => {
  await importPromptFile(els.soulFileInput.files[0], els.soulPrompt);
  els.soulFileInput.value = '';
});
els.personalityFileInput.addEventListener('change', async () => {
  await importPromptFile(els.personalityFileInput.files[0], els.personalityPrompt);
  els.personalityFileInput.value = '';
});
els.skillFileInput.addEventListener('change', async () => {
  await importSkillFiles(els.skillFileInput.files);
  els.skillFileInput.value = '';
});
els.resetConfiguration.addEventListener('click', () => {
  if (!window.confirm('Reset Soul, personality, custom instructions, and all instruction skills?')) return;
  els.soulPrompt.value = '';
  els.personalityPrompt.value = '';
  els.assistantGender.value = 'neutral';
  els.tonePrompt.value = '';
  els.customInstructions.value = '';
  configurationDraftSkills = [];
  renderSkillList();
});
els.configurationForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  assistantConfiguration = {
    soul: els.soulPrompt.value.trim(),
    personality: els.personalityPrompt.value.trim(),
    tonePrompt: els.tonePrompt.value.trim(),
    customInstructions: els.customInstructions.value.trim(),
    skills: configurationDraftSkills.slice(0, 20),
    tone: assistantConfiguration.tone in TONE_PROMPTS ? assistantConfiguration.tone : 'helpful',
    gender: ['neutral', 'feminine', 'masculine'].includes(els.assistantGender.value) ? els.assistantGender.value : 'neutral',
  };
  saveActiveAssistantProfile();
  await persistState(['configuration']);
  els.configurationDialog.close();
  setStatus('online', `${buddyDisplayName()} configuration saved · ${assistantConfiguration.skills.length} skills`);
});

els.closeFeaturesDialog.addEventListener('click', () => els.featuresDialog.close());
els.closeFeatures.addEventListener('click', () => els.featuresDialog.close());
document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => {
  const dialog = document.querySelector(`#${button.dataset.close}`);
  if (dialog?.open) dialog.close();
}));
els.closeModelGuideDialog.addEventListener('click', () => els.modelGuideDialog.close());
els.closeModelGuide.addEventListener('click', () => els.modelGuideDialog.close());
els.refreshModelGuide.addEventListener('click', () => openModelGuide(true));
els.closeSetupDialog.addEventListener('click', () => els.setupDialog.close());
els.cancelSetup.addEventListener('click', () => els.setupDialog.close());
els.detectOllama.addEventListener('click', detectOllama);
els.testConnection.addEventListener('click', testSetupConnection);
els.providerInput.addEventListener('change', () => {
  const knownDefaults = ['http://127.0.0.1:11434', 'http://127.0.0.1:1234/v1'];
  if (!els.baseUrlInput.value || knownDefaults.includes(els.baseUrlInput.value)) {
    els.baseUrlInput.value = els.providerInput.value === 'ollama' ? knownDefaults[0] : knownDefaults[1];
  }
  els.apiKeyInput.placeholder = els.providerInput.value === 'ollama'
    ? 'Not required for local Ollama'
    : (apiKeyStored ? 'Stored securely — enter a new key to replace it' : 'Optional');
  els.apiKeyInput.disabled = els.providerInput.value === 'ollama';
});
els.setupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formConnection = connectionFromForm();
  const enteredApiKey = formConnection.apiKey;
  delete formConnection.apiKey;
  if (formConnection.provider === 'ollama') {
    await window.retro.saveApiKey('');
    apiKeyStored = false;
  } else if (enteredApiKey) {
    await window.retro.saveApiKey(enteredApiKey);
    apiKeyStored = true;
  }
  llmConnection = formConnection;
  userPreferences.setupComplete = true;
  await persistState(['connection', 'preferences']);
  els.setupDialog.close();
  await loadModels();
});
els.closeSetupGuideDialog.addEventListener('click', async () => {
  userPreferences.setupComplete = true;
  await persistState(['preferences']);
  els.setupGuideDialog.close();
});
els.dismissSetupGuide.addEventListener('click', async () => {
  userPreferences.setupComplete = true;
  await persistState(['preferences']);
  els.setupGuideDialog.close();
});
els.openSetupFromGuide.addEventListener('click', async () => {
  userPreferences.setupComplete = true;
  await persistState(['preferences']);
  els.setupGuideDialog.close();
  openSetupDialog();
});
els.quitFromVault.addEventListener('click', () => window.retro.windowControl('quit'));

function loadImageFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  if (file.size > 12 * 1024 * 1024) {
    alert('Please choose an image smaller than 12 MB.');
    return;
  }
  const reader = new FileReader();
  reader.addEventListener('load', () => attachImage(reader.result, file.name));
  reader.addEventListener('error', () => alert('That image could not be read.'));
  reader.readAsDataURL(file);
}

async function chooseSource() {
  els.sourceGrid.innerHTML = '<p>Looking for screens and windows…</p>';
  els.dialog.showModal();
  try {
    const permission = await window.retro.screenPermission();
    els.permissionWarning.classList.toggle('hidden', permission !== 'denied' && permission !== 'restricted');
    const sources = await window.retro.getCaptureSources();
    els.sourceGrid.innerHTML = '';
    for (const source of sources) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'source';
      button.innerHTML = `<img src="${source.thumbnail}" alt="" /><span>${escapeHtml(source.name)}</span>`;
      button.addEventListener('click', async () => {
        button.disabled = true;
        try {
          const capture = await window.retro.captureSource(source.id);
          attachImage(capture.dataUrl, capture.name);
          els.dialog.close();
          els.prompt.focus();
        } catch (error) {
          button.disabled = false;
          alert(error.message);
        }
      });
      els.sourceGrid.append(button);
    }
  } catch (error) {
    els.sourceGrid.innerHTML = `<p>Could not read the desktop: ${escapeHtml(error.message)}</p>`;
  }
}

els.stop.addEventListener('click', async () => {
  generationStopped = true;
  els.stop.disabled = true;
  setStatus('offline', 'Stopping generation…');
  try {
    await window.retro.stopChat(activeGenerationModel || selectedModelName(), llmConnection);
  } catch (error) {
    reportBackgroundError('Could not stop generation', error);
  }
});

els.startNewChatButton.addEventListener('click', () => {
  newChat().catch((error) => reportBackgroundError('Could not start a new chat', error));
});

els.composer.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!appOnline) {
    setStatus('offline', 'Offline · reconnect from the main Messenger window');
    return;
  }
  if (!isGroupChat && currentProfile()?.online === false) {
    setStatus('offline', `${buddyDisplayName()} is offline · turn the assistant on from the main Messenger window`);
    return;
  }
  let typedContent = els.prompt.value.trim();
  if ((!typedContent && !attachment) || els.send.disabled) return;
  const contextState = await archiveForFreshContextIfNeeded(typedContent);
  typedContent = els.prompt.value.trim();
  const content = typedContent || `Please review the attached ${attachment?.name || 'file'}.`;
  if (contextState?.full) setStatus('offline', 'Context is full. You can try sending, or select Start New Chat to continue with a clean context.');
  const mentionResolution = resolveGroupMentions(content);
  if (isGroupChat && mentionResolution.unknown.length) {
    const available = groupMentionEntries().map((entry) => `@${entry.handle}`).join(', ');
    setStatus('offline', `Unknown @ mention: ${mentionResolution.unknown.map((token) => token === '@' ? '@' : `@${token}`).join(', ')} · Choose ${available}`);
    els.prompt.focus();
    return;
  }

  const image = attachment?.dataUrl || null;
  const hasExtractionInput = Boolean(image || attachment?.text);
  if (image && !isGroupChat) {
    const capabilities = modelCapabilities.get(els.modelSelect.value) || [];
    if (!capabilities.includes('vision') && !isOcrModel(els.modelSelect.value)) {
      setStatus('offline', 'This assistant cannot inspect images. Choose a vision or OCR model, or send the image to a group with one.');
      return;
    }
  }
  if (image && isGroupChat) {
    const canInspectImage = requestedGroupProfiles.some((profile) => isOcrModel(profile.model) || (modelCapabilities.get(profile.model) || []).includes('vision'));
    if (!canInspectImage) {
      setStatus('offline', 'No assistant in this group can inspect images. Add a vision or OCR assistant, then try again.');
      return;
    }
  }
  const fileText = attachment?.text
    ? `\n\n[Attached file: ${attachment.name}]\n\`\`\`\n${attachment.text}\n\`\`\``
    : '';
  const outgoing = {
    role: 'user',
    content: `${content}${fileText}`,
    displayContent: fileText ? `${content}\n\n📎 ${attachment.name}` : content,
    addressedModels: mentionResolution.models,
    timestamp: new Date().toISOString(),
  };
  if (image) outgoing.images = [image.split(',')[1]];
  history.push(outgoing);
  groupStackTopModel = '';
  const userMessageArticle = addMessage('user', outgoing.displayContent, image, '', mentionResolution.models, '', false, outgoing.timestamp);
  if (isGroupChat) renderGroupPictures();
  els.prompt.value = '';
  clearAttachment();
  // Yield after rendering so the user's message is painted immediately,
  // before any Ollama request or cache write can occupy the renderer.
  userMessageArticle.scrollIntoView({ block: 'end' });
  await new Promise((resolve) => setTimeout(resolve, 0));
  persistCurrentSession().catch((error) => reportBackgroundError('Could not save chat history', error));
  els.send.disabled = true;
  els.send.textContent = 'Thinking…';
  generationStopped = false;
  els.stop.classList.remove('hidden');
  els.stop.disabled = false;
  setStatus('online', `${isGroupChat ? requestedGroupName : buddyName} is typing…`);
  await new Promise((resolve) => requestAnimationFrame(() => resolve()));

  try {
    const allParticipants = isGroupChat
      ? (requestedGroupProfiles.length ? requestedGroupProfiles.map((profile) => ({ modelName: profile.model, profileId: profile.id })) : requestedGroupModels.map((modelName) => ({ modelName, profileId: '' })))
      : [{ modelName: els.modelSelect.value, profileId: currentProfileId() }];
    const directlyAddressed = isGroupChat && mentionResolution.participants.length > 0;
    const chiefParticipant = allParticipants.find((participant) => isChiefOfStaff(participant.modelName, participant.profileId || ''));
    // A group message is deliberately single-owner unless the user explicitly
    // addresses more than one assistant. This prevents every model from
    // independently answering the same request.
    let targetParticipants = directlyAddressed
      ? mentionResolution.participants
      : (isGroupChat ? [chiefParticipant || allParticipants.find((participant) => !isOcrModel(participant.modelName)) || allParticipants[0]] : allParticipants);
    let autoRoutedExtraction = false;
    if (isGroupChat && hasExtractionInput) {
      const extractionParticipants = allParticipants.filter((participant) => {
        const capabilities = modelCapabilities.get(participant.modelName) || [];
        return isOcrModel(participant.modelName) || capabilities.includes('vision');
      });
      const targetedNonVision = targetParticipants.some((participant) => !(modelCapabilities.get(participant.modelName) || []).includes('vision') && !isOcrModel(participant.modelName));
      if (targetedNonVision && extractionParticipants.length) {
        const extractionKeys = new Set(extractionParticipants.map((participant) => `${participant.modelName}\n${participant.profileId || ''}`));
        targetParticipants = [...extractionParticipants, ...targetParticipants.filter((participant) => !extractionKeys.has(`${participant.modelName}\n${participant.profileId || ''}`))];
        autoRoutedExtraction = true;
      } else if (!directlyAddressed && extractionParticipants.length) {
        const extractionKeys = new Set(extractionParticipants.map((participant) => `${participant.modelName}\n${participant.profileId || ''}`));
        targetParticipants = [...extractionParticipants, ...targetParticipants.filter((participant) => !extractionKeys.has(`${participant.modelName}\n${participant.profileId || ''}`))];
        autoRoutedExtraction = true;
      }
    }
    const failures = [];
    for (const participant of targetParticipants) {
      const modelName = participant.modelName;
      const profileId = participant.profileId || '';
      if (generationStopped) break;
      // OCR specialists should not be pulled into ordinary group turns. They
      // respond when explicitly addressed, or when the current message has
      // an image/document to extract; this keeps them from analysing other
      // assistants' discussion.
      const explicitlyAddressed = mentionResolution.participants.some((entry) => entry.modelName === modelName && (entry.profileId || '') === profileId);
      if (isGroupChat && isOcrModel(modelName) && !explicitlyAddressed && !hasExtractionInput) continue;
      activeGenerationModel = modelName;
      setStatus('online', `${assistantDisplayName(modelName, profileId)} is typing…`);
      // OCR models are image-capable by role even when a local server omits
      // the optional "vision" capability metadata.
      const supportsVision = (modelCapabilities.get(modelName) || []).includes('vision') || isOcrModel(modelName);
      const latestUserMessageIndex = history.findLastIndex((message) => message.role === 'user');
      const historyForParticipant = isOcrModel(modelName)
        ? (latestUserMessageIndex >= 0 ? [history[latestUserMessageIndex]] : [])
        : history;
      const modelHistory = historyForParticipant.map((message) => {
        if (message.role === 'user') {
          const next = { role: 'user', content: message.content || '' };
          if (supportsVision && message.images?.length) next.images = message.images;
          return next;
        }
        if (!message.model || message.model === modelName) return { role: 'assistant', content: message.content || '' };
        return { role: 'user', content: `[${assistantReferenceName(message.model, message.profileId || '')} said in the group]: ${message.content || ''}` };
      });
      try {
        window.retro.touchProfileActivity(profileId, modelName).catch((error) => reportBackgroundError('Could not update assistant activity', error));
        const routingInstruction = isGroupChat
          ? (isOcrModel(modelName) && autoRoutedExtraction
            ? 'You were selected as the extraction step for an attached source. Return only the extracted text, then stop so the addressed assistant can use it.'
            : (directlyAddressed
              ? 'The user explicitly addressed you. Answer only the user’s request; do not answer on behalf of, delegate to, or imitate other assistants.'
              : 'The user did not address a specific assistant. You are the single designated responder for this turn. Give a concise answer and suggest an @mention only if a different specialist is genuinely needed.'))
          : '';
        const messages = [{ role: 'system', content: buildSystemPrompt(modelName, profileId, routingInstruction) }, ...modelHistory];
        const requestId = crypto.randomUUID();
        activeStreamRequestId = requestId;
        activeStreamRawContent = '';
        const assistantTimestamp = new Date().toISOString();
        activeStreamArticle = addMessage('assistant', '', null, modelName, [], profileId, true, assistantTimestamp);
        const reply = await window.retro.chat({ requestId, model: modelName, messages, connection: llmConnection, thinkingMode: els.thinkingMode.value });
        const cleanedReply = cleanAssistantFormatting(reply.content || '(No text response)');
        const assistantMessage = { role: 'assistant', content: cleanedReply, model: isGroupChat ? modelName : '', profileId, timestamp: assistantTimestamp };
        history.push(assistantMessage);
        groupStackTopModel = '';
        if (isGroupChat) renderGroupPictures();
        window.retro.reportModelStatus(modelName, 'online').catch(() => {});
        updateStreamingMessage(activeStreamArticle, cleanedReply);
        activeStreamRequestId = '';
        activeStreamArticle = null;
        activeStreamRawContent = '';
        await window.retro.setChatUnread(profileId || modelName, !document.hasFocus()).catch((error) => reportBackgroundError('Could not update unread status', error));
      } catch (error) {
        const failedStreamArticle = activeStreamArticle;
        activeStreamRequestId = '';
        activeStreamArticle = null;
        activeStreamRawContent = '';
        if (generationStopped) break;
        if (/timeout|timed out|aborted/i.test(error.message || '')) window.retro.reportModelStatus(modelName, 'timeout').catch(() => {});
        if (isContextLimitError(error)) showStartNewChatAction();
        failures.push(`${assistantDisplayName(modelName, profileId)}: ${error.message}`);
        const replyError = isContextLimitError(error)
          ? 'This chat has reached the model context limit. Select Start New Chat to continue; the current transcript remains available in Chat History.'
          : `I could not reply because of a local connection error: ${error.message}`;
        if (failedStreamArticle) updateStreamingMessage(failedStreamArticle, replyError);
        else addMessage('assistant', replyError, null, modelName, [], profileId);
      }
    }
    await persistCurrentSession();
    if (generationStopped) setStatus('offline', 'Generation stopped');
    else setStatus(failures.length ? 'offline' : 'online', failures.length ? `${failures.length} group participant${failures.length === 1 ? '' : 's'} could not reply` : `${llmConnection.provider === 'ollama' ? 'Ollama' : 'Local model'} online`);
  } catch (error) {
    if (!generationStopped) addMessage('assistant', `I hit a local connection error: ${error.message}`);
    await persistCurrentSession().catch((error) => reportBackgroundError('Could not save chat history', error));
    setStatus('offline', generationStopped ? 'Generation stopped' : 'Chat error');
  } finally {
    activeGenerationModel = '';
    els.send.disabled = false;
    els.send.textContent = 'Send';
    els.stop.disabled = true;
    els.stop.classList.add('hidden');
    els.prompt.focus();
  }
});

els.prompt.addEventListener('keydown', (event) => {
  if (!els.mentionAutocomplete.classList.contains('hidden')) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      activeMentionIndex = (activeMentionIndex + direction + mentionMatches.length) % mentionMatches.length;
      renderMentionAutocomplete();
      return;
    }
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      selectMentionSuggestion(activeMentionIndex);
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      hideMentionAutocomplete();
      return;
    }
  }
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    els.composer.requestSubmit();
  }
});
els.prompt.addEventListener('input', renderMentionAutocomplete);
els.prompt.addEventListener('click', renderMentionAutocomplete);
els.prompt.addEventListener('blur', () => setTimeout(hideMentionAutocomplete, 100));
els.capture.addEventListener('click', chooseSource);
els.inviteButton.addEventListener('click', openInviteDialog);
els.closeInviteDialog.addEventListener('click', () => els.inviteDialog.close());
els.cancelInvite.addEventListener('click', () => els.inviteDialog.close());
els.inviteForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const invitedProfile = profileById(els.inviteModel.value);
  if (!invitedProfile) return;
  const currentProfiles = isGroupChat
    ? requestedGroupProfiles.map((entry) => profileById(entry.id)).filter(Boolean)
    : [currentProfile()].filter(Boolean);
  const groupProfiles = [...currentProfiles, invitedProfile].filter((profile, index, list) => list.findIndex((entry) => entry.id === profile.id) === index);
  if (isGroupChat && requestedGroupId) {
    const now = new Date().toISOString();
    const groupIndex = groups.findIndex((group) => group.id === requestedGroupId);
    if (groupIndex < 0) {
      alert('This group could not be updated because its saved record is unavailable. Reopen it from the contact list and try again.');
      return;
    }
    groups[groupIndex] = {
      ...groups[groupIndex],
      profileIds: groupProfiles.map((profile) => profile.id),
      models: groupProfiles.map((profile) => profile.model),
      updatedAt: now,
    };
    try {
      await persistState(['groups']);
      els.inviteDialog.close();
      await window.retro.dockGroupChat(groupProfiles.map((profile) => ({ id: profile.id, model: profile.model })), requestedGroupName, requestedGroupId);
    } catch (error) {
      alert(`The assistant could not be added to this group: ${error.message}`);
    }
    return;
  }
  const groupName = groupProfiles.map((profile) => profile.name).join(', ').slice(0, 60);
  const now = new Date().toISOString();
  const group = { id: crypto.randomUUID(), name: groupName, profileIds: groupProfiles.map((profile) => profile.id), models: groupProfiles.map((profile) => profile.model), createdAt: now, updatedAt: now };
  groups = [group, ...groups].slice(0, 100);
  await persistState(['groups']);
  els.inviteDialog.close();
  await window.retro.dockGroupChat(groupProfiles.map((profile) => ({ id: profile.id, model: profile.model })), group.name, group.id);
});
els.sendFileButton.addEventListener('click', () => els.sendFileInput.click());
els.sendFileInput.addEventListener('change', async () => {
  await attachReviewFile(els.sendFileInput.files[0]);
  els.sendFileInput.value = '';
});
els.clearChatButton.addEventListener('click', async () => {
  // Clearing writes the old transcript to history and creates a fresh session.
  // Keep the control responsive and surface cache/encryption failures instead
  // of leaving the user with a button that appears to do nothing.
  els.clearChatButton.disabled = true;
  try {
    await newChat();
  } catch (error) {
    reportBackgroundError('Could not clear chat', error);
  } finally {
    els.clearChatButton.disabled = false;
  }
});
els.emojiButton.addEventListener('click', () => els.emojiPicker.classList.toggle('hidden'));
els.closeEmojiPicker.addEventListener('click', () => els.emojiPicker.classList.add('hidden'));
els.emojiPicker.querySelectorAll('.emoji-grid button').forEach((button) => {
  button.addEventListener('click', () => {
    insertAtCursor(button.textContent);
    els.emojiPicker.classList.add('hidden');
  });
});
document.querySelectorAll('[data-insert-emoji]').forEach((button) => {
  button.addEventListener('click', () => insertAtCursor(button.dataset.insertEmoji));
});
els.imageUploadButton.addEventListener('click', () => els.imageUploadInput.click());
els.imageUploadInput.addEventListener('change', () => {
  loadImageFile(els.imageUploadInput.files[0]);
  els.imageUploadInput.value = '';
});
els.composer.addEventListener('dragover', (event) => { event.preventDefault(); els.composer.classList.add('drag-over'); });
els.composer.addEventListener('dragleave', () => els.composer.classList.remove('drag-over'));
els.composer.addEventListener('drop', (event) => {
  event.preventDefault();
  els.composer.classList.remove('drag-over');
  loadImageFile([...event.dataTransfer.files].find((file) => file.type.startsWith('image/')));
});
els.prompt.addEventListener('paste', (event) => {
  const imageItem = [...event.clipboardData.items].find((item) => item.type.startsWith('image/'));
  if (imageItem) {
    event.preventDefault();
    loadImageFile(imageItem.getAsFile());
  }
});
els.removeAttachment.addEventListener('click', clearAttachment);
els.closeDialog.addEventListener('click', () => els.dialog.close());
els.openPermissions.addEventListener('click', () => window.retro.openScreenPermissions());
els.modelSelect.addEventListener('change', () => {
  const profile = isGroupChat ? null : profileById(currentProfileId());
  if (profile && profile.model !== els.modelSelect.value) {
    profile.model = els.modelSelect.value;
    profile.updatedAt = new Date().toISOString();
  }
  updateModelCaption();
  if (!history.length) renderEmptyChat();
  llmConnection.preferredModel = els.modelSelect.value;
  markCurrentChatRead();
  persistState(profile ? ['profiles', 'connection'] : ['connection']).catch(() => {});
});
window.addEventListener('focus', markCurrentChatRead);

window.retro.onStateChanged((state, changedSections) => {
  if (changedSections.includes('profiles') && Array.isArray(state?.profiles)) {
    profiles = safeAiProfiles(state.profiles);
    activateAssistantProfile(selectedModelName());
    applyProfilePicture('buddy', selectedModelPicture());
    applyNames();
  }
  if (changedSections.includes('sessions') && Array.isArray(state?.sessions)) sessions = state.sessions.slice(0, 200);
  if (changedSections.includes('chatArchives') && Array.isArray(state?.chatArchives)) chatArchives = state.chatArchives.slice(0, 200);
  if (changedSections.includes('groups') && Array.isArray(state?.groups)) groups = state.groups.slice(0, 100);
  if (changedSections.includes('userProfile')) userProfile = safeUserProfile(state?.userProfile);
  if (changedSections.includes('configuration')) {
    const next = state?.configuration || {};
    assistantProfiles = normalizedAssistantProfiles(next, selectedModelName());
    activateAssistantProfile(selectedModelName());
  }
  if (changedSections.includes('preferences')) {
    const next = state?.preferences || {};
    userPreferences = {
      userName: safeName(next.userName, 'You'), buddyName: safeName(next.buddyName, 'Desktop Helper'),
      modelAliases: safeModelAliases(next.modelAliases),
      modelPictures: safeModelPictures(next.modelPictures),
      hiddenModels: safeHiddenModels(next.hiddenModels),
      modelProfileIds: safeModelProfileIds(next.modelProfileIds),
      deletedProfileIds: safeStringList(next.deletedProfileIds),
      deletedGroupIds: safeStringList(next.deletedGroupIds),
      deletedGroupKeys: safeStringList(next.deletedGroupKeys),
      profileMigrationComplete: Boolean(next.profileMigrationComplete) || Number(state?.version) >= 3,
      chatSplitPercent: safeChatSplitPercent(next.chatSplitPercent),
      theme: next.theme === 'dark' ? 'dark' : 'light',
      fontSize: ['50', '100', '125'].includes(String(next.fontSize)) ? String(next.fontSize) : '100',
      userPicture: safePicture(next.userPicture), setupComplete: Boolean(next.setupComplete), onboardingComplete: Boolean(next.onboardingComplete),
    };
    const legacyPicture = safePicture(next.buddyPicture);
    if (!Object.keys(userPreferences.modelPictures).length && legacyPicture) userPreferences.modelPictures[selectedModelName()] = legacyPicture;
    userName = userPreferences.userName; buddyName = userPreferences.buddyName;
    applyTheme(userPreferences.theme, false); applyFontSize(userPreferences.fontSize, false);
    applyChatSplit(userPreferences.chatSplitPercent, false);
    applyProfilePicture('buddy', selectedModelPicture()); applyProfilePicture('user', userPreferences.userPicture); applyNames();
  }
  if (changedSections.includes('connection')) {
    const next = state?.connection || {};
    llmConnection = { provider: next.provider === 'openai' ? 'openai' : 'ollama', baseUrl: next.baseUrl || 'http://127.0.0.1:11434', preferredModel: next.preferredModel || 'qwen3.6:latest', timeoutSeconds: Number(next.timeoutSeconds) || 120, keepAlive: next.keepAlive || '10m', visionEnabled: Boolean(next.visionEnabled) };
    loadModels();
  }
});
window.retro.onConnectionStatusChanged((state) => {
  applyConnectionStatus(state?.online);
  if (state?.online) loadModels();
});
window.retro.onChatChunk((chunk) => {
  if (!chunk || chunk.requestId !== activeStreamRequestId || typeof chunk.content !== 'string') return;
  activeStreamRawContent += chunk.content;
  updateStreamingMessage(activeStreamArticle, cleanAssistantFormatting(activeStreamRawContent));
});
window.retro.onStopAllChats(() => {
  if (!activeGenerationModel && els.stop.classList.contains('hidden')) return;
  generationStopped = true;
  activeGenerationModel = '';
  els.stop.disabled = true;
  setStatus('offline', 'Generation stopped by Stop All');
});

async function initializeApp() {
  const legacyPreferences = readLegacyPreferences();
  try {
    const state = await requestVaultUnlock();
    profiles = safeAiProfiles(state?.profiles);
    sessions = Array.isArray(state?.sessions) ? state.sessions.slice(0, 200) : [];
    chatArchives = Array.isArray(state?.chatArchives) ? state.chatArchives.slice(0, 200) : [];
    groups = Array.isArray(state?.groups) ? state.groups.slice(0, 100) : [];
    userProfile = safeUserProfile(state?.userProfile);
    const connection = state?.connection || {};
    llmConnection = {
      provider: connection.provider === 'openai' ? 'openai' : 'ollama',
      baseUrl: typeof connection.baseUrl === 'string' && connection.baseUrl ? connection.baseUrl : 'http://127.0.0.1:11434',
      preferredModel: typeof connection.preferredModel === 'string' ? connection.preferredModel : 'qwen3.6:latest',
      timeoutSeconds: Number(connection.timeoutSeconds) || 120,
      keepAlive: typeof connection.keepAlive === 'string' && connection.keepAlive ? connection.keepAlive : '10m',
      visionEnabled: Boolean(connection.visionEnabled),
    };
    const configuration = state?.configuration || {};
    const configurationHadProfiles = configuration.profiles && typeof configuration.profiles === 'object' && Object.keys(configuration.profiles).length;
    const configurationNeedsMigration = !configurationHadProfiles && hasAssistantCustomization(configuration.legacy || configuration);
    assistantProfiles = normalizedAssistantProfiles(configuration, requestedWindowModel || llmConnection.preferredModel);
    activateAssistantProfile(requestedWindowModel || llmConnection.preferredModel);
    const storedPreferences = state?.preferences && typeof state.preferences === 'object' ? state.preferences : {};
    const preferences = { ...(legacyPreferences || {}), ...storedPreferences };
    userPreferences = {
      userName: safeName(preferences.userName, 'You'),
      buddyName: safeName(preferences.buddyName, 'Desktop Helper'),
      modelAliases: safeModelAliases(preferences.modelAliases),
      modelPictures: safeModelPictures(preferences.modelPictures),
      hiddenModels: safeHiddenModels(preferences.hiddenModels),
      modelProfileIds: safeModelProfileIds(preferences.modelProfileIds),
      deletedProfileIds: safeStringList(preferences.deletedProfileIds),
      deletedGroupIds: safeStringList(preferences.deletedGroupIds),
      deletedGroupKeys: safeStringList(preferences.deletedGroupKeys),
      profileMigrationComplete: Boolean(preferences.profileMigrationComplete) || Number(state?.version) >= 3,
      chatSplitPercent: safeChatSplitPercent(preferences.chatSplitPercent),
      theme: preferences.theme === 'dark' ? 'dark' : 'light',
      fontSize: ['50', '100', '125'].includes(String(preferences.fontSize)) ? String(preferences.fontSize) : '100',
      userPicture: safePicture(preferences.userPicture),
      setupComplete: Boolean(preferences.setupComplete),
      onboardingComplete: Boolean(preferences.onboardingComplete) || (Boolean(preferences.setupComplete) && safeName(preferences.userName, 'You') !== 'You'),
    };
    const legacyPicture = safePicture(preferences.buddyPicture);
    if (!Object.keys(userPreferences.modelPictures).length && legacyPicture) userPreferences.modelPictures[llmConnection.preferredModel] = legacyPicture;
    userName = userPreferences.userName;
    buddyName = userPreferences.buddyName;
    applyTheme(userPreferences.theme, false);
    applyFontSize(userPreferences.fontSize, false);
    applyChatSplit(userPreferences.chatSplitPercent, false);
    applyProfilePicture('buddy', selectedModelPicture());
    applyProfilePicture('user', userPreferences.userPicture);
    applyNames();
    const secretStatus = await window.retro.secretStatus();
    apiKeyStored = Boolean(secretStatus.apiKeyStored);
    const migratedSections = [];
    if (legacyPreferences || legacyPicture) migratedSections.push('preferences');
    if (configurationNeedsMigration) migratedSections.push('configuration');
    if (migratedSections.length) await persistState(migratedSections);
    if (legacyPreferences) clearLegacyPreferences();
  } catch (error) {
    renderEmptyChat(`The local chat cache could not be loaded: ${error.message}`);
  }
  try {
    applyConnectionStatus((await window.retro.getConnectionStatus()).online);
  } catch (error) {
    reportBackgroundError('Could not check local model connection', error);
    applyConnectionStatus(false);
  }
  if (appOnline) await loadModels();
  restoreLatestConversation();
  if (!userPreferences.setupComplete && !requestedWindowModel) openSetupGuide();
}

initializeApp();
