import type { StaticImageData } from 'next/image';

import BackIcon from '../assets/icons/back-icon.svg';
import CloseIcon from '../assets/icons/close-icon.svg';
import DeleteIcon from '../assets/icons/delete-icon.svg';
import FavoritesIcon from '../assets/icons/favorites-icon.svg';
import FavoritesFilledIcon from '../assets/icons/favorites-icon-filled.svg';
import LocationIcon from '../assets/icons/location-icon.svg';
import MenuIcon from '../assets/icons/menu-icon.svg';
import MessageIcon from '../assets/icons/message-icon.svg';
import MessageFilledIcon from '../assets/icons/message-icon-filled.svg';
import PlusIcon from '../assets/icons/plus-icon.svg';
import SendIcon from '../assets/icons/send-icon.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';

// Types.
export type IconName =
  | 'back'
  | 'close'
  | 'delete'
  | 'favorites'
  | 'favorites-filled'
  | 'location'
  | 'menu'
  | 'message'
  | 'message-filled'
  | 'plus'
  | 'send';

// Name mapping.
const ICONS: Record<IconName, StaticImageData> = {
  back: BackIcon,
  close: CloseIcon,
  delete: DeleteIcon,
  favorites: FavoritesIcon,
  'favorites-filled': FavoritesFilledIcon,
  location: LocationIcon,
  menu: MenuIcon,
  message: MessageIcon,
  'message-filled': MessageFilledIcon,
  plus: PlusIcon,
  send: SendIcon
};

// Icon wrapper component.
export default function Icon(props: {
  name: IconName,
  color?: string,
  className?: string
}) {
  return (
    <ColoredIcon
      src={ICONS[props.name]}
      color={props.color ?? 'currentColor'}
      className={cn('w-full h-full shrink-0', props.className)}
    />
  );
}
