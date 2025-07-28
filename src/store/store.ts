import { configureStore } from "@reduxjs/toolkit";
import {
  analyticsReducer,
  apiKeyReducer,
  appointmentReducer,
  authReducer,
  botReducer,
  knowledgeBaseReducer,
  layoutReducer,
  meetingProviderReducer,
  reminderReducer,
  templateReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    Analytics: analyticsReducer,
    ApiKey: apiKeyReducer,
    Auth: authReducer,
    Bot: botReducer,
    KnowledgeBase: knowledgeBaseReducer,
    Layout: layoutReducer,
    Reminder: reminderReducer,
    Calendar: meetingProviderReducer,
    Appointment: appointmentReducer,
    Template: templateReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
