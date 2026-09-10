import type { ReactNode } from 'react';

import cn from '../utils/className';

// Text input component.
export default function Input(props: {
  label: string,
  name?: string,
  type?: string,
  placeholder?: string,
  defaultValue?: string,
  required?: boolean,
  trailing?: ReactNode,
  className?: string
}) {
  return (
    <div className={cn('flex w-full flex-col gap-1', props.className)}>
      <label htmlFor={props.name} className='text-body-m font-medium text-black'>{props.label}</label>

      <div className='flex items-center gap-2'>
        <div className='flex h-10 min-w-0 flex-1 items-center rounded-sm border border-light-grey bg-white px-2.5'>
          <input
            id={props.name}
            name={props.name}
            type={props.type ?? 'text'}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            required={props.required}
            className='min-w-0 flex-1 bg-transparent text-body-s font-normal text-black outline-none placeholder:text-dark-grey'
          />
        </div>

        {props.trailing}
      </div>
    </div>
  );
}
