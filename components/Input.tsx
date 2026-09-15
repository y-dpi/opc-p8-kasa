import type { KeyboardEvent, ReactNode } from 'react';

import cn from '../utils/className';

/**
 * Text input component.
 * @param props.label Label of the field.
 * @param props.name Field name it is submitted under, which also stands in for the id.
 * @param props.id Identifier tying the label to the field, the name by default.
 * @param props.type Kind of input, plain text by default.
 * @param props.placeholder Hint shown while the field is empty.
 * @param props.defaultValue Value the field opens with, when it keeps its own.
 * @param props.value Value of the field, when the caller keeps it instead.
 * @param props.required Whether the form refuses to submit without it.
 * @param props.trailing Content set beside the field, such as a button.
 * @param props.onChange Called with the value as it is typed.
 * @param props.onKeyDown Called on every key pressed in the field.
 * @param props.className Extra classes for the field and its label.
 * @returns The labelled field.
 */
export default function Input(props: {
  label: string,
  name?: string,
  id?: string,
  type?: string,
  placeholder?: string,
  defaultValue?: string,
  value?: string,
  required?: boolean,
  trailing?: ReactNode,
  onChange?: (value: string) => void,
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void,
  className?: string
}) {
  const id = props.id ?? props.name;

  return (
    <div className={cn('flex w-full flex-col gap-1', props.className)}>
      <label htmlFor={id} className='text-body-m font-medium text-black'>{props.label}</label>

      <div className='flex items-center gap-2'>
        <div className='flex h-10 min-w-0 flex-1 items-center rounded-sm border border-light-grey bg-white px-2.5'>
          <input
            id={id}
            name={props.name}
            type={props.type ?? 'text'}
            defaultValue={props.defaultValue}
            value={props.value}
            placeholder={props.placeholder}
            required={props.required}
            onChange={props.onChange && ((event) => props.onChange?.(event.target.value))}
            onKeyDown={props.onKeyDown}
            className='min-w-0 flex-1 bg-transparent text-body-s font-normal text-black outline-none placeholder:text-dark-grey'
          />
        </div>

        {props.trailing}
      </div>
    </div>
  );
}
