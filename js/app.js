// app.js - Main application logic
import i18n from './i18n.js';
import { loadContent } from './content-loader.js';

// Detect user's preferred language
function detectLanguage() {
  // 1. Check localStorage
  const stored = localStorage.getItem('preferredLanguage');
  if (stored && ['en', 'zh-TW', 'zh-CN', 'th'].includes(stored)) {
    return stored;
  }

  // 2. Check browser language
  const browserLang = navigator.language || navigator.languages?.[0] || '';

  if (browserLang.startsWith('en')) return 'en';
  if (browserLang === 'zh-TW' || browserLang.startsWith('zh-Hant')) return 'zh-TW';
  if (browserLang === 'zh-CN' || browserLang.startsWith('zh-Hans')) return 'zh-CN';
  if (browserLang.startsWith('th')) return 'th';

  // 3. Default to Traditional Chinese
  return 'zh-TW';
}

// Render content for selected language
function renderContent(lang) {
  // Update html lang attribute
  document.documentElement.lang = lang;

  // Update simple text elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n.t(key, lang);
  });

  // Render framework features - Dark theme cards
  const featuresContainer = document.getElementById('framework-features-list');
  const features = i18n.t('frameworkFeatures', lang);
  featuresContainer.innerHTML = features.items.map((item, index) => `
    <div class="bg-moonote-dark-card/50 backdrop-blur-sm rounded-xl p-6 border border-moonote-cyan/10 card-glow fade-in" style="transition-delay: ${index * 100}ms;">
      <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-moonote-cyan/20 to-moonote-purple/20 flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-moonote-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-2 text-white">${item.name}</h3>
      <p class="text-gray-400">${item.description}</p>
    </div>
  `).join('');

  // Render functional modules - Dark theme cards
  const modulesContainer = document.getElementById('functional-modules-list');
  const modules = i18n.t('functionalModules', lang);
  modulesContainer.innerHTML = modules.modules.map((module, index) => `
    <div class="bg-moonote-dark-card/50 backdrop-blur-sm rounded-xl p-6 border border-moonote-purple/10 card-glow fade-in" style="transition-delay: ${index * 100}ms;">
      <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-moonote-purple/20 to-moonote-magenta/20 flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-moonote-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-2 text-white">${module.name}</h3>
      <p class="text-gray-400 mb-4">${module.description}</p>
      <ul class="space-y-2">
        ${module.capabilities.map(cap => `
          <li class="flex items-center gap-2 text-gray-300">
            <span class="w-1.5 h-1.5 rounded-full bg-moonote-cyan"></span>
            ${cap}
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');

  // Render industry solutions - Dark theme cards
  const solutionsContainer = document.getElementById('industry-solutions-list');
  const solutions = i18n.t('industrySolutions', lang);
  solutionsContainer.innerHTML = solutions.solutions.map((solution, index) => `
    <div class="bg-moonote-dark-card/50 backdrop-blur-sm rounded-xl p-6 border border-moonote-cyan/10 card-glow fade-in" style="transition-delay: ${index * 100}ms;">
      <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-moonote-cyan/20 to-moonote-purple/20 flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-moonote-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-4 text-white">${solution.name}</h3>
      <div class="mb-4">
        <p class="font-semibold text-moonote-cyan text-sm mb-2">Modules:</p>
        <div class="flex flex-wrap gap-2">
          ${solution.modules.map(m => `
            <span class="px-2 py-1 bg-moonote-cyan/10 text-moonote-cyan text-xs rounded-full">${m}</span>
          `).join('')}
        </div>
      </div>
      <div>
        <p class="font-semibold text-moonote-purple text-sm mb-2">Target Industries:</p>
        <div class="flex flex-wrap gap-2">
          ${solution.industries.map(ind => `
            <span class="px-2 py-1 bg-moonote-purple/10 text-moonote-purple text-xs rounded-full">${ind}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Render technical capabilities - Dark theme list
  const techContainer = document.getElementById('technical-capabilities-list');
  const techCaps = i18n.t('technicalCapabilities', lang);
  techContainer.innerHTML = techCaps.items.map((item, index) => `
    <li class="flex items-start gap-3 text-gray-300 fade-in" style="transition-delay: ${index * 50}ms;">
      <span class="w-6 h-6 rounded-full bg-moonote-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-3 h-3 text-moonote-cyan" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </span>
      <span>${item}</span>
    </li>
  `).join('');

  // Render development efficiency - Dark theme list
  const devEffContainer = document.getElementById('development-efficiency-list');
  const devEff = i18n.t('developmentEfficiency', lang);
  devEffContainer.innerHTML = devEff.items.map((item, index) => `
    <li class="flex items-start gap-3 text-gray-300 fade-in" style="transition-delay: ${index * 50}ms;">
      <span class="w-6 h-6 rounded-full bg-moonote-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-3 h-3 text-moonote-purple" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </span>
      <span>${item}</span>
    </li>
  `).join('');

  // Render commitments - Dark theme cards with accent border
  const commitmentsContainer = document.getElementById('commitments-list');
  const commitments = i18n.t('commitments', lang);
  commitmentsContainer.innerHTML = commitments.items.map((item, index) => `
    <div class="bg-moonote-dark-card/50 backdrop-blur-sm p-6 rounded-xl border-l-4 border-moonote-cyan card-glow fade-in" style="transition-delay: ${index * 100}ms;">
      <h3 class="text-lg font-bold mb-2 text-white">${item.title}</h3>
      <p class="text-gray-400">${item.description}</p>
    </div>
  `).join('');

  // Update active language button
  updateActiveLanguageButton(lang);

  // Trigger fade-in animations after content is rendered
  requestAnimationFrame(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('visible');
    });
  });
}

