# Lavish — Concept 02

A separate, image-led design presentation at `mockups/v2/index.html`. The original root presentation is preserved. `mockups/index.html` links to both versions.

## Design

White canvas, black typography and footer, pale gray supporting panels, and the existing yellow accent. Large photographs, a quieter editorial hierarchy and concise English copy retain event-rental and Florida service context. Existing local photography, logo and licensed fonts are reused. The current logo remains provisional.

## Preview scope

- Home, Seating collection, Abundant Chair product detail, quote, gallery, About and Contact.
- 228 existing seating entries. Type filtering, text search and color/material keyword filters operate on the existing names and published descriptions. They are not a newly verified structured attribute taxonomy.
- Abundant Chair has the detailed product page; the other seating pieces have image previews and quote-list actions. Other collection categories have photo previews and a contextual contact link.
- Quote items use the separate `lavish-quote-v2` localStorage key. Contact details are not persisted. Quote and contact forms only prepare local previews/downloads; no email, payment, inventory reservation or server submission occurs.
- No public prices, fabricated testimonials, new product specifications, or external analytics.
- The About closing callout removed from the original is also absent here.
- Pages remain `noindex, nofollow`: this is a design demo, not a production launch or SEO performance claim.

Serve the repository root with `python3 -m http.server 8766`, then open `/mockups/v2/index.html`. Assets are referenced from `../../assets/`; keep this directory depth when publishing.
