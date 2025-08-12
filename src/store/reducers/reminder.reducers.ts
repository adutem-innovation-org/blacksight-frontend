import { ReminderState } from "@/interfaces";
import { stat } from "fs";

export const resetGetReminderAnalyticsReducer = (state: ReminderState) => {
  state.fetchingReminderAnalytics = false;
  state.reminderAnalyticsFetched = false;
  state.fetchReminderAnalyticsErrorMessage = "";
};

export const resetGetAllRemindersReducer = (state: ReminderState) => {
  state.fetchingAllReminders = false;
  state.allRemindersFetched = false;
  state.fetchAllRemindersErrorMessage = "";
};

export const resetCreateReminderReducer = (state: ReminderState) => {
  state.creatingReminder = false;
  state.reminderCreated = false;
  state.createReminderErrors = {};
  state.createReminderErrorMessage = "";
};

export const resetUpdateReminderReducer = (state: ReminderState) => {
  state.updatingReminder = false;
  state.reminderUpdated = false;
  state.updateReminderErrorMessage = "";
  state.updateReminderErrors = {};
};

export const resetUpdateReminderStatusReducer = (state: ReminderState) => {
  state.updatingReminderStatus = false;
  state.reminderStatusUpdated = false;
  state.updateReminderStatusError = "";
};

export const resetDeleteReminderReducer = (state: ReminderState) => {
  state.deletingReminder = false;
  state.reminderDeleted = false;
  state.deleteReminderError = "";
};

export const resetSendInstantReminderReducer = (state: ReminderState) => {
  state.sendingInstantReminder = false;
  state.instantReminderSent = false;
  state.sendInstantReminderErrors = {};
  state.sendInstantReminderErrorMsg = "";
};

export const resetCreateScheduledReminderReducer = (state: ReminderState) => {
  state.creatingScheduledReminder = false;
  state.scheduledReminderCreated = false;
  state.createScheduledReminderErrors = {};
  state.createScheduledReminderErrorMsg = "";
};
