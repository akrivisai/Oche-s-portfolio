import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { site, type Card } from '@/site.config';

/* Object-name lettering in the card's multicolour style. */
const LETTER_COLOURS = ['#E5484D', '#F28C28', '#E3A800', '#2EA66B', '#2F6FE0', '#8E4EC6'];

export function MultiColour({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden style={{ color: LETTER_COLOURS[i % LETTER_COLOURS.length] }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Wordmark({ className, gold = false }: { className?: string; gold?: boolean }) {
  return (
    <span className={`wordmark${gold ? ' wordmark-gold' : ''}${className ? ` ${className}` : ''}`}>
      Medi
      <svg className="wordmark-heart" viewBox="0 0 24 22" aria-hidden>
        <path d="M12 21s-9-5.6-9-12A5 5 0 0 1 12 6a5 5 0 0 1 9 3c0 6.4-9 12-9 12z" fill="none" stroke="currentColor" strokeWidth="2.6" />
      </svg>
      Scripts
    </span>
  );
}

export function PlaceholderTag({ children }: { children: ReactNode }) {
  if (!site.flags.showPlaceholderLabels) return null;
  return <span className="ph-tag">{children}</span>;
}

/* ---------- Placeholder object drawings (flat, outlined) ---------- *
 * Stand-ins until the real card art is exported. Not the real illustrations.
 */
const OUT = '#1D2140';

export function Glyph({ kind, className }: { kind: Card['glyph']; className?: string }) {
  const common = { className, viewBox: '0 0 120 120', 'aria-hidden': true } as const;
  if (kind === 'torch') {
    return (
      <svg {...common}>
        <path d="M78 34L112 6v58z" fill="#F7C948" opacity="0.45" transform="rotate(-6 78 34)" />
        <g transform="rotate(40 60 62)">
          <path d="M40 18h40l-6 24H46z" fill="#F28C28" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M64 18h16l-6 24h-10z" fill="#D9701A" />
          <path d="M40 18h40l-6 24H46z" fill="none" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
          <ellipse cx="60" cy="18" rx="20" ry="6" fill="#FFF1B8" stroke={OUT} strokeWidth="3.5" />
          <rect x="46" y="42" width="28" height="62" rx="6" fill="#2F6FE0" stroke={OUT} strokeWidth="3.5" />
          <path d="M62 42h6a6 6 0 0 1 6 6v50a6 6 0 0 1-6 6h-6z" fill="#1F55B8" />
          <rect x="46" y="42" width="28" height="62" rx="6" fill="none" stroke={OUT} strokeWidth="3.5" />
          <rect x="54" y="56" width="12" height="16" rx="4" fill="#F5B800" stroke={OUT} strokeWidth="3" />
          <path d="M46 92h28" stroke={OUT} strokeWidth="3" />
        </g>
      </svg>
    );
  }
  if (kind === 'honey') {
    return (
      <svg {...common}>
        <rect x="36" y="20" width="44" height="12" rx="4" fill="#E5484D" stroke={OUT} strokeWidth="3.5" />
        <path d="M32 40c0-5 4-8 8-8h36c4 0 8 3 8 8v52c0 8-6 14-14 14H46c-8 0-14-6-14-14z" fill="#F5A623" stroke={OUT} strokeWidth="3.5" />
        <path d="M66 32h10c4 0 8 3 8 8v52c0 8-6 14-14 14h-4z" fill="#D9821A" />
        <path d="M32 40c0-5 4-8 8-8h36c4 0 8 3 8 8v52c0 8-6 14-14 14H46c-8 0-14-6-14-14z" fill="none" stroke={OUT} strokeWidth="3.5" />
        <path d="M32 46c8 5 14-3 20 2s12 6 18 0 10-2 14 0" fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
        <rect x="44" y="60" width="28" height="22" rx="5" fill="#FFF7E3" stroke={OUT} strokeWidth="3" />
        <path d="M52 71h12" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
        <path d="M84 14l14 34" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="99" cy="54" rx="8" ry="10" fill="#F5A623" stroke={OUT} strokeWidth="3.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="60" cy="50" r="36" fill="#8E4EC6" stroke={OUT} strokeWidth="3.5" />
      <circle cx="60" cy="50" r="27" fill="#CFE6FF" stroke={OUT} strokeWidth="3" />
      <path d="M60 23a27 27 0 0 1 27 27H60z" fill="#B3D5FB" />
      <circle cx="60" cy="50" r="27" fill="none" stroke={OUT} strokeWidth="3" />
      <path d="M45 38l10-10M44 50l20-20" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M54 86h12l6 18H48z" fill="#2EA66B" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="38" y="104" width="44" height="8" rx="4" fill="#2EA66B" stroke={OUT} strokeWidth="3.5" />
    </svg>
  );
}

/* ---------- Card face ---------- */
export function CardFace({
  card,
  className,
  style,
  priority = false,
  sizes = '(max-width: 640px) 60vw, 280px',
  label = true,
}: {
  card: Card;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
  label?: boolean;
}) {
  if (card.cardImage) {
    return (
      <div className={`card card-real${className ? ` ${className}` : ''}`} style={style}>
        <Image
          src={card.cardImage}
          alt={`MediScripts card: ${card.object}, ${card.ref}`}
          fill
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }
  return (
    <div
      className={`card card-mock${className ? ` ${className}` : ''}`}
      style={style}
      role="img"
      aria-label={`MediScripts card: ${card.object}, ${card.ref} (placeholder artwork)`}
    >
      <Wordmark className="card-wordmark" />
      <Glyph kind={card.glyph} className="card-glyph" />
      <MultiColour text={card.object.toUpperCase()} className="card-name" />
      {label ? <PlaceholderTag>Placeholder art</PlaceholderTag> : null}
    </div>
  );
}

/* ---------- Card back: the verse side ---------- */
export function CardBack({ card, className }: { card: Card; className?: string }) {
  if (card.cardBackImage) {
    return (
      <div className={`card card-real${className ? ` ${className}` : ''}`}>
        <Image src={card.cardBackImage} alt={`${card.ref}: ${card.verse}`} fill sizes="(max-width: 640px) 70vw, 320px" />
      </div>
    );
  }
  return (
    <div className={`card card-mock card-back${className ? ` ${className}` : ''}`}>
      <Wordmark className="card-wordmark" />
      <Glyph kind={card.glyph} className="card-back-glyph" />
      <p className="card-back-verse">{card.verse}</p>
      <p className="card-back-ref">
        {card.ref.toUpperCase()} · {site.translation.abbr}
      </p>
    </div>
  );
}

/* ---------- Photo slot: real image, or a labelled placeholder ---------- */
export function Photo({
  src,
  alt,
  file,
  className,
  sizes = '100vw',
  priority = false,
  children,
}: {
  src: string;
  alt: string;
  file: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  if (src) {
    return (
      <div className={`photo${className ? ` ${className}` : ''}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    );
  }
  return (
    <div className={`photo photo-ph${className ? ` ${className}` : ''}`} role="img" aria-label={alt}>
      {children}
      {site.flags.showPlaceholderLabels ? (
        <span className="photo-ph-label">
          <b>Photo coming</b>
          {alt}
          <small>{file}</small>
        </span>
      ) : null}
    </div>
  );
}

/* ---------- The box, drawn from the packaging spec ---------- */
export function ProductMock({ cards, priority = false }: { cards: Card[]; priority?: boolean }) {
  const [hero, ...rest] = cards;
  return (
    <div className="pmock" role="img" aria-label="The MediScripts Word Pack: a navy and gold window box with illustrated cards fanned out beside it">
      <div className="pmock-fan">
        {rest.slice(0, 2).map((c, i) => (
          <CardFace key={c.id} card={c} className={`pmock-card pmock-card-${i + 1}`} label={false} />
        ))}
      </div>
      <div className="pmock-box">
        <div className="pmock-box-top">
          <Wordmark gold className="pmock-logo" />
          <span className="pmock-sub">The Word Pack</span>
        </div>
        <div className="pmock-window">
          <CardFace card={hero} className="pmock-hero-card" priority={priority} label={false} />
        </div>
        <div className="pmock-box-foot">
          <span>Ages 6–9</span>
          <span>32 cards</span>
        </div>
        <span className="pmock-seal" aria-hidden>
          <svg viewBox="0 0 40 40"><path d="M20 2l4 5 6-2 1 6 6 2-2 6 5 4-5 4 2 6-6 2-1 6-6-2-4 5-4-5-6 2-1-6-6-2 2-6-5-4 5-4-2-6 6-2 1-6 6 2z" fill="currentColor" /><text x="20" y="23.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#142251">MS</text></svg>
        </span>
      </div>
      <PlaceholderTag>Illustration · product photo coming</PlaceholderTag>
    </div>
  );
}
