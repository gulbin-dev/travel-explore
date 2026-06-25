import { configureStore } from "@reduxjs/toolkit";
// Import the reducer from your slice file
import isImageOnViewReducer from "@utils/redux-toolkit/feature/viewImageSlice"; // Update this path to match your file structure

export const store = configureStore({
  reducer: {
    // Register the reducer here
    isImageOnView: isImageOnViewReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
