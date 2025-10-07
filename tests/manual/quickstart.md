# Quickstart Testing Guide: Company Description & Services Page

**Feature**: 002-my-company-decription
**Date**: 2025-10-07
**Purpose**: Manual testing checklist to validate all requirements before deployment

---

## Prerequisites

- Modern browser (Chrome, Firefox, Safari, or Edge - latest version)
- Local web server running (e.g., `python -m http.server` or VS Code Live Server)
- DevTools available for performance testing

---

## Test Suite

### Test 1: Initial Language Detection & Default Display

**Objective**: Verify browser language detection and default fallback (FR-031, FR-027)

**Steps**:
1. Clear browser localStorage (DevTools > Application > Local Storage > Delete All)
2. Set browser language to English (Settings > Languages)
3. Navigate to `http://localhost:8000/index.html`
4. Observe initial page language

**Expected Result**:
- ✅ Page displays in English (detected from browser)
- ✅ Language toggle shows current language as "English"

**Alternative Test** (if browser language not English/Chinese/Thai):
1. Clear localStorage
2. Navigate to page
3. **Expected**: Page displays in Traditional Chinese (default fallback)

---

### Test 2: Language Toggle - English ↔ Traditional Chinese

**Objective**: Verify language switching without page reload (FR-032, NFR-005)

**Steps**:
1. With page in English, click language toggle button
2. Select "繁體中文" (Traditional Chinese)
3. Observe content update
4. Check DevTools Console for errors
5. Click language toggle again, select "English"

**Expected Result**:
- ✅ Content switches to Traditional Chinese within 100ms (no page reload)
- ✅ All text content changes (company name, modules, solutions, etc.)
- ✅ Clicking "English" switches back to English immediately
- ✅ No console errors

---

### Test 3: Language Persistence

**Objective**: Verify language preference persists across page reloads (FR-030)

**Steps**:
1. Set page language to English (using language toggle)
2. Refresh page (F5 or Cmd+R)
3. Observe language on reload

**Expected Result**:
- ✅ Page displays in English after reload (preference persisted)
- ✅ localStorage contains `preferredLanguage: "en"` (check DevTools > Application > Local Storage)

**Repeat for all languages**:
- Traditional Chinese (zh-TW)
- Simplified Chinese (zh-CN)
- Thai (th)

---

### Test 4: Content Completeness - All Languages

**Objective**: Verify all content sections are translated and visible (FR-029)

**For each language** (English, Traditional Chinese, Simplified Chinese, Thai):

**Steps**:
1. Switch to target language using language toggle
2. Scroll through entire page from top to bottom
3. Verify presence of all sections:
   - ✅ Company name and tagline
   - ✅ "About Us" section with description
   - ✅ "Self-Developed Framework Technology" (5 features)
   - ✅ "Functional Modules Library" (8 modules)
   - ✅ "Industry Solutions" (4 solutions)
   - ✅ "Technical Innovation" (5 capabilities)
   - ✅ "Development Efficiency" (4 items)
   - ✅ "Our Commitments" (4 commitments)
   - ✅ Contact information (email, phone, address)

**Expected Result**:
- ✅ All sections present and translated (no English fallback except for invariant fields like email/phone)
- ✅ No missing content or "[missing]" placeholders

---

### Test 5: Expanded Content Display

**Objective**: Verify all module and solution descriptions are fully visible (FR-006, FR-008)

**Steps**:
1. Navigate to "Functional Modules" section
2. Observe all 8 modules
3. Navigate to "Industry Solutions" section
4. Observe all 4 solutions

**Expected Result**:
- ✅ All 8 module descriptions are fully visible (no "Read more" or expand buttons)
- ✅ All 4 solution descriptions are fully visible with module lists and industries
- ✅ No accordions, tabs, or collapsible elements

---

### Test 6: Contact Information Links

**Objective**: Verify clickable email and phone links (FR-012, FR-013)

**Steps**:
1. Scroll to contact information section
2. Click on email address `info@moonote.me`
3. Observe if email client opens
4. Go back to page
5. Click on phone number `(+886) 02-23956600`
6. Observe if phone app opens (on mobile) or confirm it's a tel: link

**Expected Result**:
- ✅ Email link opens default email client with `to: info@moonote.me` pre-filled
- ✅ Phone link is clickable with `tel:+886023956600` protocol
- ✅ Both links have proper `href` attributes (check in DevTools)

---

### Test 7: Mobile Responsiveness

**Objective**: Verify content readability on small screens (FR-022, FR-026)

