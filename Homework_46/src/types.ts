import type { NavLinkProps } from 'react-router-dom';

export type LinkClassNameType = NavLinkProps['className'];

export interface ITodoItem {
  id: string;
  title: string;
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

export type ReducerAction<P> = {
  type: ActionTypes;
  payload: P;
};

export type ITodoDipsatcher = {
  add: (payload: ITodoItem) => void;
  delete: (id: string) => void;
  update: (payload: Partial<ITodoItem>) => void;
};

export enum ITheme {
  DARK = 'dark',
  LIGHT = 'light',
}
