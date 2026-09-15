import './globals.css';

import type { Metadata } from 'next';

import { getCurrentUser } from '../actions/auth';
import Footer from '../components/Footer';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: {
    default: 'Kasa',
    template: '%s — Kasa',
  },
  description: 'Location d’appartements et de maisons entre particuliers',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();

  return (
    <html lang='fr' className='h-full antialiased'>
      <body className='h-full min-h-full flex flex-col'>
        <Header userName={user?.name} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
