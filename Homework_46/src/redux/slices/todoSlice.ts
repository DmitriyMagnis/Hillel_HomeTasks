import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import { getInitialTodoSate } from '../../misc/helpers';
import { uuid } from '../../misc/helpers';
import { ITodoItem } from '../../types';

const initialState = {
  //   items: getInitialTodoSate(),
  items: [] as ITodoItem[],
};

export const todosSlice = createSlice({
  name: 'todos',

  initialState,
  selectors: {
    selectTodos: state => state.items,
  },
  reducers: {
    add: {
      reducer: (state, { payload }: PayloadAction<ITodoItem>) => {
        state.items.push(payload);
      },
      prepare: (data: Pick<ITodoItem, 'title'>) => {
        const id = String(uuid());
        return {
          payload: { title: data.title, id, status: false },
        };
      },
    },
    remove: (state, { payload }: PayloadAction<string>) => {
      const newState = state.items.filter(todo => todo.id !== payload);
      state.items = newState;
    },
    update: (state, { payload }: PayloadAction<Partial<ITodoItem>>) => {
      state.items.forEach(todo => {
        if (payload.id === todo.id) {
          Object.assign(todo, payload);
        }
      });
    },
  },
});

export const { add, remove, update } = todosSlice.actions;

export const { selectTodos } = todosSlice.selectors;

export default todosSlice.reducer;
