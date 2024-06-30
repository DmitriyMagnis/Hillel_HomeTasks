import { useTodosDispatch, useTodosState } from '../../hooks/useTodos';
import classes from './Todo.module.css';
import TodoAdd from './TodoAdd/TodoAdd';
import TodoItem from './TodoItem/TodoItem';

export default function Todo() {
  const todos = useTodosState();
  const todoHandlers = useTodosDispatch();

  return (
    <>
      <TodoAdd onAdd={todoHandlers.add} />
      {todos.length === 0 && (
        <h4 className={classes.empty}>Todos list is empty!</h4>
      )}

      <div className={classes.wrapper}>
        {todos.map(item => (
          <TodoItem
            key={item.id}
            {...item}
            onDelete={todoHandlers.delete}
            onUpdate={todoHandlers.update}
          />
        ))}
      </div>
    </>
  );
}
