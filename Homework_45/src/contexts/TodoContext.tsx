import {
  createContext,
  useCallback,
  useReducer,
  type PropsWithChildren,
} from 'react';
import { createReducer } from '../misc/helpers';
import {
  ActionTypes,
  type ActionHandlers,
  type ITodoDipsatcher,
  type ITodoItem,
  type ITodoState,
} from '../types';

export const TodoContext = createContext<ITodoItem[]>([]);
export const TodoDispatchContext = createContext<ITodoDipsatcher>(null!);

const initialTodoState: ITodoItem[] = [
  { id: '1', title: 'title', status: true, description: 'asdasda' },
];

const todoReducers: ActionHandlers<ITodoState, ActionTypes> = {
  [ActionTypes.ADD]: (state, action) => {
    console.log(action);
    return state;
  },
  [ActionTypes.UPDATE]: (state: ITodoState, action) => {
    console.log(action);
    return state;
  },
  [ActionTypes.REMOVE]: (state: ITodoState, action) => {
    console.log(action);
    return state;
  },
};

function TodoContextProvider({ children }: PropsWithChildren) {
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

export default TodoContextProvider;
