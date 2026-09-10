import Image, { type StaticImageData } from 'next/image';
import NextLink from 'next/link';

import cn from '../utils/className';
import IconButton from './IconButton';

// Property card component.
export default function PropertyCard(props: {
  title: string,
  location: string,
  price: number,
  image: string | StaticImageData,
  href: string,
  priceUnit?: string,
  favorite?: boolean,
  className?: string
}) {
  return (
    <article className={cn('relative flex h-full flex-col overflow-hidden rounded-[10px] bg-white', props.className)}>
      <NextLink href={props.href} className='flex flex-1 flex-col'>

        {/* Picture */}
        <div className='relative aspect-355/376 w-full shrink-0 overflow-hidden'>
          <Image
            src={props.image}
            alt={props.title}
            fill
            sizes='(min-width: 1024px) 355px, 100vw'
            className='object-cover'
          />
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

      {/* Favorite toggle */}
      <IconButton
        icon='favorites'
        label={props.favorite ? `Retirer ${props.title} des favoris` : `Ajouter ${props.title} aux favoris`}
        variant={props.favorite ? 'primary' : 'secondary'}
        className='absolute top-4 right-4'
      />
    </article>
  );
}
