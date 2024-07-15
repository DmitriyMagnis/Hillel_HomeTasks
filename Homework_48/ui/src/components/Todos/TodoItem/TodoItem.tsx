import { useFormik } from 'formik';
import { memo } from 'react';
import useDidMountEffect from '../../../hooks/useDidMount';
import type { ITodoDipsatcher, ITodoItem } from '../../../types';
import Button from '../../ui/Button/Button';
import Checkbox from '../../ui/Checkbox/Checkbox';
import Input from '../../ui/Input/Input';
import { TodoItemSchema } from './Schema';
import classes from './TodoItem.module.css';

interface CTodoItem extends ITodoItem {
  onDelete: ITodoDipsatcher['delete'];
  onUpdate: ITodoDipsatcher['update'];
}

interface ITodoItemFormikState {
  title: string;
  completed: boolean;
}

const TodoItem = memo(
  ({ _id, title, completed, onDelete, onUpdate }: CTodoItem) => {
    const formik = useFormik<ITodoItemFormikState>({
      initialValues: {
        title,
        completed,
      },
      enableReinitialize: false,

      validationSchema: TodoItemSchema,

      onSubmit(values, helperes) {
        console.log('xaxa');
        onUpdate({
          _id,
          title: values.title,
          completed: values.completed,
        });
        helperes.setSubmitting(false);
      },
    });

    useDidMountEffect(() => {
      onUpdate({ completed: formik.values.completed, _id });
    }, [formik.values.completed]);

    return (
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <div className={classes.taskId}>Task: #{_id}</div>

        {formik.isSubmitting ? (
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}
          />
        ) : (
          <div>{title}</div>
        )}

        <Checkbox
          name="completed"
          id={_id}
          className={classes.status}
          checked={formik.values.completed}
          onChange={formik.handleChange}
          label={formik.values.completed ? 'submited' : 'in progres'}
        />

        <div className={classes.buttonGroup}>
          {formik.isSubmitting ? (
            <Button
              // key prop is neccesery for prevent submit event when button rerendered
              key="submit"
              type="submit"
              variants="main"
              disabled={!formik.isValid}
            >
              Save
            </Button>
          ) : (
            <Button
              key="notSubmit"
              type="button"
              variants="main"
              onClick={() => formik.setSubmitting(true)}
            >
              Update
            </Button>
          )}

          <Button
            type="button"
            variants="secondary"
            onClick={() => onDelete(_id)}
          >
            delete
          </Button>
        </div>
      </form>
    );
  }
);

export default TodoItem;
