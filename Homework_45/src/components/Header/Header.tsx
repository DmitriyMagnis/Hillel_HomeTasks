import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import type { LinkClassNameType } from '../../types';
import classes from './Header.module.css';

function Header() {
  const cn: LinkClassNameType = ({ isActive }) =>
    classNames(classes.link, { [classes.active]: isActive });

  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <div>
          <NavLink className={cn} to={'/'}>
            Ho
          </NavLink>
        </div>
        <div>
          <NavLink className={cn} to={'/about'}>
            About
          </NavLink>
        </div>
        <div>
          <NavLink className={cn} to={'/contacts'}>
            Contacts
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
