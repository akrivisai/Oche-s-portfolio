import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import { Pixels } from '@/components/Pixels';
import { site } from '@/site.config';
import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '700', '800'],
});

const body = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const base = site.url.includes('[') ? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000') : site.url;

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: 'website',
    siteName: site.name,
    locale: 'en_NG',
  },
  twitter: { card: 'summary_large_image', title: site.seo.title, description: site.seo.description },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#142251',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <Pixels />
      </body>
    </html>
  );
}
