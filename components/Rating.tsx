import cn from '../utils/className';

/**
 * Rating badge component.
 * @param props.value Rating of the property, out of five.
 * @param props.className Extra classes for the badge.
 * @returns The rating badge.
 */
export default function Rating(props: {
  value: number,
  className?: string
}) {
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1 rounded-[10px] bg-light-grey px-2 py-2', props.className)}>
      <span aria-hidden='true' className='text-h4 leading-none text-main-red'>★</span>
      <span className='text-body-l font-normal text-black'>{props.value}</span>
      <span className='sr-only'>étoiles sur 5</span>
    </span>
  );
}
