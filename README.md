# The Squishy Store — Shopify theme

Custom Shopify Online Store 2.0 theme for **The Squishy Store**, selling slow-rise stress-relief squeezies.
It mirrors the section-for-section structure of the Balloon Friends store, rebranded in royal blue and butter yellow.

## Storefront structure

| Page | Sections (in order) |
| --- | --- |
| Every page | Announcement bar · Header (logo, Home / Shop / FAQ / Contact, basket) · Footer (brand + payment icons, quick links, newsletter) |
| Home (`templates/index.json`) | Flying butter squishies background layer · Hero slideshow with trust strip · Featured bundle (gallery + tap-to-build bundle box) · Squish parade · Comparison table · Icon bar · Testimonials · FAQ · Contact form |
| Product (`templates/product.json`) | Main product (gallery + bundle box + description) · Icon bar · Testimonials · FAQ |
| Cart | Bundle-progress banner, line items, quantity controls, discount rows, checkout |
| Also | Collection, list-collections, search, page, contact page, blog, article, 404, password, gift card |

## Pricing model

| Quantity | Price | Per item |
| --- | --- | --- |
| 1 | £9.99 | £9.99 |
| Any 2 | £16.99 | £8.50 |
| Any 3 | £19.99 | £6.66 |

The single price lives on the product. The 2-tier and 3-tier prices are theme settings
(`bundle_tier2_price`, `bundle_tier3_price`, in pence) and must match the two automatic discounts
described in [`store-setup/README.md`](store-setup/README.md). The bundle builder in
`snippets/bundle-buy-box.liquid` and `assets/theme.js` mirrors that discount logic so shoppers see the
exact checkout price before they add to basket.

## Files

```
assets/       base.css, theme.js
config/       settings_schema.json, settings_data.json
layout/       theme.liquid, password.liquid
locales/      en.default.json
sections/     flying-butter, hero, featured-bundle, squish-parade, comparison-table, icon-bar,
              testimonials, faq, contact-form, image-with-text, header, footer,
              announcement-bar, main-* (product, cart, collection, search, page, …)
snippets/     butter-squishy (inline SVG), brand-wordmark, squishy-emoji, bundle-buy-box, product-card, product-gallery
templates/    index, product, cart, collection, … (JSON) and gift_card.liquid
store-setup/  product data + admin setup steps
```

## Local development

```bash
npm install -g @shopify/cli
shopify theme dev --store w31hnj-r1.myshopify.com
shopify theme check
shopify theme push --unpublished
```

## Placeholder images

Every image slot degrades gracefully: variants without photos show an emoji from
`snippets/squishy-emoji.liquid`, and the hero falls back to a butter-yellow gradient with floating
squishies. Upload photos in the theme editor (hero slides, logo, favicon) and on the product
(one image per variant) to replace them.
