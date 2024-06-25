import type { LSKEYS } from '../constants';

export const getDeaultSliceFromLS = <T>(key: LSKEYS): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
