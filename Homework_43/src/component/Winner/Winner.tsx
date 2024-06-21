import { memo } from 'react';
import type { ISmileItem } from '../../types/common';
import classes from './Winner.module.css';

interface IWinner {
  winner: ISmileItem | null;
  showResult: () => void;
}

function Winner({ winner, showResult }: IWinner) {
  return (
    <div className={classes.wrapper}>
      {winner && <h4>Winner is:</h4>}
      <button type="button" onClick={showResult}>
        Show results
      </button>
      <div>{winner?.icon}</div>
      {winner && winner.clicks}
    </div>
  );
}

export default memo(Winner);
