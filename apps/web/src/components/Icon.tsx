import { iconSprite } from '../assets/icons';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export const Icon = ({ name, className = '', ...props }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true" {...props}>
      <use href={`${iconSprite}#${name}`} xlinkHref={`${iconSprite}#${name}`} />
    </svg>
  );
};
