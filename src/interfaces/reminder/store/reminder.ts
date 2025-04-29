import { ReminderChannels, ReminderTypes } from "@/enums";

export type Reminder = {
  _id: string;
  userId: string;
  tag: string;
  email?: string;
  emails?: string[];
  phone?: string;
  phones?: string[];
  channel: ReminderChannels;
  type: ReminderTypes;
  isActive: boolean;
  isBulk: boolean;
  remindAt: string;
  reminderSent: boolean;
  reminderSentAt?: string;
};
