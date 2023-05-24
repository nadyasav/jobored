import { createSlice } from '@reduxjs/toolkit';

const filtersInitial = {
  catalogue: undefined,
  payment_from: undefined,
  payment_to: undefined,
  keyword: undefined,
};

const initialState: {
  catalogue: number | undefined;
  payment_from: number | undefined;
  payment_to: number | undefined;
  keyword: string | undefined;
} = {
  ...filtersInitial,
};

export const filtersSlice = createSlice({
  name: 'filtersState',
  initialState,
  reducers: {
    setCatalogue: (state, action) => {
      state.catalogue = action.payload;
    },
    setPaymentFrom: (state, action) => {
      state.payment_from = action.payload;
    },
    setPaymentTo: (state, action) => {
      state.payment_to = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    resetFilters: (state) => {
      state.catalogue = undefined;
      state.payment_from = undefined;
      state.payment_to = undefined;
      state.keyword = undefined;
    },
  },
});

export const { setCatalogue, setPaymentFrom, setPaymentTo, resetFilters, setKeyword } =
  filtersSlice.actions;
