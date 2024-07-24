import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
// import { getInitialTodoSate } from '../../misc/helpers';
import { ITodoItem } from '../../types';

export const initialState = {
  //   items: getInitialTodoSate(),
  items: [] as ITodoItem[],
  loading: false,
  error: null as Error | null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  selectors: {
    selectTodos: state => state.items,
  },
  reducers: {
    getAll: (state, { payload }: PayloadAction<ITodoItem[]>) => {
      state.items = payload;
    },
    add: (state, { payload }: PayloadAction<ITodoItem>) => {
      state.items.push(payload);
    },
    remove: (state, { payload }: PayloadAction<ITodoItem>) => {
      console.log('>> ', payload);
      const newState = state.items.filter(todo => todo._id !== payload._id);
      state.items = newState;
    },
    update: (state, { payload }: PayloadAction<Partial<ITodoItem>>) => {
      state.items.forEach(todo => {
        if (payload._id === todo._id) {
          Object.assign(todo, payload);
        }
      });
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    onError: (state, { payload }: PayloadAction<Error | null>) => {
      state.error = payload;
    },
  },
});

export const fetchAllTodos = createAction('todos/fetchAllTodos');
export const fetchDeleteItem = createAction<string>('todos/fetchDeleteItem');
export const fetchCreateTodoItem = createAction<Partial<ITodoItem>>(
  'todos/fetchCreateItem'
);
export const fetchUpdateTodoItem = createAction<Partial<ITodoItem>>(
  'todos/fetchUpdateItem'
);

export const { add, remove, update, getAll, setLoading, onError } =
  todosSlice.actions;

export const { selectTodos } = todosSlice.selectors;

export default todosSlice.reducer;
