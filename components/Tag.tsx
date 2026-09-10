import cn from '../utils/className';
import Icon from './Icon';

// Tag component.
export default function Tag(props: {
  label: string,
  onRemove?: () => void,
  className?: string
}) {
  return (
    <span className={cn(
      'inline-flex items-center gap-2 rounded-[5px] bg-light-grey px-4 py-2 text-body-s font-normal text-dark-grey whitespace-nowrap',
      props.className
    )}>
      {props.label}

      {props.onRemove && (
        <button
          type='button'
          aria-label={`Retirer ${props.label}`}
          onClick={props.onRemove}
          className='flex h-3 w-3 shrink-0 cursor-pointer items-center justify-center text-dark-grey hover:text-main-red'
        >
          <Icon name='close' />
        </button>
      )}
    </span>
  );
}
