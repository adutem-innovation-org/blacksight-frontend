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
};
