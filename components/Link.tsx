import NextLink from 'next/link';

import cn from '../utils/className';

/**
 * Text link component.
 * @param props.label Text of the link.
 * @param props.href Where the link leads.
 * @param props.emphasis Part of the wording to pick out, printed after the label.
 * @param props.className Extra classes for the link.
 * @returns The link.
 */
export default function Link(props: {
  label: string,
  href: string,
  emphasis?: string,
  className?: string
}) {
  return (
    <NextLink
      href={props.href}
      className={cn('text-body-m font-normal text-main-red hover:underline', props.className)}
    >
      {props.label} {props.emphasis && <span className='font-bold underline'> {props.emphasis}</span>}
    </NextLink>
  );
}
