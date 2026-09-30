# Lavish Event Rentals — design presentation

Static HTML/CSS/JavaScript mockup prepared by Miko Studios for review before a WordPress migration.

## Pages
- `index.html`: home
- `seating.html`: real Seating collection and original subcategory filters
- `product-abundant-chair.html`: representative product page with verified details and gallery
- `quote.html`: rental inquiry list and quote request preview

Choose products and quantities with **Add to quote**, edit the selection, then complete the event form to review a rental quote request. The demo does not send messages, reserve inventory or take payments. Selected products are saved in browser localStorage; contact form data is not persisted.

## Local preview
Run `python3 -m http.server 8766` in this folder and open `http://127.0.0.1:8766/`.

## WordPress handoff
Reuse the shared header/footer and CSS components. Replace static cards with the existing product taxonomy/query and verified product fields. Connect the final quote request to the approved inquiry workflow, validating product IDs and quantities server-side. Show delivery success only after the actual submission succeeds. The source website uses a custom WordPress theme; no page builder is assumed.

Photos, logo, product names and dimensions originate from the public Lavish Event Rentals website. The catalog is a presentation snapshot, not an availability feed. This is a client design concept, not the live Lavish website.
