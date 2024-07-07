import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './components/ErrorBoundary/Boundary';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PageLayout from './components/PageLayout';
import ThemeProvider from './contexts/ThemeContext';
import { persistor, store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <ThemeProvider>
            <PageLayout header={() => <Header />} footer={() => <Footer />} />
          </ThemeProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
