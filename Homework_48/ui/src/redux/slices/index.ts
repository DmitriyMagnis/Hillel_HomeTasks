import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';

export const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todoReducer,
});
