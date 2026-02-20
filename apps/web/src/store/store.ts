import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Dummy reducer to prevent RTK combineReducers error until actual slices are added
    app: (state = {}) => state,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
