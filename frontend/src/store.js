import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

//Let's create the store
const store = configureStore({
  reducer: {
    //With apiSlice we don't need a reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Store has all of the default middleware added, _plus_ the apiSlice middleware
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: TextTrackCue,
});

export default store;
