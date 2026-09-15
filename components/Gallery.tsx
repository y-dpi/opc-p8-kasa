import Image, { type StaticImageData } from 'next/image';

import cn from '../utils/className';

// Property gallery component.
export default function Gallery(props: {
  images: (string | StaticImageData)[],
  className?: string
}) {
  const [cover, ...thumbnails] = props.images;
  if (!cover) return null;

  const total = props.images.length;

  return (
    <section
      aria-label='Photos du logement'
      className={cn('flex w-full flex-col gap-2.5 lg:flex-row', props.className)}
    >

      {/* Cover */}
      <div className='relative aspect-303/357 w-full overflow-hidden rounded-[10px] lg:min-w-0 lg:flex-1'>
        <Image
          src={cover}
          alt={`Photo 1 sur ${total}`}
          fill
          priority
          sizes='(min-width: 1024px) 303px, 100vw'
          className='object-cover'
        />
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className='grid w-full grid-cols-4 gap-2.5 lg:min-w-0 lg:flex-1 lg:auto-rows-fr lg:grid-cols-2'>
          {thumbnails.map((image, index) => (
            <div
              key={index}
              className='relative aspect-146/174 w-full overflow-hidden rounded-[10px] lg:aspect-auto'
            >
              <Image
                src={image}
                alt={`Photo ${index + 2} sur ${total}`}
                fill
                sizes='(min-width: 1024px) 147px, 25vw'
                className='object-cover'
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
