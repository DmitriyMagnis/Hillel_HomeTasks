import classNames from 'classnames';
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import classes from './Button.module.css';

type BVariants = 'main' | 'secondary';
interface CButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants: BVariants;
}

const Button = ({
  className,
  children,
  variants,
  ...rest
}: PropsWithChildren<CButton>) => {
  const cn = classNames(classes.button, className, {
    [classes[variants]]: variants,
  });

  return (
    <button className={cn} {...rest}>
      {children}
    </button>
  );
};

export default Button;
