import NextLink from 'next/link';

import cn from '../utils/className';
import Icon, { type IconName } from './Icon';

// Types.
type IconButtonVariant = 'primary' | 'secondary';

// Variant mapping.
const ICON_BUTTON_STYLES: Record<IconButtonVariant, string> = {
  primary: 'bg-main-red text-white hover:bg-dark-orange',
  secondary: 'bg-light-grey text-dark-grey hover:bg-black/10'
};

// Icon button component.
export default function IconButton(props: {
  icon: IconName,
  label: string,
  variant?: IconButtonVariant,
  type?: 'button' | 'submit',
  href?: string,
  onClick?: () => void,
  className?: string
}) {
  const className = cn(
    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] cursor-pointer',
    ICON_BUTTON_STYLES[props.variant ?? 'primary'],
    props.className
  );

  const icon = (
    <span className='h-1/2 w-1/2 shrink-0'>
      <Icon name={props.icon} />
    </span>
  );

  // Render a link when a href is given.
  if (props.href) {
    return (
      <NextLink href={props.href} aria-label={props.label} title={props.label} className={className}>
        {icon}
      </NextLink>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      aria-label={props.label}
      title={props.label}
      onClick={props.onClick}
      className={className}
    >
      {icon}
    </button>
  );
}
