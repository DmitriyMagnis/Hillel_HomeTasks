import classNames from 'classnames';
import { type PropsWithChildren } from 'react';
import classes from './PageHead.module.css';

function PageHead({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <h2 className={classNames(className, classes.main)}>{children}</h2>;
}

export default PageHead;
