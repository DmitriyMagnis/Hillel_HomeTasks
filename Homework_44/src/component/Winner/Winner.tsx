import { memo } from 'react';
import type { ISmileItem } from '../../types/common';
import classes from './Winner.module.css';

interface CWinner {
  winner: ISmileItem | null;
  showResult: () => void;
}

const Winner = memo(({ winner, showResult }: CWinner) => {
  return (
    <div className={classes.wrapper}>
      <button type="button" onClick={showResult}>
        Show results
      </button>
      {winner && (
        <>
          <h4>Winner is:</h4> <div>{winner.icon}</div>
          <div>{winner.clicks}</div>
        </>
      )}
    </div>
  );
});

export default Winner;
