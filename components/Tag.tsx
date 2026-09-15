import cn from '../utils/className';
import Icon from './Icon';

// Shared shape of the tag, whether it is plain text or a toggle.
const TAG_BASE = 'inline-flex items-center gap-2 rounded-[5px] px-4 py-2 text-body-s font-normal whitespace-nowrap';

// Tag component.
export default function Tag(props: {
  label: string,
  selected?: boolean,
  onToggle?: () => void,
  onRemove?: () => void,
  className?: string
}) {
  const palette = props.selected ? 'bg-main-red text-white' : 'bg-light-grey text-dark-grey';

  if (props.onToggle) {
    return (
      <button
        type='button'
        aria-pressed={props.selected ?? false}
        onClick={props.onToggle}
        className={cn(
          TAG_BASE,
          palette,
          'cursor-pointer',
          props.selected ? 'hover:bg-dark-orange' : 'hover:bg-black/10',
          props.className
        )}
      >
        {props.label}
      </button>
    );
  }

  return (
    <span className={cn(TAG_BASE, palette, props.className)}>
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
