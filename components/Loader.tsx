import cn from '../utils/className';

// Loading indicator component.
export default function Loader(props: {
  label?: string,
  className?: string
}) {
  return (
    <div
      role='status'
      aria-live='polite'
      className={cn('flex w-full flex-1 flex-col items-center justify-center gap-4 py-20', props.className)}
    >
      <span
        aria-hidden='true'
        className='h-8 w-8 shrink-0 animate-spin rounded-full border-2 border-light-grey border-t-main-red'
      />
      <span className='text-body-m font-normal text-dark-grey'>{props.label ?? 'Chargement…'}</span>
    </div>
  );
}
