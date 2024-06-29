import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PageLayout from './components/PageLayout';
import TodoContextProvider from './contexts/TodoContext';

function App() {
  return (
    <TodoContextProvider>
      <PageLayout header={() => <Header />} footer={() => <Footer />} />
    </TodoContextProvider>
  );
}

export default App;
