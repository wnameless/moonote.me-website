# Moonote.me Website Constitution

<!--
SYNC IMPACT REPORT
==================
Version: 0.0.0 → 1.0.0 (INITIAL RELEASE)

Changes:
- Initial constitution created for SPA project
- Established 7 core principles for static site development
- Defined deployment, performance, and development workflow requirements

Principles Defined:
1. Static-First Architecture
2. Edge-First Performance
3. Zero-Config Deployment
4. Progressive Enhancement
5. Developer Experience (DX)
6. Content-First Design
7. Version Control as Source of Truth

Templates Requiring Updates:
✅ plan-template.md - Constitution Check section will reference new principles
✅ spec-template.md - Aligned with SPA requirements (no backend entities)
✅ tasks-template.md - Reflects static build workflow and testing approach

Follow-up TODOs: None
-->

## Core Principles

### I. Static-First Architecture
**MUST**: All application logic runs client-side; no server-side rendering or API routes within the SPA.

**MUST**: Build outputs static assets (HTML, CSS, JS) that can be served from CDN.

**MUST**: External APIs are consumed via fetch/AJAX; no backend code in this repository.

**Rationale**: Cloudflare Pages excels at serving static content globally. Server-side logic would require Cloudflare Workers/Functions, violating the "import from GitHub" deployment simplicity. Static-first ensures maximum portability and zero infrastructure overhead.

### II. Edge-First Performance
**MUST**: Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1.

**MUST**: All assets optimized for edge caching (immutable hashing, cache headers).

**SHOULD**: Lazy-load non-critical resources; code-split by route.

**Rationale**: Cloudflare's global edge network is the primary performance advantage. Poor optimization wastes this benefit. Users expect instant loads on static sites.

### III. Zero-Config Deployment
**MUST**: Cloudflare Pages automatically deploys on push to main branch.

**MUST**: Build commands and output directory must be configurable via standard conventions (package.json scripts, framework defaults).

**MUST NOT**: Require manual configuration steps, environment secret management, or post-deploy scripts for basic functionality.

**Rationale**: "Import from GitHub" workflow means deployments must be fully automated. Manual steps break on every commit. Simplicity prevents deployment failures.

### IV. Progressive Enhancement
**MUST**: Core content accessible without JavaScript (where feasible for SPA architecture).

**SHOULD**: Semantic HTML; ARIA labels for dynamic content.

**SHOULD**: Graceful degradation for older browsers (via polyfills or feature detection).

**Rationale**: SPAs often break accessibility and SEO. Progressive enhancement ensures baseline usability even when JS fails or is disabled. Improves search indexing and screen reader compatibility.

### V. Developer Experience (DX)
**MUST**: Local development environment starts with a single command (npm install && npm run dev).

**MUST**: Hot module replacement (HMR) for rapid iteration.

**SHOULD**: TypeScript for type safety; ESLint/Prettier for consistency.

**Rationale**: Fast feedback loops prevent developer frustration. Automated formatting avoids bikeshedding. Type safety catches bugs before runtime.

### VI. Content-First Design
**MUST**: Visual design and interactions serve content readability and usability.

**MUST NOT**: Add animations, effects, or frameworks solely for aesthetic reasons without functional justification.

**SHOULD**: Design system documented; reusable components over one-off styles.

**Rationale**: Users visit for content, not fancy animations. Every KB of JS/CSS has a performance cost. Consistent design systems reduce maintenance burden.

### VII. Version Control as Source of Truth
**MUST**: All deployments traceable to a specific Git commit.

**MUST**: No manual edits to production files; changes via GitHub → Cloudflare pipeline only.

**SHOULD**: Tag releases; use semantic versioning for major redesigns.

**Rationale**: "Import from GitHub" means Git is the deployment trigger. Manual edits are lost on next push. Commit history = audit trail for changes.

## Deployment Requirements

**Build Process**:
- Framework build command specified in package.json or Cloudflare Pages settings
- Output directory clearly documented (e.g., dist/, build/, public/)
- Build must succeed with zero errors for deployment to proceed

**Environment Variables**:
- Public variables (API endpoints, feature flags) committed as `.env.example`
- Secrets (API keys) configured in Cloudflare Pages dashboard, never committed
- Build must fail loudly if required variables missing

**Preview Deployments**:
- All pull requests get preview URLs for testing
- Main branch = production deployment
- No manual promotion steps

## Performance Standards

**Bundle Size**:
- Initial JS bundle < 100KB gzipped (excluding vendor chunks)
- Total page weight < 500KB for critical path

**Asset Optimization**:
- Images: WebP/AVIF with fallbacks; responsive srcsets
- Fonts: Subset, preload, WOFF2 format
- CSS: Critical CSS inlined; non-critical deferred

**Caching Strategy**:
- Static assets: immutable, 1-year cache
- HTML: short TTL (5 min) for quick updates
- Service worker optional but must not break deployments

## Development Workflow

**Code Quality Gates**:
- Linting (ESLint) and formatting (Prettier) enforce consistent style
- Type checking (TypeScript) required if TS adopted
- Pre-commit hooks (optional) catch issues before push

**Testing Strategy**:
- Unit tests for complex logic (utilities, state management)
- Integration tests for critical user flows (optional for simple SPAs)
- Manual testing checklist in quickstart.md for pre-deploy validation

**Review Process**:
- PRs require passing builds on Cloudflare preview deployments
- Visual regression testing (optional, recommended for design systems)
- Accessibility audit for new interactive features

## Governance

**Amendment Process**:
- Constitution changes require documented rationale in PR description
- Version bump in this file (MAJOR.MINOR.PATCH rules above)
- Update dependent templates (plan, spec, tasks) in same PR

**Compliance**:
- All PRs must verify compliance with Static-First (Principle I) and Edge-First (Principle II)
- Deviations require justification in PR or plan.md Complexity Tracking section
- Retroactive compliance if legacy code violates principles (flag as tech debt)

**Constitutional Supremacy**:
- If conflict between this constitution and external best practices, constitution wins unless amendment proposed
- Team members may propose amendments but must follow amendment process above

**Version**: 1.0.0 | **Ratified**: 2025-10-07 | **Last Amended**: 2025-10-07
