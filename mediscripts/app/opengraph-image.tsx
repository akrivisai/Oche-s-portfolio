import { ImageResponse } from 'next/og';

// Link preview for WhatsApp / Instagram / Facebook. Typographic only, so it
// never misrepresents the product. Swap for a real box-and-cards photo later
// by adding app/opengraph-image.jpg and deleting this file.
export const alt = 'MediScripts: Bible verse memory cards for kids, ages 6–9';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COLOURS = ['#E5484D', '#F28C28', '#E3A800', '#2EA66B', '#3B82F6', '#A06CD5'];

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: '#142251', color: '#FBF6EC', padding: '64px 72px', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 700, color: '#E2BE6A' }}>
          MediScripts
          <span style={{ marginLeft: 16, fontSize: 22, color: '#C9CFE6', fontWeight: 400 }}>by Akrivis</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 980 }}>
            Every lamp in your house can remind your child of God’s Word.
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 28, color: '#C9CFE6' }}>
            32 illustrated Bible-verse memory cards · Ages 6–9
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {COLOURS.map((c) => (
            <div key={c} style={{ width: 56, height: 10, borderRadius: 6, background: c }} />
          ))}
        </div>
      </div>
    ),
    size
  );
}
