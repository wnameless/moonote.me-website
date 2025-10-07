// i18n.js - Internationalization module
// Lightweight i18n with fallback support for 4 languages

const i18n = {
  translations: {},
  currentLang: 'zh-TW',

  /**
   * Load translations data
   * @param {Object} data - Translation data object with language keys
   */
  load(data) {
    this.translations = data;
  },

  /**
   * Get translation for a key with fallback chain
   * @param {string} key - Translation key (supports nested: "aboutUs.title")
   * @param {string} lang - Language code (optional, uses current if not specified)
   * @returns {string|Array|Object} - Translated value or key if not found
   */
  t(key, lang = this.currentLang) {
    // Traverse nested keys
    const getValue = (obj, path) => {
      return path.split('.').reduce((current, prop) => {
        return current?.[prop];
      }, obj);
    };

    // Try requested language
    let value = getValue(this.translations[lang], key);

    // Fallback to English if not found
    if (value === undefined && lang !== 'en') {
      value = getValue(this.translations['en'], key);
    }

    // Return key itself if still not found
    return value !== undefined ? value : key;
  },

  /**
   * Set current language and persist to localStorage
   * @param {string} lang - Language code (en, zh-TW, zh-CN, th)
   */
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('preferredLanguage', lang);
    }
  },

  /**
   * Get current language
   * @returns {string} - Current language code
   */
  getCurrentLanguage() {
    return this.currentLang;
  }
};

export default i18n;
