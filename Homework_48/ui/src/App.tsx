import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary/Boundary';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PageLayout from './components/PageLayout';
import ThemeProvider from './contexts/ThemeContext';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <PageLayout header={() => <Header />} footer={() => <Footer />} />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
