import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

interface IPageLayout {
  header?: () => JSX.Element;
  footer?: () => JSX.Element;
}

function PageLayout({ header, footer }: IPageLayout) {
  return (
    <Container>
      {header?.() ?? <header>Header</header>}
      <main>
        <Outlet />
      </main>
      {footer?.() ?? <footer>footer</footer>}
    </Container>
  );
}

export default PageLayout;
