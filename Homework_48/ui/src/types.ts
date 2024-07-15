import type { PayloadAction } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import type { NavLinkProps } from 'react-router-dom';
import type { CallEffect, PutEffect } from 'redux-saga/effects';

export type LinkClassNameType = NavLinkProps['className'];

export interface ITodoItem {
  _id: string;
  title: string;
  completed: boolean;
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
  add: (payload: Pick<ITodoItem, 'title'>) => void;
  delete: (id: string) => void;
  update: (payload: Partial<ITodoItem>) => void;
};

export enum ITheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export type SagaType<T> = Generator<
  // step types
  CallEffect | PutEffect<PayloadAction<T | Error | null | boolean>>,
  // return type
  void,
  // intermediate argument
  AxiosResponse<T>
>;
