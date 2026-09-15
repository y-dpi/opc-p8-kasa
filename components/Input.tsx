import type { KeyboardEvent, ReactNode } from 'react';

import cn from '../utils/className';

// Text input component.
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
