import type { Metadata } from 'next';

import Button from '../../components/Button';
import type { Conversation } from '../../components/ConversationList';
import ConversationList from '../../components/ConversationList';
import DateSeparator from '../../components/DateSeparator';
import MessageBubble from '../../components/MessageBubble';
import MessageComposer from '../../components/MessageComposer';
import ScrollArea from '../../components/ScrollArea';
import cn from '../../utils/className';

export const metadata: Metadata = { title: 'Messagerie' };

// Types.
interface MessageGroup {
  date: string;
  messages: {
    id: string;
    author: string;
    time: string;
    text: string;
    outgoing?: boolean;
  }[];
}

// Name of the URL query parameter holding the selected conversation.
const USER_PARAM = 'user';

// Conversations of the user.
const CONVERSATIONS: Conversation[] = [
  { id: 'nathalie-jean', name: 'Nathalie Jean', preview: 'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?', time: '11:04 am', unread: true },
  { id: 'lucas-martin', name: 'Lucas Martin', preview: 'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?', time: '10:32 am', unread: true },
  { id: 'sofia-lopez', name: 'Sofia Lopez', preview: 'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?', time: '09:15 am' },
  { id: 'karim-benali', name: 'Karim Benali', preview: 'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?', time: 'Hier' },
  { id: 'emma-durand', name: 'Emma Durand', preview: 'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?', time: 'Hier' },
  { id: 'paul-girard', name: 'Paul Girard', preview: 'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?', time: 'Lundi' },
  { id: 'chloe-moreau', name: 'Chloé Moreau', preview: 'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?', time: 'Lundi' },
];

// Messages of the selected conversation, grouped by day.
const MESSAGES: MessageGroup[] = [
  {
    date: '02 Septembre 2025',
    messages: [
      { id: '1', author: 'Nathalie Jean', time: '11:04pm', text: 'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?' },
      { id: '2', author: 'Nathalie Jean', time: '11:06pm', text: 'Nous serions deux adultes et un enfant, avec une arrivée prévue en fin d’après-midi.' },
      { id: '3', author: 'Vous', time: '11:20pm', text: 'Bonjour Nathalie, l’appartement est bien libre à ces dates. Un lit pour bébé est disponible sur demande.', outgoing: true },
    ],
  },
  {
    date: '03 Septembre 2025',
    messages: [
      { id: '4', author: 'Nathalie Jean', time: '09:02am', text: 'Parfait, nous prenons l’appartement. Faut-il verser un acompte pour confirmer la réservation ?' },
      { id: '5', author: 'Vous', time: '09:14am', text: 'Aucun acompte, la réservation est confirmée directement depuis la plateforme. À très bientôt !', outgoing: true },
      { id: '6', author: 'Nathalie Jean', time: '09:31am', text: 'Merci beaucoup, nous avons hâte de découvrir le quartier des Batignolles.' },
    ],
  },
];

// Messaging page.
export default async function MessagesPage(props: PageProps<'/messages'>) {
  const searchParams = await props.searchParams;
  const requestedId = searchParams[USER_PARAM];
  const selectedId = typeof requestedId === 'string' ? requestedId : undefined;
  const active = CONVERSATIONS.find((conversation) => conversation.id === selectedId) ?? CONVERSATIONS[0];

  return (
    <main
      className={cn(
        'mx-auto flex w-full max-w-360 flex-1 flex-col lg:min-h-0 lg:flex-row lg:gap-6 lg:px-8 lg:py-10 xl:px-35',
        selectedId && 'max-lg:min-h-0'
      )}
    >

      {/* Conversations */}
      <div className={cn('w-full max-lg:flex max-lg:grow max-lg:flex-col lg:relative lg:block lg:w-94 lg:shrink-0', selectedId && 'max-lg:hidden')}>
        <ConversationList
          conversations={CONVERSATIONS}
          activeId={active?.id}
          backHref='/'
          hrefFor={(conversation) => `/messages?${USER_PARAM}=${conversation.id}`}
          className='w-full max-lg:grow lg:absolute lg:inset-0 lg:overflow-y-auto lg:rounded-[10px] lg:shadow-[0_4px_4px_0_#b6b6b610] lg:*:shrink-0'
        />
      </div>

      {/* Selected conversation */}
      <section
        aria-label={`Conversation avec ${active?.name ?? ''}`}
        className={cn('w-full min-h-0 min-w-0 flex-1 flex-col lg:flex', selectedId ? 'flex' : 'hidden')}
      >

        {/* Back to the conversation list, on mobile only */}
        <div className='bg-white px-2 py-4 lg:hidden'>
          <span className='inline-flex h-9'>
            <Button label='Retour' icon='back' variant='secondary' href='/messages' />
          </span>
        </div>

        {/* Messages */}
        <ScrollArea initial='bottom' className='flex min-h-0 flex-1 flex-col gap-6 px-2 py-10 lg:px-0 lg:pt-0'>
          {MESSAGES.map((group, index) => (
            <div key={group.date} className='flex flex-col gap-6'>
              {index > 0 && <DateSeparator label={group.date} />}

              {group.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  author={message.author}
                  time={message.time}
                  text={message.text}
                  outgoing={message.outgoing}
                />
              ))}
            </div>
          ))}
        </ScrollArea>

        {/* Composer, framed on its own on desktop */}
        <MessageComposer className='lg:border-0 lg:bg-transparent lg:p-0' />
      </section>
    </main>
  );
}
