import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios, { type AxiosError } from 'axios';

import api from '../../api';
import type { ISwapyItem } from '../../myTypes';

const initialState = {
  item: null as ISwapyItem | null,
  loading: false,
  error: null as AxiosError | null,
};

export const swapySlice = createSlice({
  name: 'swapy',
  initialState,
  selectors: {
    selectSwapyItem: state => state.item,
    selectSwapyState: state => state,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSwapyItemById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSwapyItemById.fulfilled,
        (state, action: PayloadAction<ISwapyItem>) => {
          state.item = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchSwapyItemById.rejected,
        (state, { payload }: PayloadAction<AxiosError>) => {
          state.error = payload;
          state.item = null;
          state.loading = false;
        }
      );
  },
});

export const fetchSwapyItemById: any = createAsyncThunk(
  'swapy/fetchById',
  async (id: string, thunkApi) => {
    try {
      const response = await api.fetchById(id);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(
        axios.isAxiosError(err) ? err.response : new Error(String(err))
      );
    }
  }
);

// export const { getItem } = swapySlice.actions;

export const { selectSwapyItem, selectSwapyState } = swapySlice.selectors;

export default swapySlice.reducer;
