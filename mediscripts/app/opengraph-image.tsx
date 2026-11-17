import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

// Link preview for WhatsApp / Instagram / Facebook: the real pack + logo.
// Replace with a photo later by adding app/opengraph-image.jpg and deleting this file.
export const alt = 'MediScripts Word Pack: Bible verse memory cards for kids, ages 6–9';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function dataUri(file: string) {
  const buf = await readFile(path.join(process.cwd(), 'app/og', file));
  return `data:image/png;base64,${buf.toString('base64')}`;
}

export default async function OG() {
  const pack = await dataUri('pack.png');
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1756C9 0%, #0B3A9E 55%, #072A78 100%)', color: '#fff',
          padding: '0 80px', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', fontSize: 52, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>
            <span>Medi</span>
            <svg width="35" height="60" viewBox="0 0 70 120" style={{ marginBottom: 4 }}>
              <path
                d="M12 104 C15 112 23 117 33 118 C46 119 59 113 59 101 C59 90 47 84 36 76 C20 64 5 51 7 32 C9 15 30 13 35 28 C40 13 61 15 63 32 C65 51 50 64 36 76"
                fill="none" stroke="#FFD84D" strokeWidth="7.6" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            <span>cripts</span>
          </div>
          <div style={{ marginTop: 36, fontSize: 58, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.2 }}>
            Every lamp in your house can remind your child of God’s Word.
          </div>
          <div style={{ display: 'flex', marginTop: 26, fontSize: 28, color: '#FFD84D', fontWeight: 700 }}>
            32 Bible-verse memory cards · Ages 6–9
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pack} width={300} height={522} alt="" style={{ transform: 'rotate(-4deg)' }} />
      </div>
    ),
    size
  );
}
