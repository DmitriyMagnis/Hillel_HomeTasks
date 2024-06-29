import { useState, type FormEvent } from 'react';
import type { ITodoDipsatcher } from '../../../types';

interface CAddTodo {
  onAdd: ITodoDipsatcher['add'];
}

function TodoAdd({ onAdd }: CAddTodo) {
  const [value, setValue] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onAdd({title: });
    console.log(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="todoAdd">Add your task</label>
        <input
          type="text"
          id="todoAdd"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <button>Add</button>
    </form>
  );
}
export default TodoAdd;