**Steps**:
1. Open DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M or Ctrl+Shift+M)
3. Select "iPhone SE" (375px width) or similar small device
4. Scroll through entire page

**Expected Result**:
- ✅ No horizontal scrolling required
- ✅ All text is readable (font size not too small)
- ✅ Logo is visible and appropriately sized
- ✅ Language toggle is accessible and functional
- ✅ All 8 modules and 4 solutions remain readable with proper spacing

**Test on additional screen sizes**:
- Tablet (768px): ✅ Layout adapts appropriately
- Desktop (1920px): ✅ Content centered, not too wide

---

### Test 8: Performance - Page Load Time

**Objective**: Verify page loads within 2 seconds (NFR-001)

**Steps**:
1. Open DevTools > Network tab
2. Disable cache (checkbox: "Disable cache")
3. Throttle to "Fast 3G" (simulates standard broadband)
4. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
5. Observe timeline until page is interactive

**Expected Result**:
- ✅ Time to Interactive (TTI) < 2 seconds
- ✅ All resources loaded successfully (no 404 errors)

**Metrics to record** (from DevTools > Lighthouse or Network tab):
- TTI: ______ ms (target: < 2000ms)
- LCP (Largest Contentful Paint): ______ ms (target: < 2500ms)
- FID (First Input Delay): ______ ms (target: < 100ms)
- CLS (Cumulative Layout Shift): ______ (target: < 0.1)

---

### Test 9: JavaScript Bundle Size

**Objective**: Verify JS bundle < 100KB gzipped (NFR-003)

**Steps**:
1. Open DevTools > Network tab
2. Hard refresh page
3. Filter by "JS" (JavaScript files)
4. Check size of each JS file
5. Sum total JS transferred size

**Expected Result**:
- ✅ Total JS size (transferred/gzipped) < 100KB
- ✅ Individual files:
  - `app.js`: < 10KB
  - `i18n.js`: < 5KB
  - `content-loader.js`: < 5KB
  - Tailwind (if loaded): < 80KB (or via CDN)

---

### Test 10: Total Page Weight

**Objective**: Verify total page weight < 500KB for critical path (NFR-004)

**Steps**:
1. Open DevTools > Network tab
2. Hard refresh page
3. Wait for all resources to load
4. Check "Transferred" size at bottom of Network tab

**Expected Result**:
- ✅ Total transferred size < 500KB
- **Breakdown** (approximate):
  - HTML: ~20KB
  - CSS: ~15KB (Tailwind purged)
  - JS: ~10KB
  - JSON (content): ~30KB
  - Logo: ~50KB
  - **Total**: ~125KB (well under budget)

---

### Test 11: Language Toggle Performance

**Objective**: Verify language switch happens within 100ms (NFR-005)

**Steps**:
1. Open DevTools > Performance tab
2. Click "Record" button
3. Click language toggle, select a different language
4. Stop recording
5. Analyze timeline for content update duration

**Expected Result**:
- ✅ Content update completes within 100ms of click
- ✅ No visible lag or flash of unstyled content (FOUC)

**Alternative Test** (simple):
1. Switch language
2. Observe update speed (should feel instant)

---

### Test 12: Accessibility - Screen Reader

**Objective**: Verify semantic HTML and ARIA labels (FR-023)

