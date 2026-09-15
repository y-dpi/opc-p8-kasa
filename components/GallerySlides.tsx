'use client';

import Image, { type StaticImageData } from 'next/image';
import { type KeyboardEvent, type MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import IconButton from './IconButton';

// How long a picture stays on screen before the next one takes over.
const SLIDE_MS = 3000;

// Fullscreen gallery slides component.
export default function GallerySlides(props: {
  images: (string | StaticImageData)[],
  startAt: number,
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(props.startAt);
  const [playing, setPlaying] = useState(true);

  const total = props.images.length;
  const picture = props.images[index];

  // Step through the pictures, wrapping around at either end.
  const move = useCallback((step: number) => {
    setIndex((current) => (current + step + total) % total);
  }, [total]);

  // Take the slideshow over, the viewer having picked a picture themselves.
  const moveByHand = useCallback((step: number) => {
    setPlaying(false);
    move(step);
  }, [move]);

  // Open as a modal once mounted, the dialog being closed in the markup. Going modal does not
  // stop the page underneath from scrolling, so hold it still for as long as the viewer is up.
  useEffect(() => {
    dialog.current?.showModal();

    const scroll = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = scroll; };
  }, []);

  // Hand over to the next picture on a timer, which restarts on every move.
  useEffect(() => {
    if (!playing || total < 2) return;

    const timer = setTimeout(() => move(1), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [index, move, playing, total]);

  // Close through the dialog rather than the parent, so both ways out follow the same path.
  function close(): void {
    dialog.current?.close();
  }

  // The backdrop reports the dialog as its target, the picture and the controls report themselves.
  function onClick(event: MouseEvent<HTMLDialogElement>): void {
    if (event.target === dialog.current) close();
  }

  // Arrow keys walk the gallery, Escape being left to the dialog itself.
  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>): void {
    if (event.key === 'ArrowLeft') moveByHand(-1);
    else if (event.key === 'ArrowRight') moveByHand(1);
  }

  if (!picture) return null;

  return (
    <dialog
      ref={dialog}
      aria-label='Photos du logement'
      onClose={props.onClose}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className='m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-black/80 sm:p-8'
    >
      <div className='pointer-events-none flex h-full w-full flex-col gap-4'>

        {/* Toolbar */}
        <div className='pointer-events-auto flex shrink-0 items-center justify-end gap-2'>
          {total > 1 && (
            <IconButton
              icon={playing ? 'pause' : 'play'}
              label={playing ? 'Mettre le diaporama en pause' : 'Reprendre le diaporama'}
              variant='secondary'
              onClick={() => setPlaying((current) => !current)}
            />
          )}
          <IconButton icon='close' label='Fermer les photos' variant='secondary' onClick={close} />
        </div>

        {/* Picture */}
        <div className='pointer-events-none relative min-h-0 w-full flex-1'>
          <Image
            src={picture}
            alt={`Photo ${index + 1} sur ${total}`}
            fill
            sizes='100vw'
            className='object-contain'
          />
        </div>

        {/* Controls, the counter staying quiet while the slideshow speaks for itself */}
        <div className='pointer-events-none flex shrink-0 items-center justify-center gap-4'>
          {total > 1 && (
            <span className='pointer-events-auto'>
              <IconButton
                icon='back'
                label='Photo précédente'
                variant='secondary'
                onClick={() => moveByHand(-1)}
              />
            </span>
          )}

          <span
            aria-live={playing ? 'off' : 'polite'}
            className='rounded-[5px] bg-black/60 px-3 py-1 text-body-s font-normal text-white'
          >
            {index + 1} / {total}
          </span>

          {total > 1 && (
            <span className='pointer-events-auto'>
              {/* The back arrow turned around, the button being square and centred */}
              <IconButton
                icon='back'
                label='Photo suivante'
                variant='secondary'
                onClick={() => moveByHand(1)}
                className='rotate-180'
              />
            </span>
          )}
        </div>
      </div>
    </dialog>
  );
}