// Update active language button styling - Dark theme
function updateActiveLanguageButton(lang) {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('bg-gradient-to-r', 'from-moonote-cyan', 'to-moonote-purple', 'text-white');
      btn.classList.remove('bg-moonote-dark-card', 'text-gray-400', 'hover:bg-moonote-dark-secondary');
    } else {
      btn.classList.remove('bg-gradient-to-r', 'from-moonote-cyan', 'to-moonote-purple', 'text-white');
      btn.classList.add('bg-moonote-dark-card', 'text-gray-400', 'hover:bg-moonote-dark-secondary');
    }
  });
}

// Initialize language toggle UI - Dark theme
function initLanguageToggle() {
  const toggleContainer = document.getElementById('language-toggle');
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'zh-TW', label: '繁' },
    { code: 'zh-CN', label: '简' },
    { code: 'th', label: 'ไทย' }
  ];

  toggleContainer.innerHTML = languages.map(lang => `
    <button
      data-lang="${lang.code}"
      class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 bg-moonote-dark-card text-gray-400 hover:bg-moonote-dark-secondary"
      aria-label="Switch to ${lang.label}"
    >
      ${lang.label}
    </button>
  `).join('');

  // Attach click handlers
  toggleContainer.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = btn.getAttribute('data-lang');
      i18n.setLanguage(newLang);
      renderContent(newLang);
    });
  });
}

// Initialize application
async function init() {
  try {
    // Load content
    const contentData = await loadContent();
    i18n.load(contentData);

    // Detect and set language
    const initialLang = detectLanguage();
    i18n.setLanguage(initialLang);

    // Initialize language toggle
    initLanguageToggle();

    // Render initial content
    renderContent(initialLang);

    console.log('✓ Moonote website initialized successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    document.body.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-moonote-dark">
        <div class="bg-moonote-dark-card p-8 rounded-2xl border border-red-500/30 max-w-md">
          <h1 class="text-2xl font-bold text-red-400 mb-4">Error Loading Content</h1>
          <p class="text-gray-300 mb-4">Unable to load website content. Please try refreshing the page.</p>
          <p class="text-sm text-gray-500">Error: ${error.message}</p>
        </div>
      </div>
    `;
  }
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
