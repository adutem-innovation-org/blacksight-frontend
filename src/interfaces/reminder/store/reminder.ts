import {
  EventTrigger,
  ProdReminderTypes,
  RecurrencePattern,
  ReminderCategory,
  ReminderChannels,
  ReminderStatus,
  ReminderTypes,
} from "@/enums";
import { UpdateReminderStatusRes } from "../api";
import { IPaymentFile } from "@/interfaces/payment-tracker";

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

export type IReminder = {
  _id: string;

  userId: string;
  tag: string;

  // Recipients
  email?: string;
  phone?: string;
  emails?: string[];
  phones?: string[];

  // Basic properties
  channel: ReminderChannels;
  type: ProdReminderTypes;
  category: ReminderCategory;
  status: ReminderStatus;
  isActive: boolean;
  isBulk: boolean;

  // Content
  subject?: string; // For emails
  message: string;
  template?: string;
  templateId?: string;
  templateData?: Record<string, any>;
  fileId?: string;
  file?: IPaymentFile;

  // Scheduling
  remindAt?: Date; // For instant and scheduled
  eventDate?: Date; // For event-based reminders
  eventTrigger?: EventTrigger;
  triggerOffset?: number; // Minutes before/after event

  // Recurrence
  recurrencePattern?: RecurrencePattern;
  recurrenceInterval?: number; // For EVERY_N_* patterns
  recurrenceEnd?: Date; // When to stop recurring
  recurrenceCount?: number; // How many times to repeat
  customCronExpression?: string; // For complex patterns
  startDate?: Date;
  endDate?: Date;

  // Execution tracking
  nextExecution?: Date;
  lastExecution?: Date;
  executionCount: number;
  maxExecutions?: number;

  // Results tracking
  successCount: number;
  failureCount: number;
  lastError?: string;

  // Metadata
  timezone?: string;
  priority?: number; // 1-10, higher is more important
  retryCount?: number;
  maxRetries?: number;

  createdAt: Date;
  updatedAt: Date;
};
