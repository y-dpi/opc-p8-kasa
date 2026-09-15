import cn from '../utils/className';

/**
 * Page heading (title and introduction) component.
 * @param props.title Title of the page, and its only first-level heading.
 * @param props.description Introduction printed under the title.
 * @param props.align Which way the heading reads, centred by default.
 * @param props.compact Whether the title opens a size down on small screens.
 * @param props.className Extra classes for the heading.
 * @returns The heading and its introduction.
 */
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
