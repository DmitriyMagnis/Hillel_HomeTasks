import { combineReducers } from '@reduxjs/toolkit';
import swapyReducer from './swapiSlice';

export const rootReducer = combineReducers({
  swapy: swapyReducer,
});
