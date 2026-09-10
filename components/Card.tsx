import type { ReactNode } from 'react';

import cn from '../utils/className';

// Card component.
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
