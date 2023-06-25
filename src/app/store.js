import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import { apiSlice } from "./api/api-slice";
import authReducer from "features/auth/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
