import NextLink from 'next/link';

import KasaLogo from '../assets/icons/kasa-icon.svg';
import { siteUrl } from '../utils/site';
import BrandLogo from './BrandLogo';

// Footer component.
export default function Footer() {
  return (
    <footer
      itemScope
      itemType='https://schema.org/Organization'
      className='w-full shrink-0 border-t border-light-grey bg-white'
    >
      <meta itemProp='name' content='Kasa' />
      <meta itemProp='description' content='Location d’appartements et de maisons entre particuliers' />
      <meta itemProp='logo' content={siteUrl(KasaLogo.src)} />

      <div className='mx-auto flex w-full max-w-360 items-center justify-between gap-4 px-6 py-2 lg:px-10'>
        <NextLink href='/' itemProp='url' className='h-13 w-11'>
          <BrandLogo variant='picto' alt='Kasa, retour à l’accueil' />
        </NextLink>

        <span className='text-body-s font-medium text-dark-grey'>© 2025 Kasa. All rights reserved</span>
      </div>
    </footer>
  );
}
