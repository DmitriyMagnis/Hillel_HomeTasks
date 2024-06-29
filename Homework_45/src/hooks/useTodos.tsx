import { useContext } from 'react';
import { TodoContext, TodoDispatchContext } from '../contexts/TodoContext';

export const useTodosDispatch = () => {
  return useContext(TodoDispatchContext);
};
export const useTodosState = () => {
  return useContext(TodoContext);
};
