import './globals.css';

import type { Metadata } from 'next';

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
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
