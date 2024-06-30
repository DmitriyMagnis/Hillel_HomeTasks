import { useState, type ChangeEvent, type FormEvent } from 'react';
import { uuid, validate } from '../../../misc/helpers';
import type { ITodoDipsatcher } from '../../../types';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import classes from './TodoAdd.module.css';

interface CAddTodo {
  onAdd: ITodoDipsatcher['add'];
}

function TodoAdd({ onAdd }: CAddTodo) {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate(value);
    if (isValid) {
      onAdd({ title: value, id: String(uuid()), status: false });
      setValue('');
      console.log(value);
    } else setError('Wrong input');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    setValue(e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Input
        name="name"
        title="Add your task"
        value={value}
        placeholder="Enter task"
        onChange={onChange}
        error={error}
      />

      <Button variants="main">Add</Button>
    </form>
  );
}
export default TodoAdd;
