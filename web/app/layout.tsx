import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/wp-compat.css';
import '@/styles/additions.css';
import '@/styles/global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FixedUI from '@/components/FixedUI';
import SiteScripts from '@/components/SiteScripts';
import { SITE_NAME, SITE_URL } from '@/lib/site';

// Self-hosted at build time; global.css uses var(--f-serif) / var(--f-sans).
const serif = DM_Serif_Display({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], display: 'swap', variable: '--f-serif' });
const sans = Plus_Jakarta_Sans({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'], display: 'swap', variable: '--f-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0F0F10' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="sh" id="sh-top">
          <Header />
          <div className="sh-main">
            {children}
            <Footer />
          </div>
          <FixedUI />
        </div>
        <SiteScripts />
      </body>
    </html>
  );
}
