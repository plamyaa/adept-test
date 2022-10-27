import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import companiesSlice from './companiesSlice';
import employeesSlice from './employeesSlice';

export const store = configureStore({
  reducer: {
    companies: companiesSlice,
    employees: employeesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
