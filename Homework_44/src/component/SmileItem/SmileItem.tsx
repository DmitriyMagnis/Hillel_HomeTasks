import { memo } from 'react';
import type { ISmileItem } from '../../types/common';
import classes from './SmileItem.module.css';

interface CSmileItem extends ISmileItem {
  onIconClick: (id: number) => void;
}

const SmileItem = memo(({ id, icon, clicks, onIconClick }: CSmileItem) => {
  return (
    <li className={classes.smileItem} onClick={() => onIconClick(id)}>
      <div>{icon}</div>
      <div>{clicks}</div>
    </li>
  );
});

export default SmileItem;
