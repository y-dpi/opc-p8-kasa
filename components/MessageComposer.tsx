import cn from '../utils/className';
import IconButton from './IconButton';

// Message composer component.
export default function MessageComposer(props: {
  placeholder?: string,
  name?: string,
  className?: string
}) {
  return (
    <form className={cn('w-full border-t border-light-grey bg-white px-4 py-5 lg:px-7', props.className)}>

      {/* A single centered row on mobile, a multiline area with a corner button on desktop */}
      <div className='relative flex items-center gap-2 rounded-[10px] border border-light-grey bg-white max-lg:p-1.5 lg:block lg:p-4'>
        <textarea
          name={props.name ?? 'message'}
          rows={2}
          placeholder={props.placeholder ?? 'Envoyer un message'}
          aria-label={props.placeholder ?? 'Envoyer un message'}
          className='min-w-0 flex-1 resize-none bg-transparent p-0 text-body-s font-normal text-black outline-none placeholder:text-dark-grey max-lg:h-5 max-lg:pl-2.5 lg:w-full lg:pr-10'
        />

        <IconButton
          icon='send'
          label='Envoyer le message'
          type='submit'
          className='lg:absolute lg:right-3 lg:bottom-3'
        />
      </div>
    </form>
  );
}
