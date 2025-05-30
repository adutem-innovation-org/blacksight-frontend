import { PaginationMetaData } from "@/interfaces/pagination";
import { Reminder } from "./reminder";

export type ReminderState = {
  fetchingReminderAnalytics: boolean;
  reminderAnalyticsFetched: boolean;
  fetchReminderAnalyticsErrorMessage: string;
  reminderAnalytics: Record<string, number> | null;

  // Get all reminders
  fetchingAllReminders: boolean;
  allRemindersFetched: boolean;
  fetchAllRemindersErrorMessage: string;
  reminders: Reminder[] | null;
  meta: PaginationMetaData | null;

  // Create reminder
  creatingReminder: boolean;
  reminderCreated: boolean;
  createReminderErrors: Record<string, string>;
  createReminderErrorMessage: string;

  // Update reminder
  updatingReminder: boolean;
  reminderUpdated: boolean;
  updateReminderErrors: Record<string, string>;
  updateReminderErrorMessage: string;

  // Update reminder status
  updatingReminderStatus: boolean;
  reminderStatusUpdated: boolean;
  updateReminderStatusError: string;

  // Delete reminder
  deletingReminder: boolean;
  reminderDeleted: boolean;
  deleteReminderError: string;
};
