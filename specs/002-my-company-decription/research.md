# Research: Company Description & Services Page

**Feature**: 002-my-company-decription
**Date**: 2025-10-07

## Technology Decisions

### 1. Tailwind CSS Integration Strategy

**Decision**: Use Tailwind CSS via CDN for development, optional CLI build for production

**Rationale**:
- CDN approach is zero-config and fastest to start (meets Principle V: Developer Experience)
- No build tools required initially (meets Principle III: Zero-Config Deployment)
- CLI build for production provides smaller bundle via purging unused classes (meets Principle II: Edge-First Performance)
- Tailwind's utility-first approach supports rapid development and component reusability (meets Principle VI: Content-First Design)

**Alternatives Considered**:
- Full PostCSS/Webpack setup: Rejected - too complex for a simple SPA, violates zero-config principle
- Custom CSS only: Rejected - slower development, less maintainable, no built-in responsive utilities
- CSS framework like Bootstrap: Rejected - larger bundle size, opinionated components conflict with content-first design

**Implementation**:
- Development: Include Tailwind via CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- Production: Optional `tailwindcss` CLI with purge configuration to reduce bundle to ~10-20KB

---

### 2. Vanilla JS i18n Pattern

**Decision**: Custom lightweight i18n module using JSON lookup with fallback chain (requested lang → English)

**Rationale**:
- Zero dependencies keeps JS bundle minimal (<5KB for i18n logic)
- Full control over fallback behavior and missing translation handling
- Meets 100KB JS budget easily (NFR-003)
- Simple to understand and maintain for future content editors

**Alternatives Considered**:
- i18next library: Rejected - 50KB+ minified, overkill for static content translation
- Template literals only: Rejected - no structure for handling missing translations or fallbacks
- Server-side i18n: Rejected - violates static-first architecture principle

**Implementation**:
```javascript
// i18n.js module
const i18n = {
  currentLang: 'zh-TW',
  translations: {},

  async load(data) {
    this.translations = data;
  },

  t(key, lang = this.currentLang) {
    // Traverse nested keys: "aboutUs.title"
    const value = key.split('.').reduce((obj, k) => obj?.[k], this.translations[lang]);
    // Fallback to English if missing
    return value || key.split('.').reduce((obj, k) => obj?.[k], this.translations['en']) || key;
  },

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
  }
};
```

---

### 3. Multi-Language JSON Structure

**Decision**: Nested JSON object with language codes as top-level keys: `{ "en": {...}, "zh-TW": {...}, "zh-CN": {...}, "th": {...} }`

**Rationale**:
- Single file simplifies content editing and ensures translation completeness
- Shared key structure makes it easy to identify missing translations
- Supports partial translations with automatic fallback to English
- Version-controlled alongside code (meets Principle VII)

**Alternatives Considered**:
- Separate files per language (en.json, zh-TW.json, etc.): Rejected - harder to ensure all languages have matching keys, more files to manage
- Flat keys with language suffix (companyName_en, companyName_zh_TW): Rejected - verbose, error-prone, doesn't support nesting

**Sample Structure**:
```json
{
  "en": {
    "companyName": "Moonote Co., Ltd.",
    "tagline": "Building Tomorrow's Enterprise Solutions Today",
    "aboutUs": {
      "title": "About Us",
      "description": "Moonote Co., Ltd. is a software technology company..."
    },
    "frameworkFeatures": [
      {
        "name": "Out-of-box RESTful API",
        "description": "Standard REST operations ready to use"
      }
    ]
  },
  "zh-TW": {
    "companyName": "月本股份有限公司",
    "tagline": "打造明日企業解決方案",
    "aboutUs": {
      "title": "關於我們",
      "description": "月本股份有限公司是一家專注於企業級應用開發框架..."
    }
  },
  "zh-CN": { /* Simplified Chinese */ },
  "th": { /* Thai */ }
}
```

---

### 4. Language Detection & Persistence

**Decision**: Check localStorage → navigator.language → default to Traditional Chinese; persist selection in localStorage

**Rationale**:
- Meets FR-031: Browser language preference detection
- Meets FR-030: Persistence across page navigation
- Traditional Chinese as default aligns with company location (Taiwan) and primary audience
- localStorage is widely supported and persists indefinitely

**Alternatives Considered**:
- Session storage: Rejected - doesn't persist across browser sessions
- Cookies: Rejected - unnecessary complexity, privacy concerns
- URL parameter (e.g., ?lang=en): Rejected - doesn't persist on navigation

