import type { StaticImageData } from 'next/image';
import NextLink from 'next/link';

import cn from '../utils/className';
import Avatar from './Avatar';

/**
 * Conversation list item component.
 * @param props.name Name of the person the conversation is with.
 * @param props.preview Opening of the last message.
 * @param props.time When that message arrived.
 * @param props.href Where opening the conversation leads.
 * @param props.avatar Picture of the person, left out when they have none.
 * @param props.unread Whether the conversation still holds something unread.
 * @param props.active Whether this is the conversation currently open.
 * @param props.className Extra classes for the entry.
 * @returns The conversation entry.
 */
export default function ConversationItem(props: {
  name: string,
  preview: string,
  time: string,
  href: string,
  avatar?: string | StaticImageData,
  unread?: boolean,
  active?: boolean,
  className?: string
}) {
  return (
    <NextLink
      href={props.href}
      aria-current={props.active ? 'true' : undefined}
      className={cn(
        'flex items-center justify-between gap-5 border-b border-light-grey px-2.5 py-2',
        props.active ? 'bg-light-orange' : 'bg-white hover:bg-light-orange',
        props.className
      )}
    >
      <span className='flex min-w-0 items-center gap-5'>
        <span className='h-11 w-11 shrink-0'>
          <Avatar name={props.name} src={props.avatar} rounded='sm' />
        </span>

        <span className='flex min-w-0 flex-col gap-1'>
          <span className={cn('text-body-m text-black', props.unread ? 'font-medium' : 'font-normal')}>
            {props.name}
          </span>
          <span className='truncate text-body-s font-normal text-dark-grey'>{props.preview}</span>
        </span>
      </span>

      <span className='flex shrink-0 flex-col items-end gap-3'>
        <span className='text-body-s font-normal text-dark-grey'>{props.time}</span>
        {props.unread && (
          <>
            <span aria-hidden='true' className='h-1.5 w-1.5 rounded-full bg-main-red' />
            <span className='sr-only'>Message non lu</span>
          </>
        )}
      </span>
    </NextLink>
  );
}
