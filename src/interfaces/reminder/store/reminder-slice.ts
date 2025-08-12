import { PaginationMetaData } from "@/interfaces/pagination";
import { IReminder, Reminder } from "./reminder";
import { NewReminderAnalyticsRes } from "../api";

export type ReminderState = {
  fetchingReminderAnalytics: boolean;
  reminderAnalyticsFetched: boolean;
  fetchReminderAnalyticsErrorMessage: string;
  reminderAnalytics: Record<string, number> | null;
  analyticsData: NewReminderAnalyticsRes["data"] | null;

  // Get all reminders
  fetchingAllReminders: boolean;
  allRemindersFetched: boolean;
  fetchAllRemindersErrorMessage: string;
  reminders: IReminder[] | null;
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

  // Send instant reminder
  sendingInstantReminder: boolean;
  instantReminderSent: boolean;
  sendInstantReminderErrors: Record<string, string>;
  sendInstantReminderErrorMsg: string;
};
