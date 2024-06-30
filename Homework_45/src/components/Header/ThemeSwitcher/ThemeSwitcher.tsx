import { useThemeDispatch, useThemeState } from '../../../hooks/useTheme';
import { ITheme } from '../../../types';
import BaseIcon from '../../Icons/BaseIcon';
import classes from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const changeTheme = useThemeDispatch();
  const theme = useThemeState();
  return (
    <div className={classes.wrapper} onClick={() => changeTheme()}>
      <BaseIcon
        className={classes.svg}
        width={28}
        variants={theme === ITheme.DARK ? 'sun' : 'moon'}
      />
    </div>
  );
}
