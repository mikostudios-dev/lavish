# Lavish — Concept 03 / Spatial

Independent presentation at `mockups/v3/index.html`, linked from `mockups/index.html`. Original and v2 files are preserved.

Seven complete pages: home, seating catalog, Abundant Chair, quote, gallery, About and Contact. Existing authorized local imagery and source-backed product data are reused; there are no public prices, external services or real form submissions. The separate `lavish-quote-v3` storage key isolates this concept's selections.

The visual system uses small sans-serif headings (24–28 px), rounded photographic panels, a dimensional chair study and layered event imagery. Scroll-linked transforms use a passive listener, one animation frame per update and intersection observation. No scroll interception, WebGL, looping animation or content hiding. Motion is reduced on mobile and disabled for `prefers-reduced-motion`, or with the visible motion control (session preference). Everything remains readable and navigable without motion.

`foundation.css` and shared component styles are local copies of the v2 base; `v3.css` supplies the new visual system. `collections.js` preserves category previews. `motion.js` only controls decorative transforms. Serve the repository root, retaining the two-level `../../assets/` paths.

The catalog is a snapshot. Keyword color/material filters are based on published names/descriptions, not a verified attribute taxonomy. Only Abundant Chair has a complete product detail page; other pieces have preview dialogs and quote actions. Forms prepare local previews/downloads only. Photography uses existing source resolution; transformed photos are flat images presented in perspective, not 3D product models. All pages remain noindex/nofollow.

## Validation — 2026-10-20

Reviewed in Chrome on the iMac at 1440, 768, 390 and 320 px viewport widths across all seven pages. No horizontal overflow; heading size is 28 px at 1440 and 24 px at the smaller tested widths. Local links/assets and unique HTML IDs passed static checks. Catalog search, product quantity, quote preview/removal, gallery lightbox, contact brief preview and mobile navigation/Escape were exercised. Scroll changes the image transforms; pause removes them. Chrome's reduced-motion emulation selected the disabled “Reduced motion” control. No external submissions were made. Existing concepts remain unchanged.
