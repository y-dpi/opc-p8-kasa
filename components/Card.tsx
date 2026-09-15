import type { ReactNode } from 'react';

import cn from '../utils/className';

/**
 * Card component.
 * @param props.children Content of the card.
 * @param props.as Element to render as, a plain div by default.
 * @param props.className Extra classes for the card.
 * @returns The card.
 */
export default function Card(props: {
  children: ReactNode,
  as?: 'div' | 'section' | 'article' | 'aside',
  className?: string
}) {
  const Tag = props.as ?? 'div';

  return (
    <Tag className={cn('rounded-[10px] border border-light-grey bg-white', props.className)}>
      {props.children}
    </Tag>
  );
}
