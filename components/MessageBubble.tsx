import type { StaticImageData } from 'next/image';

import cn from '../utils/className';
import Avatar from './Avatar';

// Message bubble component.
export default function MessageBubble(props: {
  author: string,
  time: string,
  text: string,
  outgoing?: boolean,
  avatar?: string | StaticImageData,
  className?: string
}) {
  return (
    <div className={cn('flex w-full items-start gap-1.5', props.outgoing && 'flex-row-reverse', props.className)}>
      <span className='h-7 w-7 shrink-0'>
        <Avatar name={props.author} src={props.avatar} rounded='sm' />
      </span>

      <div className={cn('flex max-w-[85%] flex-col gap-2 lg:max-w-[70%]', props.outgoing && 'items-end')}>
        <div className='flex items-center gap-1 text-body-2xs font-normal text-dark-grey'>
          <span>{props.author}</span>
          <span aria-hidden='true' className='h-1 w-1 rounded-full bg-dark-grey' />
          <time>{props.time}</time>
        </div>

        <p className={cn(
          'rounded-[20px] p-3 text-body-m font-normal lg:text-body-xs',
          props.outgoing
            ? 'rounded-tr-none bg-dark-orange text-white'
            : 'rounded-tl-none border border-light-grey bg-white text-black'
        )}>
          {props.text}
        </p>
      </div>
    </div>
  );
}
