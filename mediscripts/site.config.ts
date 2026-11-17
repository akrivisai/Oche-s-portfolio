/**
 * MediScripts — every editable value for the landing page lives here.
 *
 * Anything in [SQUARE_BRACKETS] is a placeholder that must be replaced
 * before launch. Search this file for "[" and "TODO" to find them all.
 */

export const site = {
  name: 'MediScripts',
  maker: 'Akrivis',
  founder: 'Ameh Matthew Oche',
  url: 'https://[DOMAIN]', // TODO: production domain, e.g. https://mediscripts.ng
  year: new Date().getFullYear(),

  seo: {
    title: 'MediScripts: Bible Verse Memory Cards for Kids (Ages 6–9)',
    description:
      '32 beautifully illustrated cards that link Bible verses to everyday objects, so your child remembers Scripture every time they see a lamp, honey or a mirror at home. Ages 6–9.',
  },

  /* ---------- Product ---------- */
  product: {
    name: 'The Word Pack',
    edition: 'Ages 6–9',
    cards: 32,
    // TODO: final price. ₦5,000 is under consideration. Shown wherever the price appears.
    priceDisplay: '₦[PRICE]',
    // Set to a number (e.g. 5000) once the price is final. Turns on Product structured data.
    priceValue: null as number | null,
    currency: 'NGN',
  },

  /* ---------- Ordering ---------- */
  checkout: {
    // 'whatsapp' (default) | 'link' (Paystack / Flutterwave / Shopify URL)
    mode: 'whatsapp' as 'whatsapp' | 'link',
    // International format, digits only, no "+" — e.g. 2348012345678
    whatsappNumber: '2349165485794',
    // Used when mode is 'link'. {qty} is replaced with the chosen quantity if present.
    paymentUrl: '',
    // Quantity choices on the order buttons. The last one means "this many or more".
    quantities: [1, 2, 3],
  },

  // Optional banner above the header, e.g. a pre-order offer.
  launchBanner: {
    show: false,
    text: 'First print run: limited copies. Pre-order now.',
  },

  /* ---------- Contact ---------- */
  contact: {
    whatsappDisplay: '0916 548 5794',
    instagram: '[INSTAGRAM]', // handle without @
    tiktok: '[TIKTOK]', // handle without @
    email: '[EMAIL]',
  },

  delivery: {
    // TODO: delivery regions, fees and timelines.
    summary: '[DELIVERY_INFO]',
  },

  payment: {
    // TODO: confirm once checkout is decided.
    summary:
      'You can pay by bank transfer or card. We confirm the payment details with you on WhatsApp when you order.',
  },

  /* ---------- Scripture ---------- */
  translation: {
    abbr: 'NLT',
    name: 'New Living Translation',
    // TODO: confirm translation choice and permissions before launch.
    attribution: 'Scripture quotations taken from the Holy Bible, New Living Translation.',
  },

  /* ---------- Forms (waitlist + bulk enquiries) ---------- */
  forms: {
    // POSTed as JSON. '/api/lead' forwards to the LEAD_WEBHOOK_URL env var
    // (see docs/lead-webhook.gs). If the post fails, the visitor is offered
    // WhatsApp with their details pre-filled, so no lead is lost.
    endpoint: '/api/lead',
  },

  /* ---------- Ad pixels (off until an ID is set) ---------- */
  pixels: {
    metaPixelId: '',
    tiktokPixelId: '',
  },

  /* ---------- Feature flags ---------- */
  flags: {
    showTestimonials: false, // stays hidden until real testimonials are added below
    showHeroVideo: false, // turn on once /public/video/hero-loop.* exist
    // Shows small "placeholder" labels on mock visuals. Turn off once real images are in.
    showPlaceholderLabels: true,
  },

  /* ---------- Research ---------- */
  research: {
    // TODO: verify source before launch. Leave figure as null to show no number.
    faithWindowFigure: null as string | null,
    // TODO: verify citation before launch.
    faithWindowSource: 'Barna Group research',
  },
};

/* ---------- Images ---------- *
 * Drop the real files into /public/images and /public/video, then set the
 * paths here. Anything left as '' shows a clearly labelled placeholder.
 */
export const images = {
  heroBoxAndCards: '', // '/images/hero-box-and-cards.jpg' — a real photo of the box + fanned cards, used instead of the pack render when set
  familyPlaying: '', // '/images/family-playing.jpg'
  handHoldingCard: '', // '/images/hand-holding-card.jpg'
  boxDetailFoil: '', // '/images/box-detail-foil.jpg'
  heroVideoMp4: '/video/hero-loop.mp4',
  heroVideoWebm: '/video/hero-loop.webm',
  heroVideoPoster: '/images/hero-poster.jpg',
  // Real footage of the printed cards (trimmed from the founder's phone video).
  realCardsVideo: '/video/real-cards.mp4',
  realCardsPoster: '/images/real-cards-poster.jpg',
  // The wordmark is drawn in code (components/Visuals.tsx → Wordmark), so it stays sharp.
  // Front of the Word Pack box (background removed).
  packFront: '/images/word-pack-box.png',
  packFrontSize: { width: 746, height: 1297 },
};

