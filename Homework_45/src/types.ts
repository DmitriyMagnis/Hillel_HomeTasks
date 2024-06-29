import type { NavLinkProps } from 'react-router-dom';

export type LinkClassNameType = NavLinkProps['className'];

export interface ITodoItem {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

export enum ActionTypes {
  ADD = 'add',
  UPDATE = 'update',
  REMOVE = 'remove',
}
export type ActionHandlers<S, KEYS extends string> = {
  [key in KEYS]: (state: S, action: ReducerAction<any>) => S;
};

export type ITodoState = ITodoItem[];

export type ReducerAction<P> = {
  type: ActionTypes;
  payload: P;
};

export type ITodoDipsatcher = {
  add: (payload: Omit<ITodoItem, 'id' | 'status'>) => void;
  delete: (id: string) => void;
  update: (payload: Partial<ITodoItem>) => void;
};
