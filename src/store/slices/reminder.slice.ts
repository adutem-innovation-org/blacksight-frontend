import { createSlice } from "@reduxjs/toolkit";
import {
  resetCreateReminderReducer,
  resetDeleteReminderReducer,
  resetGetAllRemindersReducer,
  resetGetReminderAnalyticsReducer,
  resetUpdateReminderReducer,
  resetUpdateReminderStatusReducer,
} from "../reducers";
import { initialReminderState } from "@/constants";
import {
  createReminderBuilder,
  deleteReminderBuilder,
  getAllRemindersBuilder,
  getReminderAnalyticsBuilder,
  updateReminderBuilder,
  updateReminderStatusBuilder,
} from "../builders";

const reminderSlice = createSlice({
  name: "Reminder",
  initialState: initialReminderState,
  reducers: {
    resetGetReminderAnalytics: resetGetReminderAnalyticsReducer,
    resetGetAllReminders: resetGetAllRemindersReducer,
    resetCreateReminder: resetCreateReminderReducer,
    resetUpdateReminder: resetUpdateReminderReducer,
    resetUpdateReminderStatus: resetUpdateReminderStatusReducer,
    resetDeleteReminder: resetDeleteReminderReducer,
  },
  extraReducers(builder) {
    getReminderAnalyticsBuilder(builder);
    getAllRemindersBuilder(builder);
    createReminderBuilder(builder);
    updateReminderBuilder(builder);
    updateReminderStatusBuilder(builder);
    deleteReminderBuilder(builder);
  },
});

export const reminderReducer = reminderSlice.reducer;
export const {
  resetGetReminderAnalytics,
  resetGetAllReminders,
  resetCreateReminder,
  resetUpdateReminder,
  resetUpdateReminderStatus,
  resetDeleteReminder,
} = reminderSlice.actions;
