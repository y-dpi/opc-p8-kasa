import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import GallerySlides from './GallerySlides';

// The beat the component hands over to the next picture on, mirrored from the component itself.
const SLIDE_MS = 3000;

// Three pictures is the smallest set that tells stepping forward and wrapping round apart.
const PHOTOS = ['/photo-1.jpg', '/photo-2.jpg', '/photo-3.jpg'];

// Let the slideshow run on, giving React the chance to paint what the timer changed.
async function wait(ms: number): Promise<void> {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

// Press one of the controls by the name it carries for assistive technology.
function press(label: string): void {
  fireEvent.click(screen.getByRole('button', { name: label }));
}

// Read the live image counter.
function counter(): HTMLElement {
  return screen.getByText(/^\d+ \/ \d+$/);
}

// Open the viewer, defaulting to the three pictures above, opened on the first of them.
function open(props: Partial<Parameters<typeof GallerySlides>[0]> = {}) {
  const onClose = vi.fn();
  const view = render(<GallerySlides images={PHOTOS} startAt={0} onClose={onClose} {...props} />);

  return { ...view, onClose };
}

describe('GallerySlides', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens on the picture it was handed rather than the first one', () => {
    open({ startAt: 1 });

    expect(counter()).toHaveTextContent('2 / 3');
    expect(screen.getByAltText('Photo 2 sur 3')).toBeInTheDocument();
  });

  it('opens as a dialog that says what it is holding', () => {
    const { container } = open();

    const dialog = container.querySelector('dialog');
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveAttribute('aria-label', 'Photos du logement');
  });

  it('moves to the next picture on its own', async () => {
    open();
    expect(counter()).toHaveTextContent('1 / 3');

    await wait(SLIDE_MS);

    expect(counter()).toHaveTextContent('2 / 3');
    expect(screen.getByAltText('Photo 2 sur 3')).toBeInTheDocument();
  });

  it('displays each picture for the specified delay before moving on', async () => {
    open();

    await wait(SLIDE_MS - 100);
    expect(counter()).toHaveTextContent('1 / 3');

    await wait(100);
    expect(counter()).toHaveTextContent('2 / 3');
  });

  it('cycles back to the first picture after the last', async () => {
    open({ startAt: 2 });

    await wait(SLIDE_MS);

    expect(counter()).toHaveTextContent('1 / 3');
  });

  it('keeps cycling for as long as it is left alone', async () => {
    open();

    await wait(SLIDE_MS * 4);

    expect(counter()).toHaveTextContent('2 / 3');
  });

  it('gives the slideshow up once the viewer steps forward themselves', async () => {
    open();

    press('Photo suivante');
    expect(counter()).toHaveTextContent('2 / 3');

    await wait(SLIDE_MS * 2);

    expect(counter()).toHaveTextContent('2 / 3');
  });

  it('cycles back to the last picture after the first in reverse iteration', () => {
    open();

    press('Photo précédente');

    expect(counter()).toHaveTextContent('3 / 3');
  });

  it('cycles the gallery with the arrow keys', () => {
    const { container } = open();
    const dialog = container.querySelector('dialog') as HTMLDialogElement;

    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(counter()).toHaveTextContent('2 / 3');

    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(counter()).toHaveTextContent('1 / 3');
  });

  it('pauses on the toolbar control and picks the slideshow up again from it', async () => {
    open();

    press('Mettre le diaporama en pause');
    await wait(SLIDE_MS * 2);
    expect(counter()).toHaveTextContent('1 / 3');

    press('Reprendre le diaporama');
    await wait(SLIDE_MS);
    expect(counter()).toHaveTextContent('2 / 3');
  });

  it('keeps the counter reader quiet while it plays, and lets it speak once it stops', () => {
    open();
    expect(counter()).toHaveAttribute('aria-live', 'off');

    press('Photo suivante');

    expect(counter()).toHaveAttribute('aria-live', 'polite');
  });

  it('tells the popup it closed when the close button is pressed', () => {
    const { onClose, container } = open();

    press('Fermer les photos');

    expect(onClose).toHaveBeenCalledOnce();
    expect(container.querySelector('dialog')).not.toHaveAttribute('open');
  });

  it('hides/stops navigation for properties with a single picture', async () => {
    open({ images: ['/only-photo.jpg'] });

    expect(counter()).toHaveTextContent('1 / 1');
    expect(screen.queryByRole('button', { name: 'Photo suivante' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Photo précédente' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /diaporama/ })).not.toBeInTheDocument();

    await wait(SLIDE_MS * 3);

    expect(counter()).toHaveTextContent('1 / 1');
  });

  it('renders nothing at all when there is no picture to show', () => {
    const { container } = open({ images: [] });

    expect(container.querySelector('dialog')).toBeNull();
  });
});
