import { configureStore } from '@reduxjs/toolkit';
import currentCourse from '../features/reducers/currentCourse';

export const store = configureStore({
  reducer: {
    currentCourse
  },
});