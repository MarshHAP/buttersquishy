# The Squishy Store — Shopify theme

Custom Shopify Online Store 2.0 theme for **The Squishy Store**, selling the Butter Squishy™ — an ultra-realistic butter-stick stress squeezie.
It mirrors the section-for-section structure of the Balloon Friends store, rebranded in royal blue and butter yellow.

## Storefront structure

| Page | Sections (in order) |
| --- | --- |
| Every page | Announcement bar · Header (logo, Home / Shop / FAQ / Contact, basket) · Footer (brand + payment icons, quick links, newsletter) |
| Home (`templates/index.json`) | Flying butter squishies background layer · Hero slideshow with trust strip · Featured product (gallery + feature tiles + tiered buy box + Squeeze Me / See Me) · Squish parade · Comparison table · Icon bar · Testimonials · FAQ · Contact form |
| Product (`templates/product.json`) | Main product (thumbnail rail + gallery + feature tiles, accordions for description / FAQ / shipping, tiered buy box, Squeeze Me / See Me) · Icon bar · Testimonials |
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
described in [`store-setup/README.md`](store-setup/README.md). The buy box in
`snippets/buy-box.liquid` shows Buy One / Buy Two / Buy Three as radio tiers and adds that quantity of
the single variant; checkout applies the discount.

## Files

```
assets/       base.css, theme.js, butter-01.png … butter-10.png (transparent cutouts)
config/       settings_schema.json, settings_data.json
layout/       theme.liquid, password.liquid
locales/      en.default.json
sections/     flying-butter, hero, featured-product, squish-parade, comparison-table, icon-bar,
              testimonials, faq, contact-form, image-with-text, header, footer,
              announcement-bar, main-* (product, cart, collection, search, page, …)
snippets/     butter-image (10 PNG cutouts), buy-box, product-gallery, squeeze-me, icon, brand-wordmark, product-card
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

## Squeeze Me / See Me

`snippets/squeeze-me.liquid` renders two panels under the buy box. **Squeeze Me** is a floating butter
cutout that dimples where you tap and slowly rises back. **See Me** is a butter-shaped tile with a camera
icon; tapping it opens the phone's rear camera (via `getUserMedia`, so it needs HTTPS and permission)
and overlays the butter on the live view, where it can be dragged, pinch-resized and squeezed. It is a
camera overlay rather than world-tracked AR: the butter sits on top of the video, it is not occluded by
fingers.

## Placeholder images

Every image slot degrades gracefully: a product without photos shows the butter cutout, and the hero falls back to a butter-yellow gradient with floating
squishies. The hero banner, scrolling parade and flying background use the ten butter cutouts in `assets/`. Upload photos in the theme editor (hero slides, logo, favicon) and on the product
(one image per variant) to replace them.
