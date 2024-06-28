import PageLayout from './components/PageLayout';

function App() {
  console.log('App');
  return <PageLayout header={() => <div>Addiotional header</div>} />;
}

export default App;
