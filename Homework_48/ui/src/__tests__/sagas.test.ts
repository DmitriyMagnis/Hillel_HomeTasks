import api from '../api';
import { getAllTodos } from '../redux/sagas/todos';
import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { getAll, onError, setLoading } from '../redux/slices/todoSlice';
import { throwError } from 'redux-saga-test-plan/providers';

const todoItems = [
  { _id: '1231312', title: 'title', completed: false },
  { _id: '1231313', title: 'title', completed: false },
];

describe('SAGAS: ', () => {
  it('getAllTodos: should fetch all todos successfully', () => {
    return expectSaga(getAllTodos)
      .provide([[call(api.fetchAllTodos), { data: todoItems }]])
      .put(setLoading(true))
      .put(onError(null))
      .call(api.fetchAllTodos)
      .put(getAll(todoItems))
      .put(setLoading(false))
      .run();
  });

  it('getAllTodos: should throw error', () => {
    const error = new Error('Some error');
    return expectSaga(getAllTodos)
      .provide([[call(api.fetchAllTodos), throwError(error)]])
      .put(setLoading(true))
      .put(onError(null))
      .call(api.fetchAllTodos)
      .put(onError(error))
      .put(setLoading(false))
      .run();
  });

  //other sagas
});
