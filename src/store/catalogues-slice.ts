import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiAxios from '../api';
import { REQUEST_STATUS } from '../constants/constants';
import { ICatalogue } from '../types/types';

interface ICataloguesSlice {
  catalogues: Array<ICatalogue>;
  cataloguesStatus: string;
}

const initialState: ICataloguesSlice = {
  catalogues: [],
  cataloguesStatus: '',
};

export const cataloguesReq = createAsyncThunk<Array<ICatalogue>, void, { rejectValue: string }>(
  'catalogues/cataloguesReq',
  async (_, { rejectWithValue }) => {
    return await apiAxios
      .get<Array<ICatalogue>>('/2.0/catalogues/')
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
      const { catalogues } = getState() as { catalogues: ICataloguesSlice };
      if (catalogues.cataloguesStatus === REQUEST_STATUS.pending) {
        return false;
      }
      return true;
    },
  }
);

const cataloguesSlice = createSlice({
  name: 'catalogues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cataloguesReq.fulfilled, (state, action) => {
      state.cataloguesStatus = REQUEST_STATUS.fulfilled;
      state.catalogues = action.payload;
    });
    builder.addCase(cataloguesReq.pending, (state) => {
      state.cataloguesStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(cataloguesReq.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default cataloguesSlice;
