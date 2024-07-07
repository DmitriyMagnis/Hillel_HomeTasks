import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  decrement,
  increment,
  selectCount,
} from '../../redux/slices/counterSlice';
import Button from '../ui/Button/Button';
import classes from './Counter.module.css';

export const Counter = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <div className={classes.wrapper}>
      <h3>
        Value: <span>{count}</span>
      </h3>
      <div className={classes.controls}>
        <Button variants="main" onClick={() => dispatch(increment())}>
          +
        </Button>
        <Button variants="main" onClick={() => dispatch(decrement())}>
          -
        </Button>
      </div>
    </div>
  );
};
