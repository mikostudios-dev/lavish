# Current identity-led revision · 20 October 2026

Current QA in Chrome on the iMac through browser controls, after visual inspection of the real Lavish home, seating, Abundant Chair, about and gallery pages. The historical results below refer to earlier rejected designs and are not claims about this revision.

- Seven pages at widths 1440, 768, 390 and 360px (height 900px): 28 checks, no horizontal document overflow or broken completed images. H1 is 28px desktop/tablet and 24px phone. Desktop and phone screenshots inspected.
- Home setting selection updates the real photograph, description and pressed state. Mobile menu and Escape, category preview and Escape, catalog search for Abundant, quantity 2 added to quote, local quote preview with fictitious test details, and removal of the test item passed. Nothing was submitted externally.
- Motion pause removes the transform, persists after reload and resumes. System reduced-motion CSS and matchMedia override were reviewed; OS/browser reduced-motion emulation was not completed in this revision. No claim of a fresh emulation pass. The controls use native buttons and dialogs; keyboard Escape paths checked.
- Browser error log was empty. Local HTML href/src file references passed. No unfamiliar repository software or scripts were installed or run. No physical phone or Safari verification.
- Evidence outside the repository: output/playwright/essence-desktop.jpg. Shared selector and screenshot assets are unchanged by this revision.

---

# Historical verification · superseded designs · 20 October 2026

Chrome headless with existing local Playwright; independently authored checks, no downloaded scroll-craft scripts. Native pointer lock/capture disabled in test contexts.

- Seven pages at 1440×1000, 390×844, 360×640 and reduced-motion 390×844: 28 page/viewport combinations. No horizontal document overflow, broken requested images, HTTP errors or JavaScript exceptions in final run. H1 computes 28px desktop and 24px phone on every page.
- Opening, assembly beginning/midpoint/end and full-page screenshots captured for each viewport/motion mode. Inspected desktop opening and midpoint, phone opening and scene resolution, and reduced-motion full page. Real photo planes separate; no text overlays photographs; reduced motion removes sticky travel and positional effects.
- Mobile navigation and Escape, category preview and Escape, catalog search/no-results/reset, product gallery, quantity 3 added to quote, v4 local storage isolation from v2, quote preview/download contents, gallery arrow keys/Escape, contact local preview, no-JS disabled submit and static scene all passed.
- HTML local references exist. All photography is reused from repository assets; source gallery attribution remains present. No comparison-index changes.
- Initial local HTTP server runs had connection reset/socket errors (not missing files); increased test server connection queue and repeated the full suite cleanly. Initial screenshots/results retained locally; final results supersede them. Also corrected inherited 28px quote heading on phone to 24px.

Evidence retained in the task's `output/playwright/`: results.json, interactions.json, opening/full/scene PNGs and test scripts. This folder is deliberately outside the published repo. The downloaded skill is pinned at 75d81f74e83692add18cd7a8a8e078b8a887a579.

Feel check: curiosity → choice → quiet detail → spatial reveal → resolve matches the intended sequence. The event reveal carries the largest motion span; the inquiry remains stable and legible. Motion is CSS perspective on flat photography, not a 3D model of the furniture. No physical iPhone/Android or Safari testing; no claim of comprehensive accessibility certification or automated composited contrast-harness compliance. Text is placed on solid surfaces rather than photographs.

## Cinematic redesign verification
Seven-page sweep repeated at 1440×1000, 390×844, 360×640 and reduced-motion 390×844: no page errors, failed requests, broken requested images or horizontal overflow. Titles remain 28/24px.

Additional motion review samples both new scenes at 0%, 25%, 50%, 75% and 100% on 1440×1000, 768×1024, 390×844 and 360×640 (40 scene samples). The hero visibly changes composition through separate translations, rotations and scale; desktop/tablet gallery changes its visible event and perspective. Mobile gallery uses static document order with mild image depth instead of sticky lateral movement. Assertions verified motion pause, persistence after reload, resume, automatic system reduced-motion changes, and keyboard focus bringing the third desktop gallery item into view. All passed. A title overlap during hero expansion was found in visual review and corrected by giving the heading its own opaque top plane. Foreground photo labels fade early to avoid overlapping the fixed caption as those photos leave.

Evidence: `output/playwright/redesign-results.json`, `motion-review.json`, and `revised-*` scene screenshots in the task workspace. Previous upstream execution and physical-device limitations still apply. The revised source, rather than the first version's captures, is the current design.

## Sidebar image previews
Original public global.js inspected as text only: `.nav-menu > li` mouseenter hides the previous `#mainPhoto` panel and fades the matching menu-ID panel in over 200ms. New implementation uses existing local category imagery, decoded preload and 260ms overlay crossfade; no upstream code executed. Seven category focus previews verified in Chrome, Enter navigates normally. At 390px, Dining changes image with no overflow and mobile Seating navigates in one click. Independent Node event harness passed seven mouse mappings, rapid latest-request ordering, ignored touch pointer entry, keyboard activation and reduced-motion no-animation branch. Pointer hover itself was tested through the event harness, not native pointer movement (browser control API does not expose hover). Existing pause also cancels the transition. Shared selector and thumbnails untouched.

## Linked hero refinement
Removed the three redundant setting buttons. Initial Seating state, seven category images, active styling, accessible link names and both hrefs commit together after image decode; latest-request guard remains. No pointer-leave reset. Chrome checked initial state and all seven focus destinations, image click to Groups, mobile text-link navigation to Seating and no overflow. All local references resolve; category fragment IDs exist in the home page. Existing mockup scope is preserved: full Seating catalog, category-specific home previews for Tables/Bars/Misc/Outdoor/Tableware, and Groups section. Node event tests passed rapid requests, touch handling, no reduced-motion animation and synchronized hrefs. Screenshot refreshed because removing the controls changes the initial view; prior thumbnail publication was confirmed in remote history before this update.

## Remove manual motion control
Removed the button from all seven pages, its CSS and event handlers. Runtime no longer reads or writes the legacy manual pause storage key, so an old paused value cannot suppress motion. System reduced-motion preference remains the only motion override. Browser checked all seven pages: no button, motion enabled, no console errors; mobile 390px had no horizontal overflow. Event harness with storage access made to throw passed, including hero categories/links and reduced-motion no-fade branch. Refreshed only the fourth thumbnail and its cache marker to reflect the removed visible button. Native system-setting emulation remains untested; reduced-motion branching tested in the event harness.
