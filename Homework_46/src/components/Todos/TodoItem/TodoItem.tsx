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
  status: boolean;
}

const TodoItem = memo(
  ({ id, title, status, onDelete, onUpdate }: CTodoItem) => {
    const formik = useFormik<ITodoItemFormikState>({
      initialValues: {
        title,
        status,
      },
      validationSchema: TodoItemSchema,
      onSubmit(values, helperes) {
        onUpdate({
          id,
          title: values.title,
          status: values.status,
        });
        helperes.setSubmitting(false);
      },
    });

    useDidMountEffect(() => {
      onUpdate({ status: formik.values.status, id });
    }, [formik.values.status]);

    return (
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <div className={classes.taskId}>Task: #{id}</div>

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
          name="status"
          id={id}
          className={classes.status}
          checked={formik.values.status}
          onChange={formik.handleChange}
          label={formik.values.status ? 'submited' : 'in progres'}
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
