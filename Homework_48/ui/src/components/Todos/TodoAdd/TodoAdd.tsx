import { useFormik } from 'formik';
import type { ITodoDipsatcher } from '../../../types';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import { AddSchema } from './Schema';
import classes from './TodoAdd.module.css';

interface CAddTodo {
  onAdd: ITodoDipsatcher['add'];
}

interface ITodoAddFormiState {
  addValue: string;
}

function TodoAdd({ onAdd }: CAddTodo) {
  const formik = useFormik<ITodoAddFormiState>({
    initialValues: {
      addValue: '',
    },
    validationSchema: AddSchema,
    onSubmit({ addValue }, { resetForm }) {
      onAdd({ title: addValue });
      resetForm();
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Input
        name="addValue"
        title="Add your task"
        value={formik.values.addValue}
        placeholder="Enter task"
        onChange={formik.handleChange}
        error={formik.errors.addValue}
        onFocus={formik.handleBlur}
        data-testid="input-test"
      />

      <Button
        data-testid="test-submit"
        variants="main"
        disabled={!formik.isValid || !formik.dirty}
      >
        Add
      </Button>
    </form>
  );
}
export default TodoAdd;
