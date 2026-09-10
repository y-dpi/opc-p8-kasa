'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import cn from '../utils/className';

// Scrollable area component.
export default function ScrollArea(props: {
  children: ReactNode,
  initial?: 'top' | 'bottom',
  className?: string
}) {
  const node = useRef<HTMLDivElement | null>(null);

  // Move the area to its initial position.
  const pin = useCallback(() => {
    if (props.initial === 'bottom' && node.current) node.current.scrollTop = node.current.scrollHeight;
  }, [props.initial]);

  // Pin again once the webfont swap has settled, as it shifts the content height.
  useEffect(() => {
    let current = true;
    void document.fonts.ready.then(() => current && pin());

    return () => { current = false; };
  }, [pin]);

  return (
    <div
      ref={(element) => {
        node.current = element;
        pin();
      }}
      className={cn('overflow-y-auto', props.className)}
    >
      {props.children}
    </div>
  );
}
