import Image from 'next/image';
import { CardToLife } from '@/components/CardToLife';
import { Gallery } from '@/components/Gallery';
import { LeadForm } from '@/components/LeadForm';
import { OrderBox, StickyOrder } from '@/components/Order';
import { RealVideo } from '@/components/RealVideo';
import { CardFace, PackShot, Photo, Wordmark } from '@/components/Visuals';
import {
  cards,
  emailUrl,
  images,
  site,
  socialUrl,
  testimonials,
  verses,
  whatsappUrl,
} from '@/site.config';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Icon({ name }: { name: 'see' | 'say' | 'spot' | 'hunt' | 'flip' | 'fridge' }) {
  const p = { viewBox: '0 0 48 48', fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;
  switch (name) {
    case 'see':
      return <svg {...p}><path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24z" /><circle cx="24" cy="24" r="6" /></svg>;
    case 'say':
      return <svg {...p}><path d="M8 10h32v22H22l-9 8v-8H8z" /><path d="M16 19h16M16 25h10" /></svg>;
    case 'spot':
      return <svg {...p}><path d="M6 22L24 8l18 14" /><path d="M11 19v21h26V19" /><circle cx="24" cy="29" r="5" /><path d="M28 33l4 4" /></svg>;
    case 'hunt':
      return <svg {...p}><circle cx="20" cy="20" r="11" /><path d="M28 28l12 12" /><path d="M16 20h8" /></svg>;
    case 'flip':
      return <svg {...p}><rect x="6" y="10" width="16" height="28" rx="3" /><rect x="26" y="10" width="16" height="28" rx="3" /><path d="M30 6l4-3 4 3" /></svg>;
    case 'fridge':
      return <svg {...p}><rect x="11" y="4" width="26" height="40" rx="4" /><path d="M11 18h26M16 10v4M16 24v6" /><rect x="22" y="24" width="10" height="13" rx="1.5" /></svg>;
  }
}

export default function Page() {
  const [first] = cards;
  const ig = socialUrl('instagram');
  const tt = socialUrl('tiktok');
  const mail = emailUrl();
  const showTestimonials = site.flags.showTestimonials && testimonials.length > 0;

  const productLd =
    site.product.priceValue !== null
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `${site.name} ${site.product.name} (${site.product.edition})`,
          brand: { '@type': 'Brand', name: site.name },
          description: site.seo.description,
          offers: {
            '@type': 'Offer',
            price: site.product.priceValue,
            priceCurrency: site.product.currency,
            availability: 'https://schema.org/PreOrder',
          },
        }
      : null;

  return (
    <>
      {site.launchBanner.show ? <div className="banner">{site.launchBanner.text}</div> : null}

      <header className="top">
        <div className="wrap top-inner">
          <a href="#hero" className="brand" aria-label={`${site.name} home`}>
            <Wordmark className="top-logo" />
            <span className="brand-by">by {site.maker}</span>
          </a>
          <nav className="top-nav" aria-label="Page sections">
            <a href="#how">How it works</a>
            <a href="#inside">Inside the box</a>
            <a href="#churches">Churches</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#order" className="btn btn-primary btn-sm">Order</a>
        </div>
      </header>

      <main>
        {/* 1 · Hero */}
        <section className="hero" id="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">The Word Pack · {site.product.edition}</p>
              <h1>
                Every <span className="hl">lamp</span> in your house can remind your child of God’s&nbsp;Word.
              </h1>
              <p className="hero-sub">
                {site.product.cards} beautifully illustrated cards that link Bible verses to everyday objects,
                so your child remembers Scripture every time they see them. {site.product.edition}.
              </p>
              <OrderBox />
              <a href="#how" className="link-arrow">See how it works ↓</a>
            </div>
            <div className="hero-visual">
              <PackShot priority />
            </div>
          </div>
          <div className="wrap">
            <ul className="facts">
              <li><b>{site.product.cards}</b> illustrated cards</li>
              <li><b>1</b> verse per card ({site.translation.abbr})</li>
              <li><b>Guide card</b> with games</li>
              <li><b>Gift-ready</b> box</li>
            </ul>
          </div>
        </section>

        {/* 2 · The problem */}
        <section className="section problem">
          <div className="wrap problem-grid">
            <div>
              <p className="eyebrow">Sound familiar?</p>
              <h2>Learned on Sunday. Gone by Wednesday.</h2>
              <p className="lead">
                It isn’t that children can’t learn the verse. They can, and they do. But memory needs
                reminders, and a verse on a Sunday school handout has nothing to bring it back.
              </p>
              <div className="week" aria-label="A verse learned on Sunday fades a little more each day">
                {DAYS.map((d, i) => (
                  <span key={d} className="week-day" style={{ ['--fade' as string]: Math.max(0.12, 1 - i * 0.24) }}>
                    <b>{d}</b>
                    <i aria-hidden />
                  </span>
                ))}
              </div>
              <p className="problem-turn">
                MediScripts puts the reminders <em>in your home</em>, on the objects your child sees every day.
              </p>
            </div>
            <Photo
              src={images.familyPlaying}
              alt="A young, stylish Nigerian mum and dad laughing with their children over MediScripts cards in a bright, modern sitting room"
              file="family-playing.jpg"
              className="problem-photo"
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </div>
        </section>

        {/* 3 · How it works */}
        <section className="section how" id="how">
          <div className="wrap">
            <div className="head">
              <p className="eyebrow">How it works</p>
              <h2>See it. Say it. Spot it.</h2>
            </div>
            <ol className="steps">
              <li>
                <span className="step-icon"><Icon name="see" /></span>
                <h3><span>1</span> See it</h3>
                <p>Pick a card. Look at the object and read the verse together.</p>
              </li>
              <li>
                <span className="step-icon"><Icon name="say" /></span>
                <h3><span>2</span> Say it</h3>
                <p>Say the verse together until your child can say it back to you.</p>
              </li>
              <li>
                <span className="step-icon"><Icon name="spot" /></span>
                <h3><span>3</span> Spot it</h3>
                <p>
                  Later, your child spots the real object at home, and the verse comes back. That’s
                  meditation, started by a moment in their own home.
                </p>
              </li>
            </ol>
            <CardToLife />
          </div>
        </section>

        {/* 4 · Inside the box */}
        <section className="section inside" id="inside">
          <div className="wrap inside-grid">
            <div>
              <p className="eyebrow">Inside the box</p>
              <h2>Made to be handled, loved and kept.</h2>
              <ul className="inside-list">
                <li><b>{site.product.cards} illustrated cards.</b> Each one has its own object, picture and verse.</li>
                <li><b>A guide card.</b> How to use the pack, plus games for ages 6–9, closing with Psalm 119:11.</li>
                <li><b>A bright, sturdy flashcard box</b> that keeps every card together and is ready to give as a gift.</li>
                <li><b>Durable, gloss-finished cards</b> with rounded corners, made for little hands.</li>
              </ul>
              <div className="scale">
                <svg viewBox="0 0 200 170" className="scale-svg" aria-hidden>
                  <rect x="20" y="22" width="70" height="120" rx="7" fill="#fff" stroke="var(--card-blue)" strokeWidth="4" />
                  <rect x="112" y="10" width="72" height="150" rx="11" fill="none" stroke="var(--ink-soft)" strokeWidth="3" strokeDasharray="5 5" />
                  <text x="55" y="158" textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight="600">Card</text>
                  <text x="148" y="90" textAnchor="middle" fontSize="11" fill="var(--ink-soft)">Phone</text>
                </svg>
                <p>
                  <b>Tarot size: 70 × 120 mm.</b> About the size of a phone. Big enough for bold pictures,
                  small enough for a child to hold.
                </p>
              </div>
            </div>
            <figure className="real-clip">
              <div className="real-frame">
                <RealVideo
                  src={images.realCardsVideo}
                  poster={images.realCardsPoster}
                  label="Real MediScripts cards being fanned out on a table: Light bulb, Textbook, Bell, Gift box and Padlock"
                />
              </div>
              <figcaption>The real cards: printed, not mock-ups.</figcaption>
            </figure>
          </div>
          {images.handHoldingCard || images.boxDetailFoil ? (
            <div className="wrap inside-photos">
              {images.handHoldingCard ? (
                <Photo src={images.handHoldingCard} alt="A child’s hand holding a MediScripts card" file="hand-holding-card.jpg" sizes="(max-width: 700px) 100vw, 50vw" />
              ) : null}
              {images.boxDetailFoil ? (
                <Photo src={images.boxDetailFoil} alt="Close-up detail of the MediScripts Word Pack box" file="box-detail-foil.jpg" sizes="(max-width: 700px) 100vw, 50vw" />
              ) : null}
            </div>
          ) : null}
        </section>

        {/* 5 · Gallery */}
        <section className="section gallery-sec" aria-labelledby="gallery-h">
          <div className="wrap">
            <div className="head head-row">
              <div>
                <p className="eyebrow">A look at the cards</p>
                <h2 id="gallery-h">One object. One verse. Every card.</h2>
              </div>
              <p className="head-note">Tap a card to see it up close and flip it for the verse.</p>
            </div>
            <Gallery />
          </div>
        </section>

        {/* 6 · Ways to play */}
        <section className="section play">
          <div className="wrap">
            <div className="head">
              <p className="eyebrow">Ways to play</p>
              <h2>Five minutes a day. Lots of giggles.</h2>
            </div>
            {/* TODO: founder to confirm the exact wording from the guide card. */}
            <ul className="play-grid">
              <li className="play-tile play-a">
                <span className="play-icon"><Icon name="hunt" /></span>
                <h3>Object hunt</h3>
                <p>Show a card. Your child runs to find that object in the house and says the verse when they find it.</p>
              </li>
              <li className="play-tile play-b">
                <span className="play-icon"><Icon name="flip" /></span>
                <h3>Flip &amp; recall</h3>
                <p>Lay the cards face down. Flip one over and say the verse from the picture alone.</p>
              </li>
              <li className="play-tile play-c">
                <span className="play-icon"><Icon name="fridge" /></span>
                <h3>Verse of the week</h3>
                <p>Put one card on the fridge. Whoever spots that object around the house says the verse.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* 7 · Why it works */}
        <section className="section why">
          <div className="wrap">
            <div className="head">
              <p className="eyebrow">Why it works</p>
              <h2>How memory works, and what Scripture says.</h2>
              <p className="lead">You’re already teaching them. MediScripts helps it stick.</p>
            </div>
            <div className="why-grid">
              <article className="why-tile">
                <div className="why-vis why-vis-pic" aria-hidden>
                  <CardFace card={first} className="why-mini" label={false} sizes="80px" />
                  <span className="why-vs">vs</span>
                  <span className="why-words">{first.verse.split(' ').slice(0, 5).join(' ')}…</span>
                </div>
                <h3>Pictures stick</h3>
                <p>People remember pictures far better than words alone. Psychologists call it the picture superiority effect.</p>
              </article>
              <article className="why-tile">
                <div className="why-vis why-vis-two" aria-hidden>
                  <span className="pill pill-blue">Picture</span>
                  <span className="plus">+</span>
                  <span className="pill pill-gold">Words</span>
                  <span className="eq">=</span>
                  <span className="pill pill-navy">Two ways to remember</span>
                </div>
                <h3>Two paths are better than one</h3>
                <p>Learning a verse with a picture creates two memory paths, one visual and one verbal, so it’s easier to recall (dual-coding theory).</p>
              </article>
              <article className="why-tile">
                <div className="why-vis why-vis-home" aria-hidden>
                  {['Light bulb', 'Honey', 'Mirror', 'Torch', 'Clock'].map((o) => <span key={o}>{o}</span>)}
                </div>
                <h3>Home becomes the reminder</h3>
                <p>Each picture is an object your child sees every day, so the home keeps prompting the memory. Every sighting is a free review.</p>
              </article>
              <article className="why-tile">
                <div className="why-vis why-vis-window" aria-hidden>
                  <span className="age-bar"><i /></span>
                  <span className="age-labels"><b>4</b><b>14</b></span>
                </div>
                <h3>The early years matter most</h3>
                <p>
                  {site.research.faithWindowFigure
                    ? `${site.research.faithWindowFigure} `
                    : 'Most people who come to faith do so as children, between the ages of 4 and 14, often called the “4/14 Window”. '}
                  <span className="src">({site.research.faithWindowSource})</span>
                </p>
              </article>
              <article className="why-tile why-scripture">
                <blockquote>
                  “{verses.anchor.text}”
                  <cite>{verses.anchor.ref} ({site.translation.abbr})</cite>
                </blockquote>
                <p>
                  Deuteronomy 11:18–19 tells parents to talk about God’s words at home and on the road, at bedtime and
                  in the morning. That’s exactly what MediScripts helps you do.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 8 · Churches & schools */}
        <section className="section churches" id="churches">
          <div className="wrap churches-grid">
            <div>
              <p className="eyebrow eyebrow-gold">For churches &amp; schools</p>
              <h2>A pack for every child in your class.</h2>
              <p className="lead">
                Children’s church teachers, Sunday school coordinators and Christian schools can order in bulk
                for classes and departments. Tell us roughly how many you need and we’ll send pricing.
              </p>
              <a
                className="btn btn-gold-ghost"
                href={whatsappUrl("Hi MediScripts, I'd like bulk pricing for the Word Pack for our church/school.")}
                target="_blank"
                rel="noopener"
              >
                Or chat with us on WhatsApp
              </a>
            </div>
            <div className="form-card">
              <LeadForm kind="bulk" />
            </div>
          </div>
        </section>

        {/* 9 · The range */}
        <section className="section range" id="range">
          <div className="wrap">
            <div className="head">
              <p className="eyebrow">The MediScripts range</p>
              <h2>More packs, for every age, on the way.</h2>
              <p className="lead">
                Every pack has a theme, and every theme comes in three age editions, each with its own art style.
              </p>
            </div>
            <ul className="range-grid">
              <li className="range-card range-now">
                <span className="badge badge-live">Launching first</span>
                <h3>Word Pack</h3>
                <p className="range-age">Ages 6–9</p>
                <p>God’s Word itself: what it is, what it does, and why we keep it. Bright, expressive illustration.</p>
              </li>
              <li className="range-card range-25">
                <span className="badge">Coming soon</span>
                <h3>Word Pack</h3>
                <p className="range-age">Ages 2–5</p>
                <p>Friendly, flat cartoon art, warm primary colours and big rounded letters for little ones.</p>
              </li>
              <li className="range-card range-1012">
                <span className="badge">Coming soon</span>
                <h3>Word Pack</h3>
                <p className="range-age">Ages 10–12</p>
                <p>Semi-realistic, graphic-novel style in deeper, cooler tones. Grown-up enough for older kids.</p>
              </li>
              <li className="range-card range-prayer">
                <span className="badge">Coming soon</span>
                <h3>Prayer Pack</h3>
                <p className="range-age">All three ages</p>
                <p>Verses that teach children how and why to pray.</p>
              </li>
              <li className="range-card range-obey">
                <span className="badge">Coming soon</span>
                <h3>Obedience Pack</h3>
                <p className="range-age">All three ages</p>
                <p>Verses about listening, obeying and doing what God’s Word says.</p>
              </li>
            </ul>
            <div className="waitlist">
              <div>
                <h3>Be first to know</h3>
                <p>Join the waitlist and we’ll tell you the moment a new pack or age edition is ready.</p>
              </div>
              <LeadForm kind="waitlist" />
            </div>
          </div>
        </section>

        {/* 10 · Testimonials (hidden until real ones exist) */}
        {showTestimonials ? (
          <section className="section testimonials">
            <div className="wrap">
              <div className="head">
                <p className="eyebrow">From parents</p>
                <h2>What families are saying</h2>
              </div>
              <ul className="t-grid">
                {testimonials.map((t) => (
                  <li key={t.name}>
                    <blockquote>“{t.quote}”</blockquote>
                    <p><b>{t.name}</b> · {t.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* 11 · FAQ */}
        <section className="section faq" id="faq">
          <div className="wrap faq-grid">
            <div className="head">
              <p className="eyebrow">Questions</p>
              <h2>Good to know</h2>
            </div>
            <div className="faq-list">
              <details>
                <summary>What ages is it for?</summary>
                <p>The Word Pack is designed for ages 6–9: the pictures, the verses and the games on the guide card are all pitched for that age. Editions for ages 2–5 and 10–12 are coming soon.</p>
              </details>
              <details>
                <summary>Which Bible translation do you use?</summary>
                <p>The {site.translation.name} ({site.translation.abbr}). It’s clear and easy for children of this age to understand and say back.</p>
              </details>
              <details>
                <summary>How durable are the cards?</summary>
                <p>The cards are thick, gloss-finished and have rounded corners, so they stand up to everyday handling by children. They come in a sturdy box to keep them together.</p>
              </details>
              <details>
                <summary>Do you deliver across Nigeria? How long does it take?</summary>
                <p>{site.delivery.summary}</p>
              </details>
              <details>
                <summary>How do I pay?</summary>
                <p>{site.payment.summary}</p>
              </details>
              <details>
                <summary>Can my church or school order in bulk?</summary>
                <p>Yes. <a href="#churches">Request bulk pricing</a> and tell us roughly how many packs you need.</p>
              </details>
              <details>
                <summary>Does it make a good gift?</summary>
                <p>Yes. It comes in a bright, sturdy box that’s ready to give for birthdays, child dedications and Christmas.</p>
              </details>
            </div>
          </div>
        </section>

        {/* 12 · Final CTA */}
        <section className="final" id="order">
          <div className="wrap final-grid">
            <div className="final-visual">
              <PackShot className="pack-final" />
            </div>
            <div>
              <p className="eyebrow eyebrow-gold">The Word Pack · {site.product.edition}</p>
              <h2>Give your child a verse for every room.</h2>
              <p className="lead">{site.product.cards} cards, a guide card and a gift-ready box. Start this week.</p>
              <OrderBox dark />
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <div>
            <Wordmark variant="white" className="foot-logo" />
            <p>by {site.maker}</p>
          </div>
          <ul className="foot-links">
            <li><a href={whatsappUrl('Hi MediScripts!')} target="_blank" rel="noopener">WhatsApp: {site.contact.whatsappDisplay}</a></li>
            {ig ? <li><a href={ig} target="_blank" rel="noopener">Instagram</a></li> : null}
            {tt ? <li><a href={tt} target="_blank" rel="noopener">TikTok</a></li> : null}
            {mail ? <li><a href={mail}>Email</a></li> : null}
          </ul>
          <p className="foot-fine">
            {site.translation.attribution}
            <br />© {site.year} {site.name} by {site.maker}.
          </p>
        </div>
      </footer>

      <StickyOrder />

      {productLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      ) : null}
    </>
  );
}
