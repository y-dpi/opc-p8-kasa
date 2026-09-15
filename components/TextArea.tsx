import cn from '../utils/className';

/**
 * Multiline text input component.
 * @param props.label Label of the field.
 * @param props.name Field name it is submitted under, which also stands in for the id.
 * @param props.placeholder Hint shown while the field is empty.
 * @param props.defaultValue Value the field opens with.
 * @param props.rows How many lines tall the field opens, five by default.
 * @param props.required Whether the form refuses to submit without it.
 * @param props.className Extra classes for the field and its label.
 * @returns The labelled field.
 */
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
