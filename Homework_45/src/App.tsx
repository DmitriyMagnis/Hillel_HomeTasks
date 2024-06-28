import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PageLayout from './components/PageLayout';

function App() {
  return <PageLayout header={() => <Header />} footer={() => <Footer />} />;
}

export default App;
