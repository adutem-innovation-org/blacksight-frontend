import { ReminderState } from "@/interfaces";

export const initialReminderState: ReminderState = {
  fetchingReminderAnalytics: false,
  reminderAnalyticsFetched: false,
  fetchReminderAnalyticsErrorMessage: "",
  reminderAnalytics: null,

  // Get all reminders
  fetchingAllReminders: false,
  allRemindersFetched: false,
  fetchAllRemindersErrorMessage: "",
  reminders: null,
  meta: null,

  // Create reminder
  creatingReminder: false,
  reminderCreated: false,
  createReminderErrors: {},
  createReminderErrorMessage: "",

  // Update reminder
  updatingReminder: false,
  reminderUpdated: false,
  updateReminderErrors: {},
  updateReminderErrorMessage: "",

  // Update reminder status
  updatingReminderStatus: false,
  reminderStatusUpdated: false,
  updateReminderStatusError: "",

  // Delete reminder
  deletingReminder: false,
  reminderDeleted: false,
  deleteReminderError: "",
};
