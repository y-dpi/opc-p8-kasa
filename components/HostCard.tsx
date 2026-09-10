import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

import cn from '../utils/className';
import Avatar from './Avatar';
import Card from './Card';
import Rating from './Rating';

// Host card component.
export default function HostCard(props: {
  name: string,
  rating: number,
  title?: string,
  avatar?: string | StaticImageData,
  children?: ReactNode,
  className?: string
}) {
  return (
    <Card as='aside' className={cn('flex flex-col gap-2 p-6', props.className)}>
      <h2 className='text-h4 font-medium text-black'>{props.title ?? 'Votre hôte'}</h2>

      <div className='flex items-center gap-4.5 py-4'>
        <span className='h-20 w-20 shrink-0 text-h2'>
          <Avatar name={props.name} src={props.avatar} />
        </span>
        <span className='min-w-0 flex-1 text-body-l font-normal text-black'>{props.name}</span>
        <Rating value={props.rating} />
      </div>

      {props.children}
    </Card>
  );
}
