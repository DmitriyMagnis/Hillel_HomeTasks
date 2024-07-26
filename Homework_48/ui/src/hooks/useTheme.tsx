import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ThemeContext, ThemeDispatchContext } from '../contexts/ThemeContext';
import { ITheme } from '../types';
import { getDefaultTheme } from '../misc/helpers';

export const useTheme = (): [ITheme, typeof changeTheme] => {
  const [theme, setTheme] = useState<ITheme>(getDefaultTheme(ITheme.LIGHT));

  const changeTheme = () => {
    setTheme(theme => (theme === ITheme.LIGHT ? ITheme.DARK : ITheme.LIGHT));
  };
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return [theme, changeTheme];
};

export const useThemeState = () => {
  return useContext(ThemeContext);
};
export const useThemeDispatch = () => {
  return useContext(ThemeDispatchContext);
};
