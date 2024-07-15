import { createContext, type PropsWithChildren } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ITheme } from '../types';

export const ThemeContext = createContext<ITheme>(ITheme.LIGHT);
export const ThemeDispatchContext = createContext(() => {});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, changeTheme] = useTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={changeTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
