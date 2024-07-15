import { Outlet } from 'react-router-dom';
import classes from './PageLoyout.module.css';

interface IPageLayout {
  header?: () => JSX.Element;
  footer?: () => JSX.Element;
}

function PageLayout({ header, footer }: IPageLayout) {
  return (
    <div className={classes.wrapper}>
      {header?.() ?? <header>Header</header>}
      <main className={classes.main}>
        <Outlet />
      </main>
      {footer?.() ?? <footer>footer</footer>}
    </div>
  );
}

export default PageLayout;
