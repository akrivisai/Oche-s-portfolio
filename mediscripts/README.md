# MediScripts landing page

Landing page for **MediScripts, The Word Pack (Ages 6–9)**: children's Bible-verse
memory cards that link each verse to an everyday object.

Live: https://mediscripts-landing.vercel.app (Vercel project `mediscripts-landing`,
root directory `mediscripts/`).

## Change things

Almost everything lives in **`site.config.ts`**:

| What | Where in `site.config.ts` |
| --- | --- |
| Price | `product.priceDisplay` (and `product.priceValue` once final, which turns on Product structured data) |
| WhatsApp order number | `checkout.whatsappNumber` (international, digits only) and `contact.whatsappDisplay` |
| Switch to a payment link | `checkout.mode = 'link'` and `checkout.paymentUrl` |
| Launch / pre-order banner | `launchBanner` |
| Instagram, TikTok, email | `contact` |
| Delivery and payment FAQ answers | `delivery.summary`, `payment.summary` |
| Meta / TikTok pixels | `pixels` (nothing loads until an ID is set) |
| Testimonials | `testimonials` + `flags.showTestimonials` (real ones only) |
| Cards in the gallery / reveal | `cards` (add `cardImage`, `cardBackImage`, `realImage` paths) |
| Photos | `images` (empty paths show labelled placeholders) |

Search the file for `[` and `TODO` to find what is still a placeholder.

## Images

Put files in `public/images` (and video in `public/video`), then set the path in
`site.config.ts`. Next.js serves them as WebP/AVIF at the right size.

Still wanted: a real photo of the box with cards fanned out, a family photo, a
child's hand holding a card, and real-life photos of each object at home (for the
card-to-object reveal).

## Leads (waitlist + bulk enquiries)

Forms post to `/api/lead`, which forwards to the `LEAD_WEBHOOK_URL` environment
variable. Until that is set, visitors are handed to WhatsApp with their details
pre-filled, so nothing is lost. To collect leads in a Google Sheet, follow the
steps at the top of `docs/lead-webhook.gs`.

## Run locally

```bash
npm install
npm run dev
```