**Steps**:
1. Open DevTools > Elements tab
2. Inspect HTML structure
3. Verify presence of semantic tags:
   - `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
4. Check language toggle for ARIA attributes:
   - `aria-label="Switch Language"`
   - `role="button"` or proper `<button>` element
5. Check `<html lang="...">` attribute updates on language change

**Expected Result**:
- ✅ All content sections use semantic HTML
- ✅ Language toggle has proper ARIA labels
- ✅ `<html>` element `lang` attribute updates (e.g., `lang="zh-TW"` when Traditional Chinese selected)

**Bonus** (if screen reader available):
- Use VoiceOver (Mac: Cmd+F5) or NVDA (Windows) to navigate page
- ✅ All content is readable by screen reader
- ✅ Language toggle is announced correctly

---

### Test 13: Keyboard Navigation

**Objective**: Verify language toggle is keyboard accessible (Principle IV)

**Steps**:
1. Tab through page using keyboard (Tab key)
2. Focus on language toggle button
3. Press Enter or Space to activate
4. Use arrow keys to select language (if dropdown)
5. Press Enter to confirm

**Expected Result**:
- ✅ Language toggle is focusable (visible focus ring)
- ✅ Enter/Space key activates toggle
- ✅ Language selection works via keyboard
- ✅ Focus returns to toggle after selection

---

### Test 14: Logo Display & Styling

**Objective**: Verify company logo is displayed and styled correctly

**Steps**:
1. Inspect header section
2. Verify logo image is visible
3. Check logo source: `/assets/logo.jpg`
4. Resize browser window (mobile → desktop)
5. Observe logo size adaptation

**Expected Result**:
- ✅ Logo displays in header
- ✅ Logo source is correct (`/assets/logo.jpg`)
- ✅ Logo is appropriately sized:
  - Mobile (< 768px): max height 48px (max-h-12)
  - Desktop (≥ 768px): max height 64px (max-h-16)
- ✅ Logo maintains aspect ratio (no distortion)

---

### Test 15: Content Update Workflow (Dev Test)

**Objective**: Verify content can be updated without code changes (FR-018, FR-020)

**Steps**:
1. Open `data/content.json` in text editor
2. Modify a module description (e.g., change "Supplier Management" description)
3. Save file
4. Refresh browser page
5. Observe updated content

**Expected Result**:
- ✅ Changed content appears on page
- ✅ No code changes were required
- ✅ JSON file is version-controlled (check `git status`)

---

### Test 16: Offline Functionality (Optional)

**Objective**: Verify page works after first load (Progressive Web App capability)

**Steps**:
1. Load page fully in browser
2. Open DevTools > Network tab
3. Set throttling to "Offline"
4. Refresh page

**Expected Result** (if service worker implemented):
- ✅ Page loads from cache
- ✅ Language toggle still works (data cached)

**Note**: This test is optional and depends on service worker implementation.

---

## Test Summary Checklist

- [ ] Test 1: Initial Language Detection ✅
- [ ] Test 2: Language Toggle ✅
- [ ] Test 3: Language Persistence ✅
- [ ] Test 4: Content Completeness (all 4 languages) ✅
- [ ] Test 5: Expanded Content Display ✅
- [ ] Test 6: Contact Information Links ✅
- [ ] Test 7: Mobile Responsiveness ✅
- [ ] Test 8: Performance - Page Load Time ✅
- [ ] Test 9: JavaScript Bundle Size ✅
- [ ] Test 10: Total Page Weight ✅
- [ ] Test 11: Language Toggle Performance ✅
- [ ] Test 12: Accessibility - Screen Reader ✅
- [ ] Test 13: Keyboard Navigation ✅
- [ ] Test 14: Logo Display & Styling ✅
- [ ] Test 15: Content Update Workflow ✅
- [ ] Test 16: Offline Functionality (optional) ✅

---

## Bug Reporting Template

If any test fails, use this template to report:

```
**Test Name**: [e.g., Test 2: Language Toggle]
**Browser**: [e.g., Chrome 120.0]
**OS**: [e.g., macOS 14.0]
**Steps to Reproduce**:
1. ...
2. ...

**Expected Result**: ...
**Actual Result**: ...
**Screenshots**: [attach if applicable]
**Console Errors**: [copy from DevTools Console]
```

---

## Performance Benchmarks (Record Results)

| Metric | Target | Actual | Pass/Fail |
|--------|--------|--------|-----------|
| TTI | < 2000ms | ______ ms | ☐ |
| LCP | < 2500ms | ______ ms | ☐ |
| FID | < 100ms | ______ ms | ☐ |
| CLS | < 0.1 | ______ | ☐ |
| JS Bundle | < 100KB | ______ KB | ☐ |
| Total Page Weight | < 500KB | ______ KB | ☐ |
| Language Toggle | < 100ms | ______ ms | ☐ |

---

## Next Steps After Testing

1. ✅ All tests pass → Ready for deployment to Cloudflare Pages preview
2. ❌ Tests fail → Fix issues, re-run affected tests
3. Document any edge cases or browser-specific issues
4. Run final accessibility audit (Lighthouse in DevTools)
5. Deploy to production branch (main)

---

## Deployment Verification (Production)

After deploying to Cloudflare Pages:

1. Visit production URL (e.g., `https://moonote-me.pages.dev`)
2. Re-run Tests 1-14 on production environment
3. Verify Cloudflare CDN headers (check `cache-control` in Network tab)
4. Confirm all assets served over HTTPS
5. Test from different geographic locations (optional: use VPN or proxy)

---

**Tester Name**: ______________
**Test Date**: ______________
**All Tests Passed**: ☐ Yes ☐ No (see bug reports)
