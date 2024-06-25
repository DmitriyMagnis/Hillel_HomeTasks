import SmileList from './component/SmileItemList/SmileList';
import Winner from './component/Winner/Winner';
import { useSmiles } from './hooks/useSmiles';

const App = () => {
  const { smiles, winner, showResults, onIconClick, reset } = useSmiles();
  return (
    <div className="wrapper">
      <SmileList smileitems={smiles} onIconClick={onIconClick} />

      <Winner winner={winner} showResult={showResults} />

      <button className="reset" type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
  // }
};

export default App;
