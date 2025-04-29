import { createSlice } from "@reduxjs/toolkit";
import {
  resetCreateReminderReducer,
  resetGetAllRemindersReducer,
  resetGetReminderAnalyticsReducer,
} from "../reducers";
import { initialReminderState } from "@/constants";
import {
  createReminderBuilder,
  getAllRemindersBuilder,
  getReminderAnalyticsBuilder,
} from "../builders";

const reminderSlice = createSlice({
  name: "Reminder",
  initialState: initialReminderState,
  reducers: {
    resetGetReminderAnalytics: resetGetReminderAnalyticsReducer,
    resetGetAllReminders: resetGetAllRemindersReducer,
    resetCreateReminder: resetCreateReminderReducer,
  },
  extraReducers(builder) {
    getReminderAnalyticsBuilder(builder);
    getAllRemindersBuilder(builder);
    createReminderBuilder(builder);
  },
});

export const reminderReducer = reminderSlice.reducer;
export const {
  resetGetReminderAnalytics,
  resetGetAllReminders,
  resetCreateReminder,
} = reminderSlice.actions;
