import classNames from 'classnames';
import { type PropsWithChildren } from 'react';
import classes from './PageHead.module.css';

function PageHead({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <h1 className={classNames(className, classes.main)}>{children}</h1>;
}

export default PageHead;
