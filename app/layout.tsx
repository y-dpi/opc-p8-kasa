import './globals.css';

import type { Metadata } from 'next';

import Footer from '../components/Footer';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: {
    default: 'Kasa',
    template: '%s — Kasa',
  },
  description: 'Location d’appartements et de maisons entre particuliers',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='fr' className='h-full antialiased'>
      <body className='h-full min-h-full flex flex-col'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
