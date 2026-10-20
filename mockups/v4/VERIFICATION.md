# Verification · 20 October 2026

Chrome headless with existing local Playwright; independently authored checks, no downloaded scroll-craft scripts. Native pointer lock/capture disabled in test contexts.

- Seven pages at 1440×1000, 390×844, 360×640 and reduced-motion 390×844: 28 page/viewport combinations. No horizontal document overflow, broken requested images, HTTP errors or JavaScript exceptions in final run. H1 computes 28px desktop and 24px phone on every page.
- Opening, assembly beginning/midpoint/end and full-page screenshots captured for each viewport/motion mode. Inspected desktop opening and midpoint, phone opening and scene resolution, and reduced-motion full page. Real photo planes separate; no text overlays photographs; reduced motion removes sticky travel and positional effects.
- Mobile navigation and Escape, category preview and Escape, catalog search/no-results/reset, product gallery, quantity 3 added to quote, v4 local storage isolation from v2, quote preview/download contents, gallery arrow keys/Escape, contact local preview, no-JS disabled submit and static scene all passed.
- HTML local references exist. All photography is reused from repository assets; source gallery attribution remains present. No comparison-index changes.
- Initial local HTTP server runs had connection reset/socket errors (not missing files); increased test server connection queue and repeated the full suite cleanly. Initial screenshots/results retained locally; final results supersede them. Also corrected inherited 28px quote heading on phone to 24px.

Evidence retained in the task's `output/playwright/`: results.json, interactions.json, opening/full/scene PNGs and test scripts. This folder is deliberately outside the published repo. The downloaded skill is pinned at 75d81f74e83692add18cd7a8a8e078b8a887a579.

Feel check: curiosity → choice → quiet detail → spatial reveal → resolve matches the intended sequence. The event reveal carries the largest motion span; the inquiry remains stable and legible. Motion is CSS perspective on flat photography, not a 3D model of the furniture. No physical iPhone/Android or Safari testing; no claim of comprehensive accessibility certification or automated composited contrast-harness compliance. Text is placed on solid surfaces rather than photographs.
