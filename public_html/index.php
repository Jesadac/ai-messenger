<?php
require __DIR__ . '/config.php';

function e($value) {
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

$assistantRoles = [
    'Software Engineer',
    'UX Designer',
    'Product Manager',
    'Business Analyst',
    'Marketing Manager',
    'Technical Writer',
    'Teacher',
    'Research Assistant',
    'Data Analyst',
    'Legal Reviewer',
    'OCR Specialist',
    'Translator',
];

$teams = [
    [
        'name' => 'Product Development',
        'copy' => 'Discuss features, review requirements, debate approaches, identify risks, and produce polished documentation without constantly switching chats.',
        'roles' => ['Product Manager', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'QA Engineer', 'Security Reviewer'],
    ],
    [
        'name' => 'Software Development',
        'copy' => 'Create specialists for architecture, implementation, reviews, security, operations, and documentation.',
        'roles' => ['Senior Architect', 'Full Stack Developer', 'Database Engineer', 'DevOps Engineer', 'Security Analyst', 'Code Reviewer'],
    ],
    [
        'name' => 'Research',
        'copy' => 'Gather multiple perspectives before reaching a conclusion with assistants for analysis, fact checking, writing, and review.',
        'roles' => ['Research Assistant', 'Statistician', 'Fact Checker', 'Academic Writer', 'Critical Reviewer'],
    ],
    [
        'name' => 'Content Studio',
        'copy' => 'Develop campaigns, refine articles, compare creative directions, and prepare publishing-ready copy.',
        'roles' => ['Copywriter', 'Editor', 'SEO Specialist', 'Brand Strategist', 'Social Media Manager'],
    ],
    [
        'name' => 'Document Processing',
        'copy' => 'Upload contracts, invoices, scanned documents, handwritten notes, or reports and route them to the right specialist.',
        'roles' => ['OCR Assistant', 'Data Validator', 'Financial Reviewer', 'Legal Assistant', 'Technical Writer'],
    ],
    [
        'name' => 'Personal Productivity',
        'copy' => 'Keep dedicated assistants for everyday planning, travel, meals, budgeting, home projects, and shopping.',
        'roles' => ['Daily Planner', 'Travel Advisor', 'Meal Planner', 'Budget Assistant', 'Project Manager'],
    ],
];

$features = [
    'Individual conversations',
    'Collaborative group chats',
    'Multiple windows and docked chats',
    'Image uploads and desktop snapshots',
    'OCR and vision model workflows',
    'Persistent encrypted local history',
    'Assistant suspension to reduce resource use',
    'Ollama and OpenAI-compatible local servers',
];

$profileFields = [
    'Display name',
    'Avatar',
    'Personality',
    'Tone',
    'Background',
    'Skills',
    'Instructions',
    'Preferred language',
    'Model assignment',
    'Conversation history',
];
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($site['name']); ?> - <?= e($site['tagline']); ?></title>
    <meta name="description" content="<?= e($site['description']); ?>">
    <meta property="og:title" content="<?= e($site['name']); ?> - Local AI Teams">
    <meta property="og:description" content="<?= e($site['description']); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= e($site['site_url']); ?>">
    <meta property="og:image" content="<?= e($site['site_url']); ?>/assets/ai-messenger-1024.png">
    <link rel="canonical" href="<?= e($site['site_url']); ?>">
    <link rel="icon" type="image/png" href="assets/ai-messenger-1024.png">
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="site-header" data-header>
        <a class="brand" href="#top" aria-label="<?= e($site['name']); ?> home">
            <img src="assets/ai-messenger-1024.png" alt="" width="40" height="40">
            <span><?= e($site['name']); ?></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
            <span></span>
            <span></span>
            <span></span>
            <span class="sr-only">Menu</span>
        </button>
        <nav class="site-nav" id="site-nav" data-nav>
            <a href="#teams">Use Cases</a>
            <a href="#profiles">Profiles</a>
            <a href="#privacy">Privacy</a>
            <a href="#download">Download</a>
            <a class="nav-github" href="<?= e($site['github_url']); ?>">GitHub</a>
        </nav>
    </header>

    <main id="main">
        <section class="hero" id="top">
            <div class="hero-content">
                <p class="eyebrow">Built for Ollama and compatible local AI servers</p>
                <h1><?= e($site['tagline']); ?></h1>
                <p class="hero-copy">
                    AI Messenger transforms locally running AI models into a familiar desktop messaging experience.
                    Build personalized AI assistants, create collaborative teams, and keep your conversations on your own computer.
                </p>
                <div class="hero-actions">
                    <a class="button primary" href="<?= e($site['download_url']); ?>">Download from GitHub</a>
                    <a class="button secondary" href="<?= e($site['github_url']); ?>">View GitHub</a>
                    <a class="button ghost" href="<?= e($site['docs_url']); ?>">Documentation</a>
                </div>
            </div>
            <div class="messenger-panel" aria-label="AI Messenger preview">
                <div class="window-bar">
                    <span></span>
                    <strong>AI Team</strong>
                    <small>Local</small>
                </div>
                <div class="contact-list">
                    <div class="contact online">
                        <span>PM</span>
                        <div><strong>Product Manager</strong><small>Online</small></div>
                    </div>
                    <div class="contact online">
                        <span>UX</span>
                        <div><strong>UX Designer</strong><small>Reviewing flow</small></div>
                    </div>
                    <div class="contact idle">
                        <span>QA</span>
                        <div><strong>QA Engineer</strong><small>Suspended</small></div>
                    </div>
                </div>
                <div class="chat-card">
                    <p><strong>You</strong> @Product Manager, help turn this app idea into a launch plan.</p>
                    <p><strong>Product Manager</strong> I will coordinate requirements, risks, release notes, and next actions.</p>
                    <p><strong>UX Designer</strong> I can review onboarding and suggest a simpler first-run experience.</p>
                </div>
            </div>
        </section>

        <section class="section split">
            <div>
                <p class="eyebrow">A better way to use local AI</p>
                <h2>One assistant is helpful. A team is more powerful.</h2>
            </div>
            <div class="body-copy">
                <p>Most AI apps revolve around one conversation with one model. Real work rarely happens that way.</p>
                <p>AI Messenger lets each assistant have its own role, personality, instructions, skills, and history. Invite them into a shared conversation where they collaborate, compare viewpoints, divide work, and contribute their expertise while you stay in control.</p>
            </div>
        </section>

        <section class="section roles">
            <div class="section-heading">
                <p class="eyebrow">Specialized assistants</p>
                <h2>Build the workflow that fits your task.</h2>
            </div>
            <div class="role-cloud">
                <?php foreach ($assistantRoles as $role): ?>
                    <span><?= e($role); ?></span>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section teams" id="teams">
            <div class="section-heading">
                <p class="eyebrow">Use cases</p>
                <h2>Build teams for any task.</h2>
            </div>
            <div class="team-grid">
                <?php foreach ($teams as $team): ?>
                    <article class="team-card">
                        <h3><?= e($team['name']); ?></h3>
                        <p><?= e($team['copy']); ?></p>
                        <div class="mini-tags">
                            <?php foreach ($team['roles'] as $role): ?>
                                <span><?= e($role); ?></span>
                            <?php endforeach; ?>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section profile-section" id="profiles">
            <div class="profile-copy">
                <p class="eyebrow">Persistent AI profiles</p>
                <h2>The same model can become many different assistants.</h2>
                <p>Every assistant keeps its own identity, role, settings, model assignment, and conversation history. Create a teacher, researcher, developer, reviewer, or coach without mixing their instructions together.</p>
            </div>
            <div class="profile-grid">
                <?php foreach ($profileFields as $field): ?>
                    <span><?= e($field); ?></span>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section feature-band">
            <div class="section-heading">
                <p class="eyebrow">Built for real work</p>
                <h2>Desktop workflows for local AI.</h2>
            </div>
            <div class="feature-grid">
                <?php foreach ($features as $feature): ?>
                    <div class="feature-item"><?= e($feature); ?></div>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section privacy" id="privacy">
            <div>
                <p class="eyebrow">Privacy comes first</p>
                <h2>Your AI should work for you.</h2>
            </div>
            <div class="privacy-list">
                <p>AI Messenger is local-first. It is an interface layer for your local model server, not a hosted AI service.</p>
                <ul>
                    <li>No subscriptions</li>
                    <li>No cloud accounts</li>
                    <li>No advertising</li>
                    <li>No analytics or telemetry</li>
                    <li>No hidden tracking</li>
                    <li>Conversations remain on your computer</li>
                </ul>
            </div>
        </section>

        <section class="download" id="download">
            <div class="download-card">
                <p class="eyebrow">Source available</p>
                <h2>Ready to build your AI team?</h2>
                <p>Download AI Messenger from GitHub, create your first assistants, and see what happens when specialized local AI profiles work together like a real team.</p>
                <div class="hero-actions">
                    <a class="button primary" href="<?= e($site['download_url']); ?>">Download latest release</a>
                    <a class="button secondary" href="<?= e($site['github_url']); ?>">View source on GitHub</a>
                    <a class="button ghost" href="<?= e($site['docs_url']); ?>">Read documentation</a>
                </div>
                <small>AI Messenger requires Ollama or another compatible local AI server. Models are not included. Review the terms and PolyForm Noncommercial license before installing.</small>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <span>&copy; <?= e($site['year']); ?> <?= e($site['name']); ?></span>
        <div>
            <a href="<?= e($site['github_url']); ?>">GitHub</a>
            <a href="<?= e($site['docs_url']); ?>">Docs</a>
            <a href="<?= e($site['terms_url']); ?>">Terms</a>
            <a href="<?= e($site['license_url']); ?>">License</a>
            <a href="mailto:<?= e($site['contact_email']); ?>">Contact</a>
        </div>
    </footer>

    <script src="assets/script.js"></script>
</body>
</html>