/* ---------- Cards ---------- */
export type Card = {
  id: string;
  object: string;
  ref: string;
  refShort: string; // as printed on the card back, e.g. 'PSA. 119:103'
  verse: string;
  cardImage: string; // '/images/card-lamp.png' — flat export from the card generator
  cardBackImage: string; // set if the card has a printed back
  realImage: string; // '/images/real-lamp-living-room.jpg' — the real object in a modern home
  realAlt: string;
  childLine: string; // what a child says when they spot it
  glyph: 'torch' | 'honey' | 'mirror' | 'bulb';
};

// Real pairings from the Word Pack. Add more as card files arrive.
export const cards: Card[] = [
  {
    id: 'torch',
    object: 'Torch',
    ref: 'Psalm 119:105',
    refShort: 'PSA. 119:105',
    verse: 'Your word is a lamp to guide my feet and a light for my path.',
    cardImage: '/images/card-torch.jpg', // photo of the printed card
    cardBackImage: '/images/card-torch-back.jpg', // photo of the printed card
    realImage: '',
    realAlt: 'A torch on a shelf in a modern, well-kept living room',
    childLine: 'Mummy, a torch!',
    glyph: 'torch',
  },
  {
    id: 'light-bulb',
    object: 'Light bulb',
    ref: 'Luke 24:45',
    refShort: 'LUK. 24:45',
    verse: 'Then he opened their minds to understand the Scriptures.',
    cardImage: '/images/card-light-bulb.jpg', // photo of the printed card
    cardBackImage: '/images/card-light-bulb-back.jpg', // photo of the printed card
    realImage: '',
    realAlt: 'A light bulb glowing above a dining table in a bright, modern home',
    childLine: 'Mummy, a light bulb!',
    glyph: 'bulb',
  },
  {
    id: 'honey',
    object: 'Honey',
    ref: 'Psalm 119:103',
    refShort: 'PSA. 119:103',
    verse: 'How sweet your words taste to me; they are sweeter than honey.',
    cardImage: '',
    cardBackImage: '/images/card-honey-back.jpg', // photo of the printed card
    realImage: '',
    realAlt: 'A jar of honey on a bright breakfast table',
    childLine: 'Daddy, honey!',
    glyph: 'honey',
  },
  {
    id: 'mirror',
    object: 'Mirror',
    ref: 'James 1:22',
    refShort: 'JAS. 1:22',
    verse: 'But don’t just listen to God’s word. You must do what it says.',
    cardImage: '',
    cardBackImage: '',
    realImage: '',
    realAlt: 'A round mirror in a bright, modern bedroom',
    childLine: 'Look, a mirror!',
    glyph: 'mirror',
  },
];

export const verses = {
  anchor: {
    ref: 'Proverbs 22:6',
    text: 'Direct your children onto the right path, and when they are older, they will not leave it.',
  },
  guide: {
    ref: 'Psalm 119:11',
    text: 'I have hidden your word in my heart, that I might not sin against you.',
  },
};

/* ---------- Testimonials ---------- *
 * Real ones only. The section stays hidden while this is empty or the flag is off.
 */
export const testimonials: { quote: string; name: string; detail: string }[] = [];

/* ---------- Helpers ---------- */

const isPlaceholder = (v: string) => !v || v.startsWith('[');

export function orderUrl(qty = 1, plus = false): string {
  const { checkout, product } = site;
  if (checkout.mode === 'link' && checkout.paymentUrl) {
    return checkout.paymentUrl.replace('{qty}', String(qty));
  }
  const count = plus ? `${qty} or more` : String(qty);
  const text = `Hi MediScripts, I'd like to order ${product.name.replace(/^The /, 'the ')} (${product.edition}). Quantity: ${count}.`;
  const number = isPlaceholder(checkout.whatsappNumber) ? '' : checkout.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function whatsappUrl(text: string): string {
  const n = site.checkout.whatsappNumber;
  return `https://wa.me/${isPlaceholder(n) ? '' : n}?text=${encodeURIComponent(text)}`;
}

export function socialUrl(kind: 'instagram' | 'tiktok'): string | null {
  const handle = site.contact[kind];
  if (isPlaceholder(handle)) return null;
  return kind === 'instagram' ? `https://instagram.com/${handle}` : `https://www.tiktok.com/@${handle}`;
}

export function emailUrl(): string | null {
  return isPlaceholder(site.contact.email) ? null : `mailto:${site.contact.email}`;
}
