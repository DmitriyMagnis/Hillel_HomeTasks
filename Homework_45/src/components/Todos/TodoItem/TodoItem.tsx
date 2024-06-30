import { memo, useState } from 'react';
import useDidMountEffect from '../../../hooks/useDidMount';
import type { ITodoDipsatcher, ITodoItem } from '../../../types';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import classes from './TodoItem.module.css';

interface CTodoItem extends ITodoItem {
  onDelete: ITodoDipsatcher['delete'];
  onUpdate: ITodoDipsatcher['update'];
}

const TodoItem = memo(
  ({ id, title, status, onDelete, onUpdate }: CTodoItem) => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [value, setValue] = useState(title);
    const [innerStatus, setStatus] = useState(status);

    useDidMountEffect(() => {
      onUpdate({ status: innerStatus, id });
    }, [innerStatus]);

    return (
      <form className={classes.form}>
        <div className={classes.taskId}>Task: #{id}</div>

        {isSubmiting ? (
          <Input
            name={title}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        ) : (
          <div>{title}</div>
        )}

        <Checkbox
          name={id}
          className={classes.status}
          checked={innerStatus}
          onChange={e => setStatus(e.target.checked)}
          label={innerStatus ? 'submited' : 'in progres'}
        />

        <div className={classes.buttonGroup}>
          {isSubmiting ? (
            <Button
              type="button"
              variants="main"
              onClick={() => {
                onUpdate({ id, title: value, status: innerStatus });
                setIsSubmiting(false);
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              type="button"
              variants="main"
              onClick={() => setIsSubmiting(true)}
            >
              Update
            </Button>
          )}

          <Button
            type="button"
            variants="secondary"
            onClick={() => onDelete(id)}
          >
            delete
          </Button>
        </div>
      </form>
    );
  }
);

export default TodoItem;
