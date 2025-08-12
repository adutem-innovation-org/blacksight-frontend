import { createSlice } from "@reduxjs/toolkit";
import {
  resetCreateReminderReducer,
  resetCreateScheduledReminderReducer,
  resetDeleteReminderReducer,
  resetGetAllRemindersReducer,
  resetGetReminderAnalyticsReducer,
  resetSendInstantReminderReducer,
  resetUpdateReminderReducer,
  resetUpdateReminderStatusReducer,
} from "../reducers";
import { initialReminderState } from "@/constants";
import {
  createReminderBuilder,
  createScheduledReminderBuilder,
  deleteReminderBuilder,
  getAllRemindersBuilder,
  getReminderAnalyticsBuilder,
  sendInstantReminderBuilder,
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
    resetSendInstantReminder: resetSendInstantReminderReducer,
    resetCreateScheduledReminder: resetCreateScheduledReminderReducer,
  },
  extraReducers(builder) {
    getReminderAnalyticsBuilder(builder);
    getAllRemindersBuilder(builder);
    createReminderBuilder(builder);
    updateReminderBuilder(builder);
    updateReminderStatusBuilder(builder);
    deleteReminderBuilder(builder);
    sendInstantReminderBuilder(builder);
    createScheduledReminderBuilder(builder);
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
  resetSendInstantReminder,
  resetCreateScheduledReminder,
} = reminderSlice.actions;
