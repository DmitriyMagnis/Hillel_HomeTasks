import type {
  ActionHandlers,
  ActionTypes,
  ITodoItem,
  ReducerAction,
} from '../types';

export const createReducer =
  (handlers: ActionHandlers<ITodoItem[], ActionTypes>) =>
  (state: ITodoItem[], action: ReducerAction<any>): ITodoItem[] => {
    return handlers[action.type](state, action) ?? state;
  };

export function uuid(): string {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}

export const validate = (str: string): boolean => {
  return Boolean(str.trim());
};

export const getInitialTodoSate = (): ITodoItem[] => {
  const state = localStorage.getItem('todos');
  if (state) return JSON.parse(state);
  return [];
};
