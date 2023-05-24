import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiAxios from '../api';
import { REQUEST_STATUS } from '../constants/constants';
import { IVacancie } from '../types/types';

interface IVacancieSingleSlice {
  vacancieSingle: IVacancie | null;
  vacancieSingleStatus: string;
}

const initialState: IVacancieSingleSlice = {
  vacancieSingle: null,
  vacancieSingleStatus: '',
};

export const vacancieSingleReq = createAsyncThunk<IVacancie, string, { rejectValue: string }>(
  'vacancieSingle/vacancieSingleReq',
  async (id, { rejectWithValue }) => {
    return await apiAxios
      .get<IVacancie>(`/2.0/vacancies/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error?.response) {
          return rejectWithValue(error.message);
        } else {
          return rejectWithValue('Something went wrong, please try reloading the page.');
        }
      });
  },
  {
    condition: (_, { getState }) => {
      const { vacancieSingle } = getState() as { vacancieSingle: IVacancieSingleSlice };
      if (vacancieSingle.vacancieSingleStatus === REQUEST_STATUS.pending) {
        return false;
      }
      return true;
    },
  }
);

const vacancieSingleSlice = createSlice({
  name: 'vacancieSingle',
  initialState,
  reducers: {
    setVacancieSingle: (state, action: { payload: IVacancie }) => {
      state.vacancieSingle = action.payload;
    },
    resetVacancieSingle: (state) => {
      state.vacancieSingle = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(vacancieSingleReq.fulfilled, (state, action) => {
      state.vacancieSingleStatus = REQUEST_STATUS.fulfilled;
      state.vacancieSingle = action.payload;
    });
    builder.addCase(vacancieSingleReq.pending, (state) => {
      state.vacancieSingleStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(vacancieSingleReq.rejected, (state, action) => {
      state.vacancieSingleStatus = REQUEST_STATUS.rejected;
      console.log(action.payload);
    });
  },
});

export const { setVacancieSingle, resetVacancieSingle } = vacancieSingleSlice.actions;
export default vacancieSingleSlice;
