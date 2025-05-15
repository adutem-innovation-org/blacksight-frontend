import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  botReducer,
  knowledgeBaseReducer,
  layoutReducer,
  reminderReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Layout: layoutReducer,
    Reminder: reminderReducer,
    KnowledgeBase: knowledgeBaseReducer,
    Bot: botReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
