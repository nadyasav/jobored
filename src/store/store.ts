import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth-slice';
import vacanciesSlice from './vacancies-slice';
import cataloguesSlice from './catalogues-slice';
import { filtersSlice } from './filtersSlice';
import vacancieSingleSlice from './vacancieSingleSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    vacancies: vacanciesSlice.reducer,
    catalogues: cataloguesSlice.reducer,
    filters: filtersSlice.reducer,
    vacancieSingle: vacancieSingleSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
