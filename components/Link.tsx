import NextLink from 'next/link';

import cn from '../utils/className';

// Link (text link) component.
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
