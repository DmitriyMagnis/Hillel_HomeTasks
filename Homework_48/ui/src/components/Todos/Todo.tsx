import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchAllTodos,
  fetchCreateTodoItem,
  fetchDeleteItem,
  fetchUpdateTodoItem,
  selectTodos,
} from '../../redux/slices/todoSlice';
import type { ITodoItem } from '../../types';
import classes from './Todo.module.css';
import TodoAdd from './TodoAdd/TodoAdd';
import TodoItem from './TodoItem/TodoItem';

export default function Todo() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  const del = useCallback(
    (id: string) => dispatch(fetchDeleteItem(id)),
    [dispatch]
  );
  const update = useCallback(
    (item: Partial<ITodoItem>) => dispatch(fetchUpdateTodoItem(item)),
    [dispatch]
  );
  const add = useCallback(
    (item: Partial<ITodoItem>) => dispatch(fetchCreateTodoItem(item)),
    [dispatch]
  );
  if (!todos) return;
  return (
    <>
      <TodoAdd onAdd={add} />
      {todos.length === 0 && (
        <h4 className={classes.empty}>Todos list is empty!</h4>
      )}

      <div className={classes.wrapper}>
        {todos.map(item => (
          <TodoItem key={item._id} {...item} onDelete={del} onUpdate={update} />
        ))}
      </div>
    </>
  );
}
