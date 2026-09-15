import type { StaticImageData } from 'next/image';

import cn from '../utils/className';
import Button from './Button';
import ConversationItem from './ConversationItem';

// Types.
export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: boolean;
  avatar?: string | StaticImageData;
}

/**
 * Conversation list component.
 * @param props.conversations Conversations to list, in the order they should appear.
 * @param props.hrefFor Where opening a given conversation leads.
 * @param props.backHref Where the back button leads.
 * @param props.title Heading above the list, 'Messages' by default.
 * @param props.activeId ID of the conversation currently open.
 * @param props.className Extra classes for the list.
 * @returns The list of conversations.
 */
export default function ConversationList(props: {
  conversations: Conversation[],
  hrefFor: (conversation: Conversation) => string,
  backHref: string,
  title?: string,
  activeId?: string,
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2 bg-white px-2 py-3', props.className)}>
      <div className='mx-2 my-4 flex h-9 self-start'>
        <Button label='Retour' icon='back' variant='secondary' href={props.backHref} />
      </div>

      <h1 className='px-3 text-h1 font-medium text-black'>{props.title ?? 'Messages'}</h1>

      {props.conversations.length === 0 ? (
        <p className='px-3 py-4 text-body-m font-normal text-dark-grey'>Aucune conversation pour le moment.</p>
      ) : (
        <nav aria-label='Conversations' className='flex flex-col'>
          {props.conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              name={conversation.name}
              preview={conversation.preview}
              time={conversation.time}
              avatar={conversation.avatar}
              unread={conversation.unread}
              active={conversation.id === props.activeId}
              href={props.hrefFor(conversation)}
            />
          ))}
        </nav>
      )}
    </div>
  );
}
