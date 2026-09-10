import cn from '../utils/className';

// Page heading (title and introduction) component.
export default function PageHeading(props: {
  title: string,
  description?: string,
  align?: 'center' | 'left',
  compact?: boolean,
  className?: string
}) {
  const centered = (props.align ?? 'center') === 'center';

  return (
    <div className={cn('flex w-full flex-col gap-2', centered && 'items-center text-center', props.className)}>
      <h1 className={cn('font-bold text-main-red', props.compact ? 'text-h2 lg:text-h1' : 'text-h1')}>
        {props.title}
      </h1>

      {props.description && (
        <p className='max-w-3xl text-body-m font-normal whitespace-pre-line text-black'>
          {props.description}
        </p>
      )}
    </div>
  );
}
