import classNames from 'classnames';
import moon from '../../../../public/moon.svg';
import sun from '../../../../public/sun.svg';
import classes from './BaseIcon.module.css';

type SVGNames = 'sun' | 'moon';

const SVGMap: Record<SVGNames, any> = {
  sun,
  moon,
};

export default function BaseIcon({
  className,
  width,
  height,
  variants,
}: {
  variants: SVGNames;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      className={classNames(classes.base, className)}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href={`${SVGMap[variants]}#${variants}`}></use>
    </svg>
  );
}
