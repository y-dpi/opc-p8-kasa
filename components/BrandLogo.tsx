import Image from 'next/image';

import KasaLogo from '../assets/icons/kasa-icon.svg';
import KasaLogoCompact from '../assets/icons/kasa-icon-compact.svg';
import cn from '../utils/className';

// Types.
type BrandLogoVariant = 'full' | 'picto';

// Brand logo component.
export default function BrandLogo(props: {
  variant?: BrandLogoVariant,
  alt?: string,
  className?: string
}) {
  return (
    <Image
      className={cn('w-full h-full object-contain', props.className)}
      alt={props.alt ?? 'Icône de marque'}
      loading='eager'
      src={props.variant === 'picto' ? KasaLogoCompact : KasaLogo}
    />
  );
}
