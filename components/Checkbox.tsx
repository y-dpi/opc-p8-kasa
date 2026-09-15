import cn from '../utils/className';

/**
 * Checkbox component.
 * @param props.label Text beside the box.
 * @param props.name Field name the box is submitted under.
 * @param props.value Value submitted when ticked, the label itself by default.
 * @param props.defaultChecked Whether the box starts ticked.
 * @param props.className Extra classes for the label wrapping the box.
 * @returns The checkbox and its label.
 */
export default function Checkbox(props: {
  label: string,
  name?: string,
  value?: string,
  defaultChecked?: boolean,
  className?: string
}) {
  return (
    <label className={cn(
      'flex cursor-pointer items-center gap-2.5 px-2.5 py-1 text-body-s font-normal text-dark-grey',
      props.className
    )}>
      <input
        type='checkbox'
        name={props.name}
        value={props.value ?? props.label}
        defaultChecked={props.defaultChecked}
        className='h-3 w-3 shrink-0 cursor-pointer appearance-none rounded-xs border border-dark-grey bg-white checked:border-black checked:bg-black'
      />
      <span>{props.label}</span>
    </label>
  );
}
