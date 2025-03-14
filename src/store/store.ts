import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
