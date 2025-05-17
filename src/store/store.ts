import { configureStore } from "@reduxjs/toolkit";
import {
  analyticsReducer,
  authReducer,
  botReducer,
  knowledgeBaseReducer,
  layoutReducer,
  reminderReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    Analytics: analyticsReducer,
    Auth: authReducer,
    Bot: botReducer,
    KnowledgeBase: knowledgeBaseReducer,
    Layout: layoutReducer,
    Reminder: reminderReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
