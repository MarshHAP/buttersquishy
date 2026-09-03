# Store setup — The Squishy Store (w31hnj-r1.myshopify.com)

Everything below is done automatically by the session that created this repo, but is documented
so it can be reproduced on another store.

## 1. Product

One product, handle `squishy`, a single variant at £9.99 (compare-at £19.99). Media: the transparent butter cutout first, then the ten numbered PDP feature images (all on the `main` branch).
Data in [`product.json`](product.json) (mirrors the Shopify `productSet` input) and
[`products.csv`](products.csv) (Shopify admin CSV import).

## 2. Automatic discounts (tiered bundle pricing)

Two **automatic** "Buy X get Y" discounts, applied to the `squishy` product only, that do **not**
combine with other product discounts. Shopify then applies whichever gives the bigger saving.

| Title | Customer buys | Customer gets | Result |
| --- | --- | --- | --- |
| `2 FOR £12.99 — Mix & Match Squishies` | 1 × squishy | 1 × squishy at **69.97 %** off | 9.99 + 3.00 = £12.99 |
| `ANY 3 FOR £19.99 — Mix & Match Squishies` | 2 × squishy | 1 × squishy at **99.9 %** off | 9.99 + 9.99 + 0.01 = £19.99 |

Resulting basket totals: 1 → £9.99, 2 → £12.99, 3 → £19.99, 4 → £25.98, 5 → £35.97, 6 → £38.97.
(Shopify applies whichever single automatic discount saves more: "any 3" wins at exactly three, the pair
discount wins at four or more.)

## 3. Theme settings

Online Store → Themes → Customize → Theme settings → **Bundle offer**:

- Price for any 2 (pence): `1299`
- Price for any 3 (pence): `1999`

## 4. Navigation

Main menu: Home `/` · Shop `/products/squishy` · FAQ `/#faq` · Contact `/#contact`.
(The header and footer fall back to these links automatically if no menu is assigned.)

## 5. Images to upload (optional, theme works without them)

- Hero background slides ×4 (lifestyle photos) — Home › Hero section
- Logo + favicon — already shipped in the theme assets (`assets/logo.png`, `assets/favicon.png`); override under Theme settings › Branding if needed
- One square photo per variant — Products › Squishy › variant images
