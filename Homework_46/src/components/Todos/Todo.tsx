import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { add, remove, selectTodos, update } from '../../redux/slices/todoSlice';
import classes from './Todo.module.css';
import TodoAdd from './TodoAdd/TodoAdd';
import TodoItem from './TodoItem/TodoItem';

export default function Todo() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  return (
    <>
      <TodoAdd onAdd={item => dispatch(add(item))} />
      {todos.length === 0 && (
        <h4 className={classes.empty}>Todos list is empty!</h4>
      )}

      <div className={classes.wrapper}>
        {todos.map(item => (
          <TodoItem
            key={item.id}
            {...item}
            onDelete={id => dispatch(remove(id))}
            onUpdate={item => dispatch(update(item))}
          />
        ))}
      </div>
    </>
  );
}
