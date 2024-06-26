import type { ISmileItem } from '../../types/common';
import SmileItem from '../SmileItem/SmileItem';
import classes from './SmileList.module.css';

interface CSmileList {
  smileitems: ISmileItem[];
  onIconClick: (id: number) => void;
}

function SmileList({ smileitems, onIconClick }: CSmileList) {
  return (
    <ul className={classes.wrapper}>
      {smileitems.map(smile => (
        <SmileItem key={smile.id} {...smile} onIconClick={onIconClick} />
      ))}
    </ul>
  );
}

export default SmileList;
