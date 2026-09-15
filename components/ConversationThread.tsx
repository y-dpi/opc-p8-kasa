import type { StaticImageData } from 'next/image';

import cn from '../utils/className';
import Button from './Button';
import DateSeparator from './DateSeparator';
import MessageBubble from './MessageBubble';
import MessageComposer from './MessageComposer';

// Types.
export interface Message {
  id: string;
  author: string;
  time: string;
  text: string;
  outgoing?: boolean;
  avatar?: string | StaticImageData;
}

export interface MessageGroup {
  date: string;
  messages: Message[];
}

/**
 * Conversation thread component.
 * @param props.groups Messages of the conversation, grouped by day.
 * @param props.backHref Where the back button leads, which only small screens show.
 * @param props.className Extra classes for the thread.
 * @returns The thread and the box to answer it with.
 */
export default function ConversationThread(props: {
  groups: MessageGroup[],
  backHref: string,
  className?: string
}) {
  return (
    <div className={cn('flex flex-col', props.className)}>

      {/* Back to the conversation list, on mobile only */}
      <div className='border-b border-light-grey px-2 py-4 lg:hidden'>
        <span className='inline-flex h-9'>
          <Button label='Retour' icon='back' variant='secondary' href={props.backHref} />
        </span>
      </div>

      {/* Messages */}
      <div className='flex flex-1 flex-col gap-6 px-2 py-10 lg:px-10'>
        {props.groups.map((group, index) => (
          <div key={group.date} className='flex flex-col gap-6'>
            {index > 0 && <DateSeparator label={group.date} />}

            {group.messages.map((message) => (
              <MessageBubble
                key={message.id}
                author={message.author}
                time={message.time}
                text={message.text}
                outgoing={message.outgoing}
                avatar={message.avatar}
              />
            ))}
          </div>
        ))}
      </div>

      <MessageComposer />
    </div>
  );
}
