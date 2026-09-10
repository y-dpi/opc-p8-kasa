import cn from '../utils/className';

// Multiline text input component.
export default function TextArea(props: {
  label: string,
  name?: string,
  placeholder?: string,
  defaultValue?: string,
  rows?: number,
  required?: boolean,
  className?: string
}) {
  return (
    <div className={cn('flex w-full flex-col gap-1', props.className)}>
      <label htmlFor={props.name} className='text-body-m font-medium text-black'>{props.label}</label>

      <textarea
        id={props.name}
        name={props.name}
        rows={props.rows ?? 5}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        required={props.required}
        className='w-full resize-y rounded-sm border border-light-grey bg-white p-2.5 text-body-s font-normal text-black outline-none placeholder:text-dark-grey'
      />
    </div>
  );
}
