(function exposeModelGuide() {
  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    })[character]);
  }

  function formatBytes(value) {
    const bytes = Number(value) || 0;
    if (!bytes) return 'Unknown';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / (1024 ** unit)).toFixed(unit >= 3 ? 1 : 0)} ${units[unit]}`;
  }

  function guidanceFor(model) {
    const name = String(model.name || '').toLowerCase();
    const family = String(model.details?.family || '').toLowerCase();
    const capabilities = new Set(model.capabilities || []);
    if (name.includes('ocr') || family.includes('ocr')) {
      return {
        badge: 'OCR specialist',
        best: 'Reading text from images, scans, screenshots, receipts, and photographed documents.',
        avoid: 'Not recommended for maths, broad reasoning, planning, or general conversation. Use a general-purpose model instead.',
      };
    }
    if (name.includes('embed') || capabilities.has('embedding')) {
      return {
        badge: 'Embedding model',
        best: 'Semantic search, document matching, retrieval, clustering, and building knowledge indexes.',
        avoid: 'Not designed to hold conversations, solve maths problems, or write normal answers.',
      };
    }
    if (name.includes('code') || name.includes('coder') || family.includes('code')) {
      return {
        badge: 'Coding specialist',
        best: 'Programming, debugging, explaining code, refactoring, tests, scripts, and technical workflows.',
        avoid: 'May be less natural for creative conversation or specialist visual-document work.',
      };
    }
    if (capabilities.has('vision') || name.includes('vision') || name.includes('vl')) {
      return {
        badge: 'Vision + general',
        best: 'General conversation plus screenshots, photographs, diagrams, interface review, and visual document questions.',
        avoid: 'For exact OCR across large document batches, a dedicated OCR model may be faster and more reliable.',
      };
    }
    if (name.includes('deepseek-r1') || name.includes('qwen') || name.includes('gpt-oss')) {
      return {
        badge: 'Reasoning model',
        best: 'Maths, structured reasoning, coding, analysis, planning, and difficult multi-step questions.',
        avoid: 'Deep thinking can be slower. Use Fast mode for simple questions and routine chat.',
      };
    }
    return {
      badge: 'General purpose',
      best: 'Everyday questions, writing, summaries, brainstorming, planning, and general assistance.',
      avoid: 'Specialist OCR, embedding, or advanced visual tasks may be better handled by a purpose-built model.',
    };
  }

  function render(models) {
    if (!models.length) return '<p class="model-guide-intro">No installed models were found. Start Ollama and refresh this guide.</p>';
    const cards = models.map((model) => {
      const guidance = guidanceFor(model);
      const details = model.details || {};
      const metadata = [
        `${formatBytes(model.size)} on disk`,
        details.parameter_size || '',
        details.quantization_level || '',
        details.family || '',
        model.loadedSize ? `${formatBytes(model.loadedSize)} loaded${model.loadedVram ? ` · ${formatBytes(model.loadedVram)} accelerator memory` : ''}` : '',
      ].filter(Boolean).map(escapeHtml).join(' · ');
      const title = escapeHtml(model.name);
      return `<article class="model-guide-card"><h3>${title}<span class="model-guide-badge">${escapeHtml(guidance.badge)}</span></h3><div class="model-guide-meta">${metadata || 'Footprint information unavailable'}</div><p><strong>Best suited for:</strong> ${escapeHtml(guidance.best)}</p><p class="avoid"><strong>Avoid using it for:</strong> ${escapeHtml(guidance.avoid)}</p></article>`;
    }).join('');
    return `<p class="model-guide-intro">Footprint shows Ollama’s installed model size. Loaded memory is shown when Ollama reports it and can vary with context length and hardware. Suitability is a practical guide based on model family and capabilities.</p>${cards}`;
  }

  window.AiModelGuide = { render };
}());
