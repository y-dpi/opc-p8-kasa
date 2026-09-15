'use client';

import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';

import cn from '../utils/className';
import GallerySlides from './GallerySlides';

// Property gallery component.
export default function Gallery(props: {
  images: (string | StaticImageData)[],
  className?: string
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  const [cover, ...thumbnails] = props.images;
  if (!cover) return null;

  const total = props.images.length;

  return (
    <section
      aria-label='Photos du logement'
      className={cn('flex w-full flex-col gap-2.5 lg:flex-row', props.className)}
    >

      {/* Cover */}
      <button
        type='button'
        aria-label={`Agrandir la photo 1 sur ${total}`}
        onClick={() => setOpenAt(0)}
        className='relative aspect-303/357 w-full cursor-pointer overflow-hidden rounded-[10px] lg:min-w-0 lg:flex-1'
      >
        <Image
          src={cover}
          alt=''
          fill
          preload
          sizes='(min-width: 1024px) 303px, 100vw'
          className='object-cover'
        />
      </button>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className='grid w-full grid-cols-4 gap-2.5 lg:min-w-0 lg:flex-1 lg:auto-rows-fr lg:grid-cols-2'>
          {thumbnails.map((image, index) => (
            <button
              key={index}
              type='button'
              aria-label={`Agrandir la photo ${index + 2} sur ${total}`}
              onClick={() => setOpenAt(index + 1)}
              className='relative aspect-146/174 w-full cursor-pointer overflow-hidden rounded-[10px] lg:aspect-auto'
            >
              <Image
                src={image}
                alt=''
                fill
                sizes='(min-width: 1024px) 147px, 25vw'
                className='object-cover'
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen viewer, mounted only while a picture is open so it always starts fresh */}
      {openAt !== null && (
        <GallerySlides images={props.images} startAt={openAt} onClose={() => setOpenAt(null)} />
      )}
    </section>
  );
}
