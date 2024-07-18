import { createTheme, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';
import { Outlet } from 'react-router-dom';
import BasicLayout from './components/BasicLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#bd5d38',
      200: 'rgba(255, 255, 255, .2)',
      contrastText: 'rgba(255, 255, 255, .5)',
      dark: '#343a40',
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    h2: {
      fontSize: '3.75rem',
      fontWeight: 500,
      color: '#343a40',
    },
    h4: {
      fontWeight: 500,
      color: '#343a40',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BasicLayout>
        <Outlet />
      </BasicLayout>
    </ThemeProvider>
  );
}

export default App;
