import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { createTodo, deleteTodo, getAllTodos, updateTodo } from './todos';

function* rootSaga() {
  yield all([
    takeEvery('todos/fetchAllTodos', getAllTodos),
    takeEvery('todos/fetchCreateItem', createTodo),
    takeLatest('todos/fetchUpdateItem', updateTodo),
    takeEvery('todos/fetchDeleteItem', deleteTodo),
  ]);
}

export default rootSaga;
