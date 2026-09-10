import cn from '../utils/className';

// Checkbox component.
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
