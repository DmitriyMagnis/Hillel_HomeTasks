import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios, { type AxiosError } from 'axios';
import api from '../../api';
import type { ISwapyItem } from '../../types';

const initialState = {
  //   items: getInitialTodoSate(),
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
  reducers: {
    getItem: () => {},
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSwapyItemById.pending, state => {
        state.loading = true;
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
        (state, { payload }: PayloadAction<any>) => {
          state.error = payload;
          state.loading = false;
        }
      );
  },
});

const fetchSwapyItemById = createAsyncThunk(
  'swapy/fetchById',
  async (id: string, thunkApi) => {
    try {
      const response = await api.fetchById(id);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response);
      }
      console.error(String(err));
    }
  }
);
export { fetchSwapyItemById };

export const { getItem } = swapySlice.actions;

export const { selectSwapyItem, selectSwapyState } = swapySlice.selectors;

export default swapySlice.reducer;
