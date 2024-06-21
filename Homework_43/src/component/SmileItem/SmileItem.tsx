import { memo } from 'react';
import type { ISmileItem } from '../../types/common';
import classes from './SmileItem.module.css';

function SmileItem({
  id,
  icon,
  clicks,
  onIconClick,
}: ISmileItem & { onIconClick: (id: number) => void }) {
  return (
    <li className={classes.smileItem} onClick={() => onIconClick(id)}>
      <div>{icon}</div>
      <div>{clicks}</div>
    </li>
  );
}

export default memo(SmileItem);
