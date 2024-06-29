import { useTodosDispatch, useTodosState } from '../../hooks/useTodos';
import TodoAdd from './TodoAdd/TodoAdd';
import TodoItem from './TodoItem/TodoItem';

export default function Todo() {
  const todos = useTodosState();
  const todoHandlers = useTodosDispatch();

  return (
    <>
      <TodoAdd />
      {todos.map(item => (
        <TodoItem
          key={item.id}
          {...item}
          onDelete={todoHandlers.delete}
          onUpdate={todoHandlers.update}
        ></TodoItem>
      ))}
    </>
  );
}
