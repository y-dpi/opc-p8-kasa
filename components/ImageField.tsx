'use client';

import Image from 'next/image';
import type { ChangeEvent } from 'react';

import cn from '../utils/className';
import Icon from './Icon';

/**
 * Image picker component.
 * @param props.label Heading above the picker.
 * @param props.images URLs of the pictures picked so far.
 * @param props.onPick Called with the files the host has just chosen.
 * @param props.onRemove Called with the URL of the picture to drop.
 * @param props.multiple Whether more than one picture may be picked at a time.
 * @param props.pending Whether the pictures are still on their way to the API.
 * @param props.className Extra classes for the picker.
 * @returns The picker and the pictures picked so far.
 */
export default function ImageField(props: {
  label: string,
  images: string[],
  onPick: (files: File[]) => void,
  onRemove: (url: string) => void,
  multiple?: boolean,
  pending?: boolean,
  className?: string
}) {
  // Hand the picked files over, then clear the field so the same file can be picked again.
  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (files.length > 0) props.onPick(files);
  }

  return (
    <div className={cn('flex w-full flex-col gap-1', props.className)}>
      <span className='text-body-m font-medium text-black'>{props.label}</span>

      {/* Picked images */}
      {props.images.length > 0 && (
        <ul className='flex flex-wrap gap-2 py-1'>
          {props.images.map((url, index) => (
            <li key={url} className='relative h-16 w-16 overflow-hidden rounded-sm border border-light-grey'>
              <Image src={url} alt='' fill sizes='64px' className='object-cover' />

              <button
                type='button'
                aria-label={`Retirer l’image ${index + 1}`}
                onClick={() => props.onRemove(url)}
                className='absolute top-0.5 right-0.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-xs bg-white/90 text-dark-grey hover:text-main-red'
              >
                <Icon name='close' />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Picker, one label so the whole control opens the file dialog without a script of its own */}
      <label className={cn('flex w-full items-center gap-2', props.pending ? 'cursor-wait' : 'cursor-pointer')}>
        <input
          type='file'
          accept='image/*'
          multiple={props.multiple}
          disabled={props.pending}
          onChange={onChange}
          className='sr-only'
        />

        <span className='flex h-10 min-w-0 flex-1 items-center rounded-sm border border-light-grey bg-white px-2.5 text-body-s font-normal text-dark-grey'>
          {props.pending ? 'Envoi…' : props.multiple ? 'Choisir des images' : 'Choisir une image'}
        </span>

        <span className='inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-main-red text-white'>
          <span className='h-1/2 w-1/2 shrink-0'>
            <Icon name='plus' />
          </span>
        </span>
      </label>
    </div>
  );
}
