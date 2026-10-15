# Lavish Event Rentals — design presentation

Static HTML/CSS/JavaScript mockup prepared by Miko Studios for review before a WordPress migration.

## Pages
- `index.html`: home
- `seating.html`: real Seating collection and original subcategory filters
- `product-abundant-chair.html`: representative product page with verified details and gallery
- `quote.html`: rental inquiry list and quote request preview
- `gallery.html`: masonry event gallery,12 selected full-size photographs and lightbox
- `about.html`: company overview based on the published Lavish story
- `contact.html`: verified locations/contacts and local event-brief preview

Choose products and quantities with **Add to quote**, edit the selection, then complete the event form to review a rental quote request. The demo does not send messages, reserve inventory or take payments. Selected products are saved in browser localStorage; contact form data is not persisted.

## Local preview
Run `python3 -m http.server 8766` in this folder and open `http://127.0.0.1:8766/`.

## WordPress handoff
Reuse the shared header/footer and CSS components. Replace static cards with the existing product taxonomy/query and verified product fields. Connect the final quote request to the approved inquiry workflow, validating product IDs and quantities server-side. Show delivery success only after the actual submission succeeds. The source website uses a custom WordPress theme; no page builder is assumed.

Photos, logo, product names and dimensions originate from the public Lavish Event Rentals website, except the Bars card image supplied by the user. Gallery image URLs, original dimensions and published credits are recorded in `assets/gallery/sources.json`. The gallery preserves image proportions and loads responsive WebP previews lazily; full images load when opened. The catalog is a presentation snapshot, not an availability feed. This is a client design concept, not the live Lavish website.


## Collection search
Seating searches product names, public catalog descriptions and published details in place, combined with category filters. The source text is a dated snapshot; missing descriptions do not imply inferred materials. Refresh from verified product fields during the WordPress migration.


## Independent content pages

Gallery, About and Contact share `content-pages.css` and `content-pages.js`; existing collection, product and quote scripts remain separate. The native dialog gallery supports keyboard navigation, Escape, visible controls and source credits. Contact prepares a local review/download only; no external form submission or success delivery is simulated. All pages retain demo noindex.

The public WordPress stylesheet identifies the custom **Lavish Event Rentals CMS** theme. Its actual administrator editor/constructor and production form integrations require inspection before migration; no Elementor or other builder is assumed.
