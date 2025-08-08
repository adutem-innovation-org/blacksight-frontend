import { configureStore } from "@reduxjs/toolkit";
import {
  agentReducer,
  analyticsReducer,
  apiKeyReducer,
  appointmentReducer,
  authReducer,
  botReducer,
  knowledgeBaseReducer,
  layoutReducer,
  meetingProviderReducer,
  paymentTrackedReducer,
  productRecommendationReducer,
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
    Agent: agentReducer,
    ProductRecommendation: productRecommendationReducer,
    PaymentTracker: paymentTrackedReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
