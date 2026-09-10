import cn from '../utils/className';

// Date separator component.
export default function DateSeparator(props: {
  label: string,
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2', props.className)}>
      <span aria-hidden='true' className='h-px flex-1 bg-dark-grey/40' />
      <span className='text-body-2xs font-normal text-dark-grey'>{props.label}</span>
      <span aria-hidden='true' className='h-px flex-1 bg-dark-grey/40' />
    </div>
  );
}
