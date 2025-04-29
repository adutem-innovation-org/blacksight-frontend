import { ReminderState } from "@/interfaces";

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
