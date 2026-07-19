<?php
require __DIR__ . '/config.php';

function e($value) {
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

$highlights = [
    'Create a team in minutes: pick models, name each assistant, and give each one a job.',
    'Build custom personalities for marketing, analytics, OCR, image generation, writing, and review.',
    'Use an OCR assistant to extract text from images, screenshots, scanned notes, and documents.',
    'Send extracted text and files into the group chat so the whole team can analyze the work together.',
];

$shots = [
    [
        'src' => 'assets/product/main-contact-list.png',
        'title' => 'Create your AI team',
        'copy' => 'Add assistants like Marketing, Analytics, OCR, Image Generator, Writer, and Reviewer as simple contacts.',
    ],
    [
        'src' => 'assets/product/one-to-one-chat.png',
        'title' => 'Give each one a personality',
        'copy' => 'Set the assistant’s tone, role, background, skills, and instructions so it behaves the way you want.',
    ],
    [
        'src' => 'assets/product/focused-attached-poem.png',
        'title' => 'Extract text from files',
        'copy' => 'Ask an OCR model to read an image or document, then pass the extracted text back to the group.',
    ],
    [
        'src' => 'assets/product/focused-delegation-plan.png',
        'title' => 'Analyze as a group',
        'copy' => 'Let marketing, analytics, research, and review assistants discuss the same source material in one place.',
    ],
    [
        'src' => 'assets/product/focused-final-explanation.png',
        'title' => 'Get one useful result',
        'copy' => 'Keep the workflow in one chat and let each assistant contribute its part before you decide what to use.',
    ],
];

$uses = [
    'Marketing team: strategist, copywriter, SEO helper, campaign reviewer, and brand voice assistant.',
    'Analytics team: data analyst, business reviewer, chart explainer, and decision support assistant.',
    'Document team: OCR model extracts text from images, scanned pages, receipts, forms, and notes.',
    'Creative team: image generation assistant, prompt writer, editor, and visual direction reviewer.',
    'Project team: Chief of Staff breaks the goal into steps and assigns specialists in the group chat.',
    'Learning team: tutor, explainer, critic, and summarizer compare answers in plain language.',
];
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($site['name']); ?> - <?= e($site['tagline']); ?></title>
    <meta name="description" content="<?= e($site['description']); ?>">
    <meta property="og:title" content="<?= e($site['name']); ?> - Local AI in a Messenger Window">
    <meta property="og:description" content="<?= e($site['description']); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= e($site['site_url']); ?>">
    <meta property="og:image" content="<?= e($site['site_url']); ?>/assets/product/focused-final-explanation.png">
    <link rel="canonical" href="<?= e($site['site_url']); ?>">
    <link rel="icon" type="image/png" href="assets/ai-messenger-1024.png">
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="site-header">
        <a class="brand" href="#top" aria-label="<?= e($site['name']); ?> home">
            <img src="assets/ai-messenger-1024.png" alt="" width="38" height="38">
            <span><?= e($site['name']); ?></span>
        </a>
        <nav class="site-nav" aria-label="Main navigation">
            <a href="#screenshots">Screenshots</a>
            <a href="<?= e($site['docs_url']); ?>">Docs</a>
            <a href="<?= e($site['github_url']); ?>">GitHub</a>
            <a class="nav-download" href="<?= e($site['download_url']); ?>">Download</a>
        </nav>
    </header>

    <main id="main">
        <section class="hero" id="top">
            <div class="hero-copy">
                <p class="eyebrow">Local AI, old-school messenger vibes</p>
                <h1><?= e($site['tagline']); ?></h1>
                <p class="lede">AI Messenger is a simple desktop app that turns local AI models into a team of custom assistants. Make a marketing helper, analytics helper, OCR reader, image generator, writer, or reviewer, then bring them together in one group chat.</p>
                <div class="actions">
                    <a class="button primary" href="<?= e($site['download_url']); ?>">Download on GitHub</a>
                    <a class="button secondary" href="<?= e($site['github_url']); ?>">View project</a>
                </div>
                <p class="fine-print">Built for Ollama and compatible local AI servers. Models are not included.</p>
            </div>
            <figure class="hero-shot">
                <img src="assets/product/focused-final-explanation.png" alt="AI Messenger showing a focused group chat where assistants coordinate and explain a task.">
            </figure>
        </section>

        <section class="quick-note">
            <h2>Make a practical team of AI personalities.</h2>
            <div class="highlight-list">
                <?php foreach ($highlights as $highlight): ?>
                    <p><?= e($highlight); ?></p>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="applications">
            <div class="section-heading">
                <p class="eyebrow">Real applications</p>
                <h2>Marketing, analytics, OCR, image generation, and more.</h2>
            </div>
            <div class="use-grid">
                <?php foreach ($uses as $use): ?>
                    <p><?= e($use); ?></p>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="screenshots" id="screenshots">
            <div class="section-heading">
                <p class="eyebrow">Product tour</p>
                <h2>Simple setup. Real applications.</h2>
            </div>
            <div class="shot-grid">
                <?php foreach ($shots as $shot): ?>
                    <article class="shot-card">
                        <img src="<?= e($shot['src']); ?>" alt="<?= e($shot['title']); ?> screenshot.">
                        <div>
                            <h3><?= e($shot['title']); ?></h3>
                            <p><?= e($shot['copy']); ?></p>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="privacy">
            <div>
                <p class="eyebrow">Local-first</p>
                <h2>No cloud account. No ads. No telemetry.</h2>
            </div>
            <p>AI Messenger is an interface for your local model server. Your profiles, chat history, and settings stay on your device, and attached files are sent to the model endpoint you configure.</p>
        </section>

        <section class="support">
            <div>
                <p class="eyebrow">Support the project</p>
                <h2>Enjoying AI Messenger?</h2>
                <p>Buy me a coffee to support development, testing, and future local AI experiments.</p>
                <a class="button secondary" href="<?= e($site['coffee_url']); ?>">Open Buy Me a Coffee</a>
                <p class="copy-url">
                    <span>Copy or paste:</span>
                    <a href="<?= e($site['coffee_url']); ?>"><?= e($site['coffee_url']); ?></a>
                </p>
            </div>
            <a class="qr-card" href="<?= e($site['coffee_url']); ?>" aria-label="Open Buy Me a Coffee">
                <img src="assets/buy-me-a-coffee-qr.png" alt="QR code for Buy Me a Coffee support page.">
            </a>
        </section>

        <section class="download" id="download">
            <img src="assets/ai-messenger-1024.png" alt="" width="72" height="72">
            <h2>Ready to try it?</h2>
            <p>Download the latest release from GitHub, connect Ollama, and start building your AI buddy list.</p>
            <div class="actions">
                <a class="button primary" href="<?= e($site['download_url']); ?>">Download latest release</a>
                <a class="button secondary" href="<?= e($site['docs_url']); ?>">Read setup guide</a>
            </div>
            <small>Review the terms and PolyForm Noncommercial license before installing.</small>
        </section>
    </main>

    <footer class="site-footer">
        <span>&copy; <?= e($site['year']); ?> <?= e($site['name']); ?></span>
        <div>
            <a href="<?= e($site['github_url']); ?>">GitHub</a>
            <a href="<?= e($site['docs_url']); ?>">Docs</a>
            <a href="<?= e($site['terms_url']); ?>">Terms</a>
            <a href="<?= e($site['license_url']); ?>">License</a>
            <a href="<?= e($site['coffee_url']); ?>">Buy me a coffee</a>
            <a href="mailto:<?= e($site['contact_email']); ?>">Contact</a>
        </div>
    </footer>
</body>
</html>