**Implementation Flow**:
```javascript
function detectLanguage() {
  // 1. Check localStorage
  const stored = localStorage.getItem('preferredLanguage');
  if (stored && ['en', 'zh-TW', 'zh-CN', 'th'].includes(stored)) {
    return stored;
  }

  // 2. Check browser language
  const browserLang = navigator.language || navigator.languages?.[0];
  if (browserLang) {
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang === 'zh-TW' || browserLang.startsWith('zh-Hant')) return 'zh-TW';
    if (browserLang === 'zh-CN' || browserLang.startsWith('zh-Hans')) return 'zh-CN';
    if (browserLang.startsWith('th')) return 'th';
  }

  // 3. Default to Traditional Chinese
  return 'zh-TW';
}
```

---

### 5. Logo Styling with Tailwind

**Decision**: Responsive logo in header with Tailwind utility classes (max-h-12 on mobile, max-h-16 on desktop)

**Rationale**:
- Tailwind's responsive utilities (`md:`) make it easy to adapt logo size for different screens
- Logo as JPG is provided and suitable for header (not needing vector scalability)
- Maintains brand consistency while meeting mobile readability requirements (FR-022)

**Alternatives Considered**:
- SVG logo: Not provided by user
- Multiple image sizes with srcset: Rejected - single JPG is sufficient for header size, unnecessary complexity
- Fixed pixel size: Rejected - doesn't adapt to mobile screens

**Implementation**:
```html
<header class="bg-white shadow-sm">
  <div class="container mx-auto px-4 py-4 flex items-center justify-between">
    <img src="/assets/logo.jpg" alt="Moonote Co., Ltd." class="max-h-12 md:max-h-16">
    <!-- Language toggle -->
  </div>
</header>
```

---

### 6. Content Update Workflow

**Decision**: Edit `data/content.json` → commit → push → Cloudflare auto-redeploy

**Rationale**:
- Meets FR-018: Content updates without code changes (edit JSON only)
- Meets FR-020: Version-controlled content (Git tracks all changes)
- Meets Principle III: Zero-Config Deployment (no manual build or deploy steps)
- Cloudflare Pages watches main branch and auto-deploys on push

**Alternatives Considered**:
- CMS integration (Contentful, Strapi): Rejected - violates zero-config deployment, adds external dependency
- Manual JSON validation script: Deferred - Cloudflare build will catch JSON parse errors; can add later if needed
- Separate content repo: Rejected - unnecessary complexity for single-page SPA

**Workflow**:
1. Content editor opens `data/content.json`
2. Edits translation strings (e.g., update module description)
3. Saves file (optionally validate JSON locally)
4. Commits: `git add data/content.json && git commit -m "Update module descriptions"`
5. Pushes: `git push origin 002-my-company-decription`
6. Cloudflare Pages detects push, builds (if needed), deploys (~1-2 minutes)

---

## Best Practices Applied

### Performance Optimization
- Tailwind purge removes unused CSS (reduces bundle from 3MB to ~10-20KB)
- JSON content loaded once, cached in JS (no repeated fetch)
- Logo optimized (JPG compressed, appropriate dimensions)
- Minimal JavaScript (no frameworks, <100KB total)

### Accessibility
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels for language toggle
- `lang` attribute updated dynamically on `<html>` element
- Keyboard navigation support for language toggle (focus states, Enter key)

### SEO & Progressive Enhancement
- Content rendered in HTML (no client-side-only rendering of critical content)
- Meta tags with proper language and charset
- Fallback content for users without JavaScript (core text visible)

### Developer Experience
- Clear file structure (html, js/, data/, assets/)
- Comments in JSON and JS for content editors
- README.md with setup instructions (if needed)
- Optional Prettier formatting for consistency

---

## Dependencies Summary

**Runtime Dependencies**: None (vanilla JS, Tailwind via CDN)

**Development Dependencies** (optional):
- `tailwindcss` (CLI) for production build
- `prettier` for code formatting
- Live server (e.g., `python -m http.server` or VS Code Live Server extension)

**Total Estimated Bundle Size**:
- HTML: ~20KB
- CSS (Tailwind purged): ~15KB
- JavaScript (i18n + content-loader + app): ~10KB
- JSON content (4 languages): ~30KB (compressed)
- Logo JPG: ~50KB
- **Total**: ~125KB (under 500KB budget, under 2s load time)

---

## Risks & Mitigations

**Risk**: JSON content file becomes too large with 4 languages
**Mitigation**: Monitor file size; if >100KB, split into language-specific files loaded on demand

**Risk**: Missing translations cause broken UI
**Mitigation**: Fallback to English; add JSON validation script pre-commit

**Risk**: Browser compatibility issues with ES6 JavaScript
**Mitigation**: Target modern browsers only (last 2 versions); add polyfills if needed for older browsers

**Risk**: Tailwind CDN unavailable in production
**Mitigation**: Switch to CLI build for production, self-host Tailwind CSS

---

## Next Steps (Phase 1)

1. Create `data-model.md` documenting JSON schema in detail
2. Create `quickstart.md` with manual testing checklist
3. Update CLAUDE.md agent context with tech stack decisions
