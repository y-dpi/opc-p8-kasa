import NextLink from 'next/link';
import type { ReactNode } from 'react';

import cn from '../utils/className';

/**
 * Menu item component.
 * @param props.label Text of the entry.
 * @param props.href Where the entry leads.
 * @param props.icon Icon drawn ahead of the label.
 * @param props.active Whether the entry points at the page currently open.
 * @param props.onClick What following the entry also does, such as closing the menu.
 * @param props.className Extra classes for the entry.
 * @returns The menu entry.
 */
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
