import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import classes from './Container.module.css';

export default function Container({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames(classes.container, className)}>{children}</div>
  );
}
