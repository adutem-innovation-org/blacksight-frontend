import { configureStore } from "@reduxjs/toolkit";
import { authReducer, layoutReducer } from "./slices";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Layout: layoutReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
