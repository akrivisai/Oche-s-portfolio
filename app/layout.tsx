import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://amehoche.dev';

export const metadata: Metadata = {
  title: 'Ameh Matthew Oche — People Operations & AI Systems',
  description:
    'Analyst, People & Culture at Babban Gona. Building the workflows, automations, and AI tooling that scale modern HR.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ameh Matthew Oche — People Operations & AI Systems',
    description:
      'Analyst, People & Culture at Babban Gona. Building the workflows, automations, and AI tooling that scale modern HR.',
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: '/assets/hero_portrait.png',
        width: 710,
        height: 659,
        alt: 'Portrait of Ameh Matthew Oche',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0C',
};

const themeInit = `(function(){try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark'){document.documentElement.setAttribute('data-theme',s);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
