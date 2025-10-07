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

  // Render framework features
  const featuresContainer = document.getElementById('framework-features-list');
  const features = i18n.t('frameworkFeatures', lang);
  featuresContainer.innerHTML = features.items.map(item => `
    <div class="bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-bold mb-2 text-gray-900">${item.name}</h3>
      <p class="text-gray-700">${item.description}</p>
    </div>
  `).join('');

  // Render functional modules
  const modulesContainer = document.getElementById('functional-modules-list');
  const modules = i18n.t('functionalModules', lang);
  modulesContainer.innerHTML = modules.modules.map(module => `
    <div class="bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-bold mb-2 text-gray-900">${module.name}</h3>
      <p class="text-gray-700 mb-3">${module.description}</p>
      <ul class="list-disc list-inside text-gray-600 space-y-1">
        ${module.capabilities.map(cap => `<li>${cap}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Render industry solutions
  const solutionsContainer = document.getElementById('industry-solutions-list');
  const solutions = i18n.t('industrySolutions', lang);
  solutionsContainer.innerHTML = solutions.solutions.map(solution => `
    <div class="border border-gray-200 rounded-lg p-6">
      <h3 class="text-xl font-bold mb-3 text-gray-900">${solution.name}</h3>
      <div class="mb-3">
        <p class="font-semibold text-gray-700 mb-1">Modules:</p>
        <p class="text-gray-600">${solution.modules.join(', ')}</p>
      </div>
      <div>
        <p class="font-semibold text-gray-700 mb-1">Target Industries:</p>
        <p class="text-gray-600">${solution.industries.join(', ')}</p>
      </div>
    </div>
  `).join('');

  // Render technical capabilities
  const techContainer = document.getElementById('technical-capabilities-list');
  const techCaps = i18n.t('technicalCapabilities', lang);
  techContainer.innerHTML = techCaps.items.map(item => `
    <li class="text-gray-700 flex items-start">
      <span class="text-blue-600 mr-2">✓</span>
      <span>${item}</span>
    </li>
  `).join('');

  // Render development efficiency
  const devEffContainer = document.getElementById('development-efficiency-list');
  const devEff = i18n.t('developmentEfficiency', lang);
  devEffContainer.innerHTML = devEff.items.map(item => `
    <li class="text-gray-700 flex items-start">
      <span class="text-green-600 mr-2">▸</span>
      <span>${item}</span>
    </li>
  `).join('');

  // Render commitments
  const commitmentsContainer = document.getElementById('commitments-list');
  const commitments = i18n.t('commitments', lang);
  commitmentsContainer.innerHTML = commitments.items.map(item => `
    <div class="bg-white border-l-4 border-blue-500 p-6 rounded-r-lg shadow-md">
      <h3 class="text-lg font-bold mb-2 text-gray-900">${item.title}</h3>
      <p class="text-gray-700">${item.description}</p>
    </div>
  `).join('');

  // Update active language button
  updateActiveLanguageButton(lang);
}

// Update active language button styling
function updateActiveLanguageButton(lang) {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
    } else {
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
    }
  });
}

// Initialize language toggle UI
function initLanguageToggle() {
  const toggleContainer = document.getElementById('language-toggle');
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'zh-CN', label: '简体中文' },
    { code: 'th', label: 'ไทย' }
  ];

  toggleContainer.innerHTML = languages.map(lang => `
    <button
      data-lang="${lang.code}"
      class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
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
      <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h1 class="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h1>
          <p class="text-gray-700 mb-4">Unable to load website content. Please try refreshing the page.</p>
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
