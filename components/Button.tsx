import NextLink from 'next/link';

import cn from '../utils/className';
import Icon, { type IconName } from './Icon';

// Types.
type ButtonVariant = 'primary' | 'secondary';

// Variant mapping.
const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-main-red text-white hover:bg-dark-orange',
  secondary: 'bg-light-grey text-dark-grey hover:bg-black/10'
};

// Button component.
export default function Button(props: {
  label: string,
  variant?: ButtonVariant,
  icon?: IconName,
  disabled?: boolean,
  type?: 'button' | 'submit',
  href?: string,
  onClick?: () => void,
  className?: string
}) {
  const variant = props.variant ?? 'primary';
  const className = cn(
    'inline-flex w-full h-full items-center justify-center rounded-[10px] text-body-m font-medium whitespace-nowrap cursor-pointer',
    props.icon ? 'px-4' : 'px-8',
    props.disabled ? 'bg-light-grey text-dark-grey cursor-not-allowed' : BUTTON_STYLES[variant],
    props.className
  );

  const content = (
    <>
      {props.icon && (
        <span className='h-4 w-4 shrink-0'>
          <Icon name={props.icon} />
        </span>
      )}
      <span>{props.label}</span>
    </>
  );

  // Render a link when a href is given.
  if (props.href && !props.disabled) {
    return (
      <NextLink href={props.href} onClick={props.onClick} className={className}>
        {content}
      </NextLink>
    );
  }

  return (
    <button
      type={props.type ?? 'submit'}
      disabled={props.disabled}
      onClick={props.onClick}
      className={className}
    >
      {content}
    </button>
  );
}
