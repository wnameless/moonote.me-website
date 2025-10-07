# Implementation Plan: Company Description & Services Page

**Branch**: `002-my-company-decription` | **Date**: 2025-10-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/Users/wmw/Workspace/moonote.me-website/specs/002-my-company-decription/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path ✓
2. Fill Technical Context ✓
3. Fill Constitution Check section ✓
4. Evaluate Constitution Check → PASS ✓
5. Execute Phase 0 → research.md ✓
6. Execute Phase 1 → data-model.md, quickstart.md ✓
7. Re-evaluate Constitution Check → PASS ✓
8. Plan Phase 2 → Task generation approach ✓
9. STOP - Ready for /tasks command
```

## Summary

Build a static company description and services showcase page for Moonote Co., Ltd. that displays comprehensive information about the company's enterprise application framework, 8 functional modules, 4 industry solutions, technical capabilities, and company commitments. Content will be managed via JSON data files with support for 4 languages (English, Traditional Chinese, Simplified Chinese, Thai) with a language toggle interface. The page will be built as a vanilla JavaScript SPA using Tailwind CSS for styling and HTML5, deployed to Cloudflare Pages with zero-config deployment.

## Technical Context

**Language/Version**: HTML5, ES6+ JavaScript (vanilla, no framework), Tailwind CSS 3.x
**Primary Dependencies**: Tailwind CSS 3.x (via CDN or build), no runtime JS frameworks
**Storage**: JSON data files in repository (content/, i18n/), localStorage for language preference
**Testing**: Manual testing via quickstart.md, browser DevTools for performance validation
**Target Platform**: Modern browsers (Chrome/Firefox/Safari/Edge latest 2 versions), Cloudflare Pages CDN
**Project Type**: Single-page application (SPA) - static HTML/CSS/JS
**Performance Goals**: TTI < 2s, LCP < 2.5s, FID < 100ms, CLS < 0.1, JS bundle < 100KB gzipped
**Constraints**: No build tools initially (optional later), must work offline after first load, 4-language support (en, zh-TW, zh-CN, th)
**Scale/Scope**: Single page, ~12 content sections, 4 languages, ~500KB total page weight

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Static-First Architecture (Principle I)
- [x] No server-side rendering or API routes in SPA codebase (pure static HTML/CSS/JS)
- [x] Build outputs static assets only (HTML/CSS/JS) (optional Tailwind build step)
- [x] External API consumption via client-side fetch (N/A - content from JSON files)

### Edge-First Performance (Principle II)
- [x] Core Web Vitals targets documented (LCP < 2.5s, FID < 100ms, CLS < 0.1, TTI < 2s)
- [x] Asset optimization strategy defined (Tailwind purge, minification, logo optimization)
- [x] Edge caching headers planned (Cloudflare default caching for static assets)

### Zero-Config Deployment (Principle III)
- [x] Cloudflare Pages build command specified (optional: `npm run build` for Tailwind, or serve directly)
- [x] No manual deployment steps required (Git push → Cloudflare auto-deploy)
- [x] Environment variables strategy defined (N/A for static content)

### Progressive Enhancement (Principle IV)
- [x] Semantic HTML planned for core content (semantic tags: header, main, section, article, footer)
- [x] Accessibility considerations documented (ARIA labels, lang attributes, keyboard nav for language toggle)

### Developer Experience (Principle V)
- [x] Single-command dev environment setup (optional: `npx tailwindcss -i input.css -o output.css --watch` or live server)
- [x] HMR/fast refresh configured (browser live reload via simple HTTP server)
- [x] Linting/formatting tools specified (optional: Prettier for HTML/JS/CSS)

### Content-First Design (Principle VI)
- [x] Design serves content readability (clean typography, clear hierarchy, no clutter)
- [x] No unjustified animations or heavy frameworks (vanilla JS, minimal transitions)
- [x] Component reusability planned (CSS utility classes, JS modules for i18n and language toggle)

### Version Control as Source of Truth (Principle VII)
- [x] All changes via Git → Cloudflare pipeline (standard GitHub → Cloudflare Pages workflow)
- [x] No manual production file edits (all edits in repo, committed, pushed)

**Initial Constitution Check**: ✅ PASS

## Project Structure

### Documentation (this feature)
```
specs/002-my-company-decription/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (technology choices)
├── data-model.md        # Phase 1 output (JSON schema for content)
├── quickstart.md        # Phase 1 output (manual testing steps)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
moonote.me-website/
├── index.html               # Main SPA entry point
├── assets/
│   ├── logo.jpg            # Company logo (copied from /Users/wmw/Documents/Moonote/logo/)
│   └── styles/
│       └── tailwind.css    # Tailwind CSS (CDN or built)
├── js/
│   ├── app.js              # Main application logic
│   ├── i18n.js             # Internationalization module
│   └── content-loader.js   # JSON content loading
├── data/
│   └── content.json        # All page content (4 languages: en, zh-TW, zh-CN, th)
└── tests/
    └── manual/
        └── quickstart.md   # Manual testing checklist
