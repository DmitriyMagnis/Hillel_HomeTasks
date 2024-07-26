import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react';
import { screen } from '@testing-library/dom';
import ThemeProvider from '../contexts/ThemeContext';
import ThemeSwitcher from '../components/Header/ThemeSwitcher/ThemeSwitcher';
import { useTheme, useThemeDispatch } from '../hooks/useTheme';
import * as helpers from '../misc/helpers';

describe('THEME: ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render light theme by default with light', () => {
    jest.spyOn(helpers, 'getDefaultTheme').mockReturnValueOnce('light');

    const { result } = renderHook(useTheme);

    expect(result.current[0]).toBe('light');
  });

  it('should change theme to dark on event ', async () => {
    jest.spyOn(helpers, 'getDefaultTheme').mockReturnValueOnce('light');

    const { result } = renderHook(useTheme);

    await waitFor(() => {
      const changeTheme = result.current[1];
      changeTheme();
    });

    expect(result.current[0]).toBe('dark');
  });

  it('should call all effects and triger dom methods with correct attributes', async () => {
    jest.spyOn(helpers, 'getDefaultTheme').mockReturnValueOnce('dark');
    const callHtmlAttrChange = jest.spyOn(
      document.documentElement,
      'setAttribute'
    );
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    renderHook(useTheme);

    expect(callHtmlAttrChange).toHaveBeenCalled();
    expect(callHtmlAttrChange).toHaveBeenCalledWith('data-theme', 'dark');

    expect(setItem).toHaveBeenCalled();
    expect(setItem).toHaveBeenCalledWith('theme', JSON.stringify('dark'));
  });
});

describe('first', () => {
  it('should change icon on click', async () => {
    const { findByTestId, getByTestId } = render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    fireEvent.click(getByTestId('test-theme'));

    expect(await findByTestId('svg-use-id')).toHaveAttribute('href', '#moon');
  });
});
