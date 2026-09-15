import Image, { type StaticImageData } from 'next/image';
import NextLink from 'next/link';

import cn from '../utils/className';
import Icon from './Icon';
import IconButton from './IconButton';

// Property card component.
export default function PropertyCard(props: {
  title: string,
  location: string,
  price: number,
  image?: string | StaticImageData | null,
  href: string,
  priceUnit?: string,
  favorite?: boolean,
  favoriteAction?: () => void | Promise<void>,
  className?: string
}) {
  const favoriteLabel = props.favorite
    ? `Retirer ${props.title} des favoris`
    : `Ajouter ${props.title} aux favoris`;

  return (
    <article className={cn('relative flex h-full flex-col overflow-hidden rounded-[10px] bg-white', props.className)}>
      <NextLink href={props.href} className='flex flex-1 flex-col'>

        {/* Picture, falling back to a placeholder when the property has none */}
        <div className='relative aspect-355/376 w-full shrink-0 overflow-hidden'>
          {props.image ? (
            <Image
              src={props.image}
              alt={`Photo de la propriété '${props.title}'`}
              fill
              sizes='(min-width: 1024px) 355px, 100vw'
              className='object-cover'
            />
          ) : (
            <div
              role='img'
              aria-label='Aucune photo disponible'
              className='flex h-full w-full items-center justify-center bg-light-grey'
            >
              <span className='h-12 w-12 text-dark-grey'>
                <Icon name='missing-photo' />
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className='flex flex-1 flex-col justify-between gap-9 px-6 pt-4 pb-6'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-h3 font-medium text-black'>{props.title}</h2>
            <p className='text-body-m font-normal text-dark-grey'>{props.location}</p>
          </div>

          <p className='flex items-center gap-1.5'>
            <span className='text-body-m font-medium text-black'>{props.price}€</span>
            <span className='text-body-m font-normal text-dark-grey'>{props.priceUnit ?? 'par nuit'}</span>
          </p>
        </div>
      </NextLink>

      {/* Favorite toggle, submitting the action the page bound to this card when there is one */}
      {props.favoriteAction ? (
        <form action={props.favoriteAction} className='absolute top-4 right-4'>
          <IconButton
            icon='favorites'
            label={favoriteLabel}
            variant={props.favorite ? 'primary' : 'secondary'}
            type='submit'
          />
        </form>
      ) : (
        <IconButton
          icon='favorites'
          label={favoriteLabel}
          variant={props.favorite ? 'primary' : 'secondary'}
          className='absolute top-4 right-4'
        />
      )}
    </article>
  );
}
