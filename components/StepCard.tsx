import cn from '../utils/className';

/**
 * Step card component.
 * @param props.title Name of the step.
 * @param props.description What the step involves.
 * @param props.className Extra classes for the card.
 * @returns The step card.
 */
export default function StepCard(props: {
  title: string,
  description: string,
  className?: string
}) {
  return (
    <article className={cn(
      'flex flex-col gap-4 rounded-[10px] border border-light-grey bg-dark-orange px-5.5 py-11',
      props.className
    )}>
      <h3 className='text-h3 font-medium text-white'>{props.title}</h3>
      <p className='text-body-s font-normal text-white'>{props.description}</p>
    </article>
  );
}
