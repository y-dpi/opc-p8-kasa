import NextLink from 'next/link';
import type { ReactNode } from 'react';

import cn from '../utils/className';

// Menu item component.
export default function MenuItem(props: {
  label: string,
  href: string,
  icon?: ReactNode,
  active?: boolean,
  onClick?: () => void,
  className?: string
}) {
  return (
    <NextLink
      href={props.href}
      onClick={props.onClick}
      aria-current={props.active ? 'page' : undefined}
      className={cn(
        'inline-flex items-center gap-2.5 whitespace-nowrap',
        props.active ? 'font-bold text-main-red' : 'font-normal text-black hover:text-main-red',
        props.className
      )}
    >
      {props.icon}
      <span>{props.label}</span>
    </NextLink>
  );
}
