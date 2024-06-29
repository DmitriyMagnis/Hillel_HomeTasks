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
