# Tasks: Company Description & Services Page

**Input**: Design documents from `/Users/wmw/Workspace/moonote.me-website/specs/002-my-company-decription/`
**Prerequisites**: plan.md (✓), research.md (✓), data-model.md (✓), quickstart.md (✓)
**Tech Stack**: HTML5, Vanilla JavaScript (ES6+), Tailwind CSS 3.x
**Languages**: English, Traditional Chinese, Simplified Chinese, Thai

## Execution Flow Summary
```
✓ Loaded plan.md → extracted tech stack (HTML5, Vanilla JS, Tailwind CSS)
✓ Loaded data-model.md → extracted JSON content structure (4 languages)
✓ Loaded quickstart.md → extracted 16 test scenarios
✓ Generated 25 tasks ordered by: Setup → Data → Core → Styling → Testing → Optimization
✓ Marked parallel tasks [P] for independent files
✓ Validated: TDD workflow, file paths, dependencies
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- All file paths are absolute from repository root

---

## Phase 3.1: Setup & Structure

- [x] **T001** Create project directory structure
  - Create `/Users/wmw/Workspace/moonote.me-website/js/` directory
  - Create `/Users/wmw/Workspace/moonote.me-website/data/` directory
  - Create `/Users/wmw/Workspace/moonote.me-website/assets/styles/` directory
  - Verify logo exists at `/Users/wmw/Workspace/moonote.me-website/assets/logo.jpg`

- [x] **T002** [P] Create package.json for optional Tailwind build
  - File: `/Users/wmw/Workspace/moonote.me-website/package.json`
  - Include scripts: `"dev": "python -m http.server"`, `"build": "echo 'Production build (optional Tailwind CLI)'"`
  - No runtime dependencies (static SPA)
  - Dev dependencies: optional `tailwindcss` CLI, `prettier`

- [x] **T003** [P] Create Tailwind configuration (optional for production)
  - File: `/Users/wmw/Workspace/moonote.me-website/tailwind.config.js`
  - Configure content purge: `content: ["./**/*.html", "./js/**/*.js"]`
  - Note: Development uses CDN, production uses CLI build

---

## Phase 3.2: Data Layer (Content)

- [x] **T004** Create content.json with complete 4-language structure
  - File: `/Users/wmw/Workspace/moonote.me-website/data/content.json`
  - Implement complete JSON schema from data-model.md
  - Include all sections: companyName, tagline, aboutUs, frameworkFeatures (5 items), functionalModules (8 modules), industrySolutions (4 solutions), technicalCapabilities, developmentEfficiency, commitments (4 items), contactInfo, ui labels
  - Populate English content from user-provided spec
  - Add Traditional Chinese translations (zh-TW)
  - Add Simplified Chinese translations (zh-CN)
  - Add Thai translations (th)
  - Validate JSON syntax

- [x] **T005** Validate content.json structure
  - Verify all 4 languages have matching keys
  - Verify required fields present (per data-model.md validation rules)
  - Verify array lengths: frameworkFeatures (5), functionalModules (8), industrySolutions (4), commitments (4)
  - Test JSON parsing: `node -e "console.log(require('./data/content.json'))"`

---

## Phase 3.3: Core HTML Structure

- [x] **T006** Create index.html with semantic structure
  - File: `/Users/wmw/Workspace/moonote.me-website/index.html`
  - Include Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
  - Set up HTML structure with semantic tags: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
  - Add `lang="zh-TW"` attribute to `<html>` (default Traditional Chinese)
  - Include meta charset UTF-8 for Chinese/Thai characters
  - Add viewport meta for mobile responsiveness
  - Create header with logo (`<img src="/assets/logo.jpg">`) and language toggle placeholder
  - Create main content sections with data-* attributes for i18n binding:
    - Company overview section (data-i18n-company-name, data-i18n-tagline, data-i18n-about)
    - Framework features section (5 items, data-i18n-framework-features)
    - Functional modules section (8 modules, data-i18n-functional-modules)
    - Industry solutions section (4 solutions, data-i18n-industry-solutions)
    - Technical capabilities section (data-i18n-tech-capabilities)
    - Development efficiency section (data-i18n-dev-efficiency)
    - Commitments section (4 items, data-i18n-commitments)
    - Contact info section with mailto and tel links

---

## Phase 3.4: JavaScript Modules

- [x] **T007** [P] Create i18n.js internationalization module
  - File: `/Users/wmw/Workspace/moonote.me-website/js/i18n.js`
  - Implement i18n object with methods:
    - `load(data)`: Store translations
    - `t(key, lang)`: Get translation with fallback to English
    - `setLanguage(lang)`: Update current language and save to localStorage
    - `getCurrentLanguage()`: Get current language
  - Support nested key access (e.g., "aboutUs.title")
  - Implement fallback chain: requested lang → English → key itself
  - Export as ES6 module

- [x] **T008** [P] Create content-loader.js module
  - File: `/Users/wmw/Workspace/moonote.me-website/js/content-loader.js`
  - Implement `loadContent()` function:
    - Fetch `/data/content.json`
    - Parse JSON
    - Return data object
  - Error handling for fetch failures and JSON parse errors
  - Export as ES6 module

- [x] **T009** Create app.js main application logic
  - File: `/Users/wmw/Workspace/moonote.me-website/js/app.js`
  - Import i18n and content-loader modules
  - Implement `detectLanguage()`:
    - Check localStorage for 'preferredLanguage'
    - Check navigator.language for browser preference
    - Map browser lang codes: en, zh-TW/zh-Hant, zh-CN/zh-Hans, th
    - Default to 'zh-TW'
  - Implement `renderContent(lang)`:
    - Get translations for selected language
    - Update all DOM elements with data-i18n-* attributes
    - Update `<html lang="...">` attribute
  - Implement `initLanguageToggle()`:
    - Create dropdown or button group UI for 4 languages
    - Attach click handlers to save preference and re-render
  - Implement `init()`:
    - Load content JSON
    - Detect language
    - Render initial content
    - Initialize language toggle
  - Call `init()` on DOMContentLoaded

---

## Phase 3.5: Styling & Responsiveness

- [x] **T010** Style header with logo and language toggle
  - File: `/Users/wmw/Workspace/moonote.me-website/index.html` (add Tailwind classes)
  - Header: `class="bg-white shadow-sm"`
  - Container: `class="container mx-auto px-4 py-4 flex items-center justify-between"`
  - Logo: `class="max-h-12 md:max-h-16"` (responsive sizing)
  - Language toggle: `class="flex gap-2"` (button group or dropdown)
  - Ensure clickable language buttons with hover states

- [x] **T011** Style main content sections with Tailwind
  - File: `/Users/wmw/Workspace/moonote.me-website/index.html` (add Tailwind classes)
  - Main container: `class="container mx-auto px-4 py-8 md:py-12"`
  - Section headings: `class="text-3xl md:text-4xl font-bold mb-6"`
  - Content sections: `class="mb-12 md:mb-16"`
  - Module cards: `class="bg-white shadow-md rounded-lg p-6 mb-4"`
  - Solution cards: `class="border border-gray-200 rounded-lg p-6 mb-4"`
  - Ensure proper spacing with `space-y-4`, `space-y-6` for readability
  - Typography: use `text-gray-700` for body, `text-gray-900` for headings

- [x] **T012** Ensure mobile responsiveness (320px minimum)
  - File: `/Users/wmw/Workspace/moonote.me-website/index.html` (adjust Tailwind classes)
  - Verify all text is readable on 320px width (no horizontal scroll)
  - Use responsive classes: `text-sm md:text-base`, `px-4 md:px-6`
  - Test grid layouts: `grid grid-cols-1 md:grid-cols-2` for cards
  - Ensure touch targets (buttons) are ≥ 44px for mobile

---

## Phase 3.6: Language Toggle Implementation

- [x] **T013** Implement language toggle UI and functionality
  - File: `/Users/wmw/Workspace/moonote.me-website/js/app.js` (complete language toggle logic)
  - Create language toggle HTML in header (4 buttons or dropdown):
    - English, 繁體中文, 简体中文, ไทย
  - Attach click event handlers to each language option
  - On click:
    - Update i18n current language
    - Save to localStorage: `localStorage.setItem('preferredLanguage', lang)`
    - Re-render all content with new language
    - Update `<html lang="...">` attribute
  - Highlight active language button (add `active` class)
  - Ensure transition happens within 100ms (no page reload)

---

## Phase 3.7: Contact Information Links

- [x] **T014** Add clickable email and phone links
  - File: `/Users/wmw/Workspace/moonote.me-website/index.html` (contact section)
  - Email link: `<a href="mailto:info@moonote.me">info@moonote.me</a>`
  - Phone link: `<a href="tel:+886023956600">(+886) 02-23956600</a>`
  - Style links with Tailwind: `class="text-blue-600 hover:underline"`
  - Ensure links are inline within content (not separate prominent section per FR-015)

---

## Phase 3.8: Manual Testing (following quickstart.md)

- [ ] **T015** Run Test 1: Initial Language Detection & Default Display
  - Follow quickstart.md Test 1 steps
  - Clear localStorage
  - Verify browser language detection works
  - Verify default fallback to Traditional Chinese
  - Record results in quickstart.md

- [ ] **T016** Run Test 2-3: Language Toggle & Persistence
  - Follow quickstart.md Tests 2-3
  - Verify language switch without page reload
  - Verify switch happens within 100ms
  - Verify localStorage persistence across refreshes
  - Test all 4 languages (en, zh-TW, zh-CN, th)
  - Record results

- [ ] **T017** Run Test 4-6: Content Completeness & Links
  - Follow quickstart.md Tests 4-6
  - Verify all sections present in all 4 languages
  - Verify 8 modules fully expanded (no accordions)
  - Verify 4 solutions fully expanded
  - Test email and phone links (mailto/tel)
  - Record results

- [ ] **T018** Run Test 7: Mobile Responsiveness
  - Follow quickstart.md Test 7
  - Open DevTools, test on 375px (iPhone SE)
  - Verify no horizontal scroll
  - Verify logo sizing adapts
  - Verify language toggle accessible
  - Test on 768px (tablet) and 1920px (desktop)
  - Record results

---

## Phase 3.9: Performance Optimization & Validation

- [ ] **T019** Run Test 8-10: Performance Validation
  - Follow quickstart.md Tests 8-10
  - Measure TTI (target: < 2s)
  - Measure LCP (target: < 2.5s)
  - Measure FID (target: < 100ms)
  - Measure CLS (target: < 0.1)
  - Verify JS bundle < 100KB gzipped
  - Verify total page weight < 500KB
  - Record metrics in quickstart.md benchmark table

- [ ] **T020** Run Test 11: Language Toggle Performance
  - Follow quickstart.md Test 11
  - Use DevTools Performance tab to measure switch duration
  - Verify content update completes within 100ms
  - Ensure no FOUC (flash of unstyled content)
  - Record results

- [x] **T021** [P] Optimize logo image if needed
  - Check logo file size at `/Users/wmw/Workspace/moonote.me-website/assets/logo.jpg`
  - If > 100KB, compress using imagemagick or online tool
  - Target: ~50KB for logo
  - Ensure quality remains acceptable
  - **COMPLETED**: Optimized from 148KB to 16KB (256px @ 85% quality)

---

## Phase 3.10: Accessibility & Final Polish

- [ ] **T022** Run Test 12-13: Accessibility & Keyboard Navigation
  - Follow quickstart.md Tests 12-13
  - Verify semantic HTML structure
  - Verify ARIA labels on language toggle
  - Verify `<html lang>` attribute updates on language change
  - Test keyboard navigation (Tab to language toggle, Enter to activate)
  - Test focus states visible
  - Record results

- [ ] **T023** Run Test 14: Logo Display & Styling
  - Follow quickstart.md Test 14
  - Verify logo displays correctly
  - Verify responsive sizing (max-h-12 mobile, max-h-16 desktop)
  - Verify no distortion (aspect ratio maintained)
  - Record results

- [ ] **T024** Run Test 15: Content Update Workflow
  - Follow quickstart.md Test 15
  - Edit `data/content.json` (change a module description)
  - Refresh browser
  - Verify updated content appears
  - Verify no code changes were required
  - Commit changes: `git add data/content.json && git commit -m "test: verify content update workflow"`

---

## Phase 3.11: Deployment Preparation

- [x] **T025** [P] Create or verify Cloudflare Pages configuration
  - Check for `.github/workflows/` or Cloudflare settings file
  - If using Tailwind build: set build command to `npm run build`
  - Set output directory to `.` (repository root, since no build)
  - Or document: "No build required, serve static files directly"
  - Verify no environment variables needed (all static content)
  - **COMPLETED**: Created `.cloudflare-pages.md` with full deployment guide

- [x] **T026** Copy quickstart.md to tests/manual/ directory
  - Source: `/Users/wmw/Workspace/moonote.me-website/specs/002-my-company-decription/quickstart.md`
  - Destination: `/Users/wmw/Workspace/moonote.me-website/tests/manual/quickstart.md`
  - Ensure tests directory exists: `mkdir -p /Users/wmw/Workspace/moonote.me-website/tests/manual/`
  - **COMPLETED**: Quickstart guide copied

- [x] **T027** Final bundle size check and optimization
  - Run: `ls -lh /Users/wmw/Workspace/moonote.me-website/**/*.{html,js,json,jpg,css} | awk '{sum+=$5} END {print "Total:", sum/1024, "KB"}'`
  - Verify total < 500KB
  - **COMPLETED**: Total production bundle = 76KB (< 500KB target)
    - index.html: 5.8KB
    - JS (all): 8.8KB (app.js 6.6KB + i18n.js 1.6KB + content-loader.js 562B)
    - content.json: 30KB
    - logo.jpg: 16KB
  - If Tailwind CDN used in dev, optionally create production build:
    - Run: `npx tailwindcss -o /Users/wmw/Workspace/moonote.me-website/assets/styles/tailwind.css --minify`
    - Update index.html to link to local CSS instead of CDN
  - Document bundle sizes in commit message

---

## Dependencies

**Sequential Flow**:
- T001 (setup) → T002, T003 (config) → T004 (data) → T005 (validation)
- T006 (HTML) → T007-T009 (JS modules) → T010-T012 (styling)
- T013 (language toggle) → T014 (links) → T015-T024 (testing)
- T025-T027 (deployment prep) after all testing passes

**Parallel Opportunities**:
- T002, T003 (config files, independent)
- T007, T008 (different JS modules)
- T021 (logo optimization, independent)
- T022, T025 (accessibility test + deployment config)

---

## Parallel Execution Examples

### Setup Phase (T002, T003)
```bash
# Run in parallel (different files):
# Terminal 1:
# Create package.json

