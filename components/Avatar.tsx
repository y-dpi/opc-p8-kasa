import Image, { type StaticImageData } from 'next/image';

import cn from '../utils/className';
import toInitials from '../utils/toInitials';

// Avatar component.
export default function Avatar(props: {
  name: string,
  src?: string | StaticImageData,
  rounded?: 'sm' | 'md',
  className?: string
}) {
  const radius = props.rounded === 'sm' ? 'rounded-[6px]' : 'rounded-[10px]';

  return (
    <span className={cn('h-full w-full relative block shrink-0 overflow-hidden bg-light-grey', radius, props.className)}>
      {props.src ? (
        <Image src={props.src} alt={props.name} fill sizes='120px' className='object-cover' />
      ) : (
        <span
          aria-hidden='true'
          className='flex h-full w-full items-center justify-center font-medium text-dark-grey uppercase'
        >
          {toInitials(props.name, props.name)}
        </span>
      )}
    </span>
  );
}
