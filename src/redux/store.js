import { configureStore } from '@reduxjs/toolkit';
import cafeReducer from './cafereducers';
import employeereducers from './employeereducers';

export const store = configureStore({
  reducer: {
    cafe: cafeReducer,
    employee:employeereducers
  },
});