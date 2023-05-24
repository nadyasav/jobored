import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiAxios from '../api';
import { REQUEST_STATUS } from '../constants/constants';
import { IVacancie, IVacancieParams } from '../types/types';
import { getLocalStorage } from '../utils/get-local-storage';

interface IVacanciesSlice {
  vacancies: Array<IVacancie>;
  vacanciesStatus: string;
  favorites: Array<number>;
  count: number;
  page: number;
  total: number;
}

const initialState: IVacanciesSlice = {
  vacancies: [],
  vacanciesStatus: '',
  favorites: getLocalStorage('favorites'),
  count: 4,
  page: 0,
  total: 0,
};

export const vacanciesReq = createAsyncThunk<
  { objects: Array<IVacancie>; total: number },
  IVacancieParams | undefined,
  { rejectValue: string }
>(
  'vacancies/vacanciesReq',
  async (params, { rejectWithValue }) => {
    return await apiAxios
      .get<{ objects: Array<IVacancie>; total: number }>('/2.0/vacancies/', {
        params: { published: 1, ...params },
      })
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
      const { vacancies } = getState() as { vacancies: IVacanciesSlice };
      if (vacancies.vacanciesStatus === REQUEST_STATUS.pending) {
        return false;
      }
      return true;
    },
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.favorites = JSON.stringify(state.favorites);
    },
    removeFavorite: (state, action) => {
      const index = state.favorites.indexOf(action.payload);
      if (index > -1) {
        state.favorites.splice(index, 1);
      }
      localStorage.favorites = JSON.stringify(state.favorites);
    },
    resetVacancies: (state) => {
      state.vacancies = [];
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(vacanciesReq.fulfilled, (state, action) => {
      state.vacanciesStatus = REQUEST_STATUS.fulfilled;
      state.total =
        action.payload.total <= 500
          ? Math.ceil(action.payload.total / state.count)
          : Math.ceil(500 / state.count);
      state.vacancies = action.payload.objects;
    });
    builder.addCase(vacanciesReq.pending, (state) => {
      state.vacanciesStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(vacanciesReq.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { addFavorite, removeFavorite, resetVacancies, setPage, setTotal } =
  vacanciesSlice.actions;
export default vacanciesSlice;
