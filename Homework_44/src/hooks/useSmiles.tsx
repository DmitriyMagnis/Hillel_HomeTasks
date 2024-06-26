import { useCallback, useState } from 'react';
import { LSKEYS, defaultSmiles } from '../constants';
import { getDeaultSliceFromLS } from '../libs/helpers';
import type { ISmileItem } from '../types/common';

export const useSmiles = (): {
  smiles: ISmileItem[];
  winner: ISmileItem | null;
  onIconClick: typeof onIconClick;
  showResults: typeof showResults;
  reset: typeof reset;
} => {
  const [smiles, setSmiles] = useState<ISmileItem[]>(
    getDeaultSliceFromLS<ISmileItem[]>(LSKEYS.SMILES) || defaultSmiles
  );
  const [winner, setWinner] = useState<ISmileItem | null>(null);

  const showResults = () => {
    const max: ISmileItem = smiles.reduce(
      (max, smile) => (max.clicks <= smile.clicks ? smile : max),
      smiles[0]
    );

    setWinner(max);
    localStorage.setItem(LSKEYS.WINNER, JSON.stringify(max));
  };
  const onIconClick = useCallback((id: number) => {
    setSmiles(prev => {
      const newSmiles = prev.map(smile => ({
        ...smile,
        clicks: id === smile.id ? smile.clicks + 1 : smile.clicks,
      }));
      localStorage.setItem(LSKEYS.SMILES, JSON.stringify(newSmiles));
      return newSmiles;
    });
  }, []);
  const reset = () => {
    setSmiles(defaultSmiles);
    setWinner(null);
    localStorage.clear();
  };
  return { smiles, winner, onIconClick, showResults, reset };
};
