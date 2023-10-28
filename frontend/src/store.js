import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

//Let's create the store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: TextTrackCue,
});

export default store;
