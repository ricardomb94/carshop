import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
import orderSliceReducer from "./slices/authSlice";
// import vehiculeSliceReducer from "./slices/vehiculesApiSlice";
// import serviceSliceReducer from "./slices/servicesApiSlice"
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    order: orderSliceReducer,
    // vehicule: vehiculeSliceReducer,
    // service: serviceSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
