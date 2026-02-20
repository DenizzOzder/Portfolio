import { iconSprite } from '../../assets/icons';
import type { IconProps } from '../../types/Icon';

export const Icon = ({ name, className = '', ...props }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true" {...props}>
      <use href={`${iconSprite}#${name}`} xlinkHref={`${iconSprite}#${name}`} />
    </svg>
  );
};
