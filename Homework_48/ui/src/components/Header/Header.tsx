import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import type { LinkClassNameType } from '../../types';
import Container from '../ui/Container/Container';
import classes from './Header.module.css';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';

function Header() {
  const cn: LinkClassNameType = ({ isActive }) =>
    classNames(classes.link, { [classes.active]: isActive });

  return (
    <header className={classes.header}>
      <Container className={classes.wrapper}>
        <h4 className={classes.logo}>React-Todo</h4>
        <nav className={classes.navigation}>
          <NavLink className={cn} to={'/'}>
            Home
          </NavLink>
          <NavLink className={cn} to={'/counter'}>
            Counter
          </NavLink>
          <NavLink className={cn} to={'/about'}>
            About
          </NavLink>
        </nav>
        <ThemeSwitcher />
      </Container>
    </header>
  );
}

export default Header;
