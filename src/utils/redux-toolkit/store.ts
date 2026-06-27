import { configureStore } from "@reduxjs/toolkit";
// Import the reducer from your slice file
import isImageOnViewReducer from "@utils/redux-toolkit/feature/viewImageSlice";
import isMapOnViewReducer from "@utils/redux-toolkit/feature/viewMapSlice";

export const store = configureStore({
  reducer: {
    // Register the reducer here
    isImageOnView: isImageOnViewReducer,
    isMapOnView: isMapOnViewReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
