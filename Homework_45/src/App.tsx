import ErrorBoundary from './components/ErrorBoundary/Boundary';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PageLayout from './components/PageLayout';
import ThemeProvider from './contexts/ThemeContext';
import TodoProvider from './contexts/TodoContext';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TodoProvider>
          <PageLayout header={() => <Header />} footer={() => <Footer />} />
        </TodoProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
