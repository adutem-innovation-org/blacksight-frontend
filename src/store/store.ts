import { configureStore } from "@reduxjs/toolkit";
import { authReducer, layoutReducer, reminderReducer } from "./slices";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Layout: layoutReducer,
    Reminder: reminderReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
