import NextLink from 'next/link';

import BrandLogo from './BrandLogo';

// Footer component.
export default function Footer() {
  return (
    <footer className='w-full shrink-0 border-t border-light-grey bg-white'>
      <div className='mx-auto flex w-full max-w-360 items-center justify-between gap-4 px-6 py-2 lg:px-10'>
        <NextLink href='/' className='h-13 w-11'>
          <BrandLogo variant='picto' alt='Kasa, retour à l’accueil' />
        </NextLink>

        <span className='text-body-s font-medium text-dark-grey'>© 2025 Kasa. All rights reserved</span>
      </div>
    </footer>
  );
}