```

**Structure Decision**: Single-page application structure. All HTML/CSS/JS in repository root with organized subdirectories. Content separated into `data/` directory for easy editing without code changes. No backend or build complexity initially; optional Tailwind CLI build for production optimization.

## Phase 0: Outline & Research

### Research Topics

1. **Tailwind CSS Integration Strategy**
   - Decision: Use Tailwind CSS via CDN for development, optional CLI build for production
   - Rationale: CDN is zero-config and fastest to start; CLI build provides smaller bundle via purging unused classes
   - Alternatives considered: Full PostCSS/Webpack setup (rejected: too complex for SPA); custom CSS (rejected: slower development)

2. **Vanilla JS i18n Pattern**
   - Decision: Custom lightweight i18n module using JSON lookup with fallback chain (requested lang → en)
   - Rationale: No dependencies, full control, <5KB code, meets 100KB JS budget easily
   - Alternatives considered: i18next library (rejected: 50KB+, overkill); template literals only (rejected: no structure for missing translations)

3. **Multi-Language JSON Structure**
   - Decision: Nested JSON object `{ "en": {...}, "zh-TW": {...}, "zh-CN": {...}, "th": {...} }` with shared keys
   - Rationale: Single file simplifies editing, clear structure, supports partial translations with fallback
   - Alternatives considered: Separate files per language (rejected: harder to ensure complete translations); flat keys with lang suffix (rejected: verbose, error-prone)

4. **Language Detection & Persistence**
   - Decision: Check localStorage → navigator.language → default to zh-TW; persist selection in localStorage
   - Rationale: Meets FR-031 (browser detection), FR-030 (persistence), respects user choice
   - Alternatives considered: Session storage (rejected: doesn't persist across sessions); cookies (rejected: unnecessary complexity)

5. **Logo Styling with Tailwind**
   - Decision: Responsive logo in header with Tailwind classes (max-h-12 md:max-h-16), optimized JPG
   - Rationale: Tailwind provides responsive utilities, logo.jpg provides brand consistency
   - Alternatives considered: SVG logo (not provided); multiple sizes with srcset (rejected: single JPG sufficient for header)

6. **Content Update Workflow**
   - Decision: Edit `data/content.json` → commit → push → Cloudflare auto-redeploy
   - Rationale: Meets FR-018 (updates without code changes), FR-020 (version-controlled)
   - Alternatives considered: CMS integration (rejected: violates zero-config deployment); manual JSON validation script (deferred: Cloudflare build will catch parse errors)

**Output**: research.md created

## Phase 1: Design & Contracts

### Data Model

**Entity**: ContentData (client-side JSON structure)

```json
{
  "en": {
    "companyName": "Moonote Co., Ltd.",
    "tagline": "Building Tomorrow's Enterprise Solutions Today",
    "aboutUs": { "title": "About Us", "description": "..." },
    "frameworkFeatures": [
      { "name": "...", "description": "..." }
    ],
    "functionalModules": [
      { "name": "Supplier Management", "description": "...", "capabilities": ["..."] }
    ],
    "industrySolutions": [
      { "name": "Chemical Management System", "modules": ["..."], "industries": ["..."] }
    ],
    "technicalCapabilities": ["..."],
    "developmentEfficiency": ["..."],
    "commitments": ["..."],
    "contactInfo": {
      "email": "info@moonote.me",
      "phone": "(+886) 02-23956600",
      "address": "2F, No. 31, Sec. 2, Nanchang Rd., Taipei 100, Taiwan",
      "addressChinese": "100 台北市南昌路二段31號2樓"
    }
  },
  "zh-TW": { /* Traditional Chinese translations */ },
  "zh-CN": { /* Simplified Chinese translations */ },
  "th": { /* Thai translations */ }
}
```

**Entity**: LanguagePreference (localStorage)
```json
{
  "selectedLanguage": "zh-TW" | "en" | "zh-CN" | "th"
}
```

### API Contracts

**Contract**: Language Toggle Interaction
- **Input**: User clicks language toggle button
- **Output**: Page content updates to selected language within 100ms (NFR-005)
- **Side Effect**: localStorage updated with preference

**Contract**: Content Loading
- **Input**: Page load or language change
- **Output**: All text content replaced with selected language version
- **Fallback**: If translation missing, fall back to English version

**Contract**: Browser Language Detection
- **Input**: First page visit (no localStorage preference)
- **Logic**: Check navigator.language/navigator.languages
  - If contains "en" → set to "en"
  - If contains "zh-TW" or "zh-Hant" → set to "zh-TW"
  - If contains "zh-CN" or "zh-Hans" → set to "zh-CN"
  - If contains "th" → set to "th"
  - Else → default to "zh-TW"
- **Output**: Initial language set

### Quickstart Test Scenarios

1. **Language Toggle Test**
   - Open index.html in browser
   - Verify page displays in Traditional Chinese by default
   - Click language toggle, select English
   - Verify all content switches to English without page reload
   - Refresh page → verify English persists

2. **Content Completeness Test**
   - For each language (en, zh-TW, zh-CN, th):
     - Switch to language
     - Scroll through entire page
     - Verify all 8 functional modules visible and translated
     - Verify all 4 industry solutions visible and translated
     - Verify contact email and phone are clickable

3. **Performance Test**
   - Open DevTools Network tab
   - Hard refresh (Cmd+Shift+R)
   - Verify TTI < 2 seconds
   - Check Total JS size < 100KB gzipped
   - Check LCP element (logo or first content) < 2.5s

4. **Mobile Responsiveness Test**
   - Open DevTools, toggle device toolbar (375px iPhone)
   - Verify content readable without horizontal scroll
   - Verify language toggle accessible
   - Tap phone number → verify tel: link works

### Agent Context Update

Running agent context update script...

**Output**: data-model.md, quickstart.md created

**Post-Design Constitution Check**: ✅ PASS (no new violations introduced)

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from data-model.md and quickstart.md
- Tasks ordered by: Setup → Data → Core Implementation → Styling → i18n → Testing → Optimization

**Key Task Categories**:
1. **Setup** (T001-T003): Project structure, Tailwind setup, logo placement
2. **Data Layer** (T004-T005): Create content.json with all 4 languages, validate JSON structure
3. **Core HTML** (T006-T008): Build semantic HTML structure with placeholders
4. **JavaScript Modules** (T009-T012): i18n.js, content-loader.js, app.js, language toggle
5. **Styling** (T013-T015): Tailwind styling, responsive design, logo integration
6. **Testing** (T016-T018): Manual quickstart tests, performance validation, accessibility audit
7. **Optimization** (T019-T020): Tailwind purge/build, minification, final bundle check

**Ordering Strategy**:
- Parallel tasks marked [P] for independent files
- Sequential tasks for dependent work (HTML before JS, JS before testing)
- TDD-inspired: quickstart.md written early, validated late

**Estimated Output**: 20-22 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks following TDD workflow)
**Phase 5**: Validation (run quickstart.md tests, performance benchmarks, deploy preview)

## Complexity Tracking
*No constitutional violations - this section is empty*

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved (clarified in spec.md)
- [x] Complexity deviations documented (none)

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