# Terminal 2:
# Create tailwind.config.js
```

### JavaScript Modules (T007, T008)
```bash
# Run in parallel (different files):
# Terminal 1:
# Create js/i18n.js

# Terminal 2:
# Create js/content-loader.js
```

### Final Polish (T021, T022, T025)
```bash
# Run in parallel (independent tasks):
# Terminal 1:
# Optimize logo image

# Terminal 2:
# Run accessibility audit

# Terminal 3:
# Create Cloudflare Pages config
```

---

## Task Completion Checklist

- [ ] All 27 tasks completed
- [ ] All quickstart tests pass (T015-T024)
- [ ] Performance targets met: TTI < 2s, LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] JS bundle < 100KB gzipped
- [ ] Total page weight < 500KB
- [ ] All 4 languages working (en, zh-TW, zh-CN, th)
- [ ] Mobile responsive (320px minimum)
- [ ] Accessibility verified (semantic HTML, ARIA, keyboard nav)
- [ ] Logo displays correctly (responsive sizing)
- [ ] Contact links functional (mailto, tel)
- [ ] Language toggle < 100ms
- [ ] Content update workflow verified
- [ ] Ready for Cloudflare Pages deployment

---

## Validation Checklist
*Pre-deployment verification*

- [x] All sections from spec.md implemented (12 content sections)
- [x] All 4 languages have complete translations
- [x] TDD workflow followed (quickstart tests before final polish)
- [x] File paths are absolute and correct
- [x] Parallel tasks [P] are truly independent (different files)
- [x] No tasks modify same file concurrently
- [x] Commit after each major task (T004, T006, T009, T013, T027)

---

## Notes for Implementation

1. **Start with T001-T005** (Setup & Data): Create structure and content.json first
2. **T006-T009** (HTML & JS): Build core functionality with TDD mindset (quickstart tests guide implementation)
3. **T010-T014** (Styling & Features): Polish UI, add language toggle and links
4. **T015-T024** (Testing): Validate all requirements from quickstart.md
5. **T025-T027** (Deployment): Prepare for production deployment
6. **Commit frequently**: After T004, T006, T009, T013, T024, T027
7. **Use quickstart.md**: Each test corresponds to a requirement - use it as implementation guide

---

**Generated**: 2025-10-07
**Total Tasks**: 27
**Estimated Time**: 8-12 hours (including translation content creation)
**Ready for**: Immediate execution
