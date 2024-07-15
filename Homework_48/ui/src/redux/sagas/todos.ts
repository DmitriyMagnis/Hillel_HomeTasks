import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import api from '../../api';
import type { ITodoItem, SagaType } from '../../types';
import {
  add,
  getAll,
  onError,
  remove,
  setLoading,
  update,
} from '../slices/todoSlice';

export function* getAllTodos(): SagaType<ITodoItem[]> {
  try {
    yield put(setLoading(true));
    yield put(onError(null));
    const todos = yield call(api.fetchAllTodos);

    yield put(getAll(todos.data));
  } catch (e) {
    if (e instanceof Error) {
      yield put(onError(e));
    } else console.log(String(e));
  } finally {
    yield put(setLoading(false));
  }
}

export function* createTodo(
  action: PayloadAction<Partial<ITodoItem>>
): SagaType<ITodoItem> {
  try {
    yield put(setLoading(true));
    yield put(onError(null));
    const todos = yield call(api.fetchCreateTodo, action.payload);

    yield put(add(todos.data));
  } catch (e) {
    if (e instanceof Error) {
      yield put(onError(e));
    } else console.log(String(e));
  } finally {
    yield put(setLoading(false));
  }
}

export function* updateTodo(
  action: PayloadAction<Partial<ITodoItem>>
): SagaType<Partial<ITodoItem>> {
  try {
    yield put(setLoading(true));
    yield put(onError(null));
    const todos = yield call(api.fetchUpdateTodo, action.payload);

    yield put(update(todos.data));
  } catch (e) {
    if (e instanceof Error) {
      yield put(onError(e));
    } else console.log(String(e));
  } finally {
    yield put(setLoading(false));
  }
}

export function* deleteTodo(
  action: PayloadAction<string>
): SagaType<ITodoItem> {
  try {
    yield put(setLoading(true));
    yield put(onError(null));
    const response = yield call(api.fetchDeleteTodo, action.payload);
    yield put(remove(response.data));
  } catch (e) {
    if (e instanceof Error) {
      yield put(onError(e));
    } else console.log(String(e));
  } finally {
    yield put(setLoading(false));
  }
}
