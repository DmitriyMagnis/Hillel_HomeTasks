import type {
  ActionHandlers,
  ActionTypes,
  ITodoState,
  ReducerAction,
} from '../types';

export const createReducer =
  (handlers: ActionHandlers<ITodoState, ActionTypes>) =>
  (state: ITodoState, action: ReducerAction<any>): ITodoState => {
    return handlers[action.type](state, action) ?? state;
  };

export function uuid(): string {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}

export const validate = (str: string): boolean => {
  return Boolean(str.trim());
};

export const getInitialTodoSate = (): ITodoState => {
  const state = localStorage.getItem('todos');
  if (state) return JSON.parse(state);
  return [];
};
