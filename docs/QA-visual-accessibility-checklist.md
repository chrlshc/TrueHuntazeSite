Title: QA Checklist — Visual & Accessibility Validation

Scope
- Pages: Landing (/), Pricing, Blog, Developers, Use Cases, Careers, Support

Checklist
- Hero clarity
  - Headline/subheadline concise and visible on mobile/desktop
  - Primary CTA stands out, above the fold; secondary CTA optional
  - Imagery/video crisp; no overlap with nav or text
- Navigation & header
  - No content overlap with fixed nav
  - Links readable and obvious; active/hover states visible
  - Mobile: menu opens/closes reliably; no scroll lock bugs
- Readability & contrast
  - Body text ≥ 16px; headings maintain clear hierarchy
  - Contrast meets WCAG AA (use aXe/Chrome DevTools)
  - Links/buttons clearly distinguishable from text
- Accessibility
  - Keyboard focus visible; tab order logical
  - Landmarks present (main/nav/footer); skip link works
  - Alt text for non‑decorative images; descriptive link text
- Spacing & visual hierarchy
  - Consistent paddings/margins; sections clearly separated
  - Card grids: equal heights on desktop; wrap gracefully on mobile
  - No unexpected “double padding” under fixed nav
- Performance
  - No regressions in LCP/CLS; hero not blocked by heavy CSS/JS
  - Images lazy‑loaded where appropriate; no layout shifts
  - Unused CSS reduced; no flash of styles (FOUC)

Notes
- Test both light/dark contexts where applicable
- Test Support page with both headers:
  - Minimal: /support
  - Enterprise: /support?header=enterprise&footer=enterprise

