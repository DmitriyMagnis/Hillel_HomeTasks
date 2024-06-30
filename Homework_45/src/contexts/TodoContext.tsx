import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from 'react';
import { createReducer, getInitialTodoSate } from '../misc/helpers';
import {
  ActionTypes,
  type ActionHandlers,
  type ITodoDipsatcher,
  type ITodoItem,
  type ITodoState,
} from '../types';

export const TodoContext = createContext<ITodoItem[]>([]);
export const TodoDispatchContext = createContext<ITodoDipsatcher>({
  add: () => {},
  delete: () => {},
  update: () => {},
});

const initialTodoState: ITodoState = getInitialTodoSate();

const todoReducers: ActionHandlers<ITodoState, ActionTypes> = {
  [ActionTypes.ADD]: (todos, { payload }) => {
    return [...todos, payload];
  },
  [ActionTypes.UPDATE]: (todos, { payload }) => {
    return todos.map(todo =>
      payload.id === todo.id ? { ...todo, ...payload } : todo
    );
  },
  [ActionTypes.REMOVE]: (todos, { payload }) => {
    return todos.filter(todo => todo.id !== payload);
  },
};

function TodoProvider({ children }: PropsWithChildren) {
  const [todos, dispatch] = useReducer(
    createReducer(todoReducers),
    initialTodoState
  );
  const handleAddTodo: ITodoDipsatcher['add'] = useCallback(payload => {
    dispatch({ type: ActionTypes.ADD, payload });
  }, []);

  const handleDeleteTodo: ITodoDipsatcher['delete'] = useCallback(id => {
    dispatch({ type: ActionTypes.REMOVE, payload: id });
  }, []);
  const handleUpdateTodo: ITodoDipsatcher['update'] = useCallback(payload => {
    dispatch({ type: ActionTypes.UPDATE, payload });
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider
        value={{
          add: handleAddTodo,
          delete: handleDeleteTodo,
          update: handleUpdateTodo,
        }}
      >
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}

export default TodoProvider;
