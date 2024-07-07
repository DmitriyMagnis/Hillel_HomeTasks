import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',

  initialState,
  selectors: {
    selectCount: state => state.value,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const { selectCount } = counterSlice.selectors;

export default counterSlice.reducer;
