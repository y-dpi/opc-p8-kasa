import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { getCurrentUser } from '../actions/auth';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SITE_URL } from '../utils/site';

// Inter font.
const inter = localFont({
  src: '../assets/fonts/inter.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
});

// Site description.
const DESCRIPTION = 'Location d’appartements et de maisons entre particuliers';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kasa',
    template: '%s — Kasa',
  },
  description: DESCRIPTION,
  applicationName: 'Kasa',
  openGraph: {
    type: 'website',
    siteName: 'Kasa',
    locale: 'fr_FR',
    title: 'Kasa',
    description: DESCRIPTION,
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();

  return (
    <html lang='fr' className={`h-full antialiased ${inter.variable}`}>
      <body className='h-full min-h-full flex flex-col'>
        <Header userName={user?.name} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
