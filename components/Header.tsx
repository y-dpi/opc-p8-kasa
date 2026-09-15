'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { logout } from '../actions/auth';
import BrandLogo from './BrandLogo';
import Button from './Button';
import Icon from './Icon';
import MenuItem from './MenuItem';

// Navigation entries of the mobile menu.
const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Messagerie', href: '/messages' },
  { label: 'Favoris', href: '/favorites' }
];

/**
 * Header component.
 * @param props.userName Name of the signed-in user, absent while nobody is.
 * @returns The header and its menus.
 */
export default function Header(props: {
  userName?: string | null
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tell whether an entry matches the current route.
  function isActive(href: string): boolean {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <header className='w-full shrink-0'>

      {/* Desktop menu */}
      <div className='mx-auto hidden w-full max-w-360 px-8 pt-10 lg:block xl:px-35'>
        <nav
          aria-label='Menu principal'
          className='mx-auto flex w-full max-w-195.5 items-center justify-between gap-6 rounded-[10px] bg-white px-18 py-2 text-body-m shadow-[0_4px_4px_0_#b6b6b610]'
        >
          <div className='flex shrink-0 items-center gap-7'>
            <MenuItem label='Accueil' href='/' active={isActive('/')} />
            <MenuItem label='À propos' href='/about' active={isActive('/about')} />
          </div>

          <NextLink href='/' className='h-10 w-28 shrink-0'>
            <BrandLogo alt='Kasa, retour à l’accueil' />
          </NextLink>

          <div className='flex min-w-0 items-center gap-7'>
            <NextLink href='/properties/new' className='truncate whitespace-nowrap text-main-red hover:underline'>
              +Ajouter un logement
            </NextLink>

            <div className='flex shrink-0 items-center gap-2 text-main-red'>
              <NextLink href='/favorites' aria-label='Favoris' className='h-4 w-4 hover:text-dark-orange'>
                <Icon name={isActive('/favorites') ? 'favorites-filled' : 'favorites'} />
              </NextLink>
              <span aria-hidden='true' className='h-4 w-px bg-main-red' />
              <NextLink href='/messages' aria-label='Messagerie' className='h-4 w-4 hover:text-dark-orange'>
                <Icon name={isActive('/messages') ? 'message-filled' : 'message'} />
              </NextLink>
            </div>

            {/* Session control, the name kept as a tooltip so the bar stays on one line */}
            {props.userName ? (
              <form action={logout} className='shrink-0'>
                <button
                  type='submit'
                  title={`Connecté en tant que ${props.userName}`}
                  className='cursor-pointer whitespace-nowrap text-main-red hover:underline'
                >
                  Déconnexion
                </button>
              </form>
            ) : (
              <NextLink href='/login' className='shrink-0 whitespace-nowrap text-main-red hover:underline'>
                Connexion
              </NextLink>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile menu bar */}
      <div className='flex w-full items-center justify-between gap-10 bg-white px-4 py-4 lg:hidden'>
        <NextLink href='/' className='h-13 w-11'>
          <BrandLogo variant='picto' alt='Kasa, retour à l’accueil' />
        </NextLink>

        <button
          type='button'
          aria-label='Ouvrir le menu'
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className='h-8 w-8 shrink-0 cursor-pointer text-dark-grey'
        >
          <Icon name='menu' />
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className='fixed inset-0 z-50 flex flex-col gap-10 overflow-y-auto bg-white px-4 pt-4 pb-10 lg:hidden'>
          <div className='flex items-center justify-between gap-10'>
            <NextLink
              href='/'
              onClick={() => setOpen(false)}
              className='h-13 w-11'
            >
              <BrandLogo variant='picto' alt='Kasa, retour à l’accueil' />
            </NextLink>

            <button
              type='button'
              aria-label='Fermer le menu'
              onClick={() => setOpen(false)}
              className='h-8 w-8 shrink-0 cursor-pointer text-black'
            >
              <Icon name='close' />
            </button>
          </div>

          <nav aria-label='Menu principal' className='flex flex-col'>
            {NAV_ITEMS.map((item) => (
              <MenuItem
                key={item.href}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
                onClick={() => setOpen(false)}
                className='border-b border-light-grey py-7 text-h2'
              />
            ))}
          </nav>

          <div className='flex flex-col gap-4'>
            {props.userName && (
              <p className='truncate text-body-m font-normal text-dark-grey'>
                Connecté en tant que {props.userName}
              </p>
            )}

            <div className='h-9 w-50'>
              <Button
                label='Ajouter un logement'
                href='/properties/new'
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Session control */}
            {props.userName ? (
              <form action={logout} className='h-9 w-50'>
                <Button label='Déconnexion' type='submit' variant='secondary' />
              </form>
            ) : (
              <div className='h-9 w-50'>
                <Button
                  label='Connexion'
                  href='/login'
                  variant='secondary'
                  onClick={() => setOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
