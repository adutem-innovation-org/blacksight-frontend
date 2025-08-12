import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IReminder, Reminder } from "../store";
import {
  EventTrigger,
  ProdReminderTypes,
  RecurrencePattern,
  ReminderCategory,
  ReminderChannels,
} from "@/enums";

export interface CreateReminderRes extends ApiSuccessResponse {
  reminder: IReminder;
}

export type CreateReminderBody = FormData;

export interface SendInstantReminderBody {
  tag: string;
  subject: string;
  message: string;
  channel: ReminderChannels;
  category: ReminderCategory;
  fileId: string;
  isBulk: boolean;
  template?: string;
  templateId?: string;
  templateData: Record<string, string>;
}

export interface CreateScheduledReminderBody extends SendInstantReminderBody {
  type: ProdReminderTypes;
  remindAt: Date;
  recurrencePattern?: RecurrencePattern;
  recurrenceInterval?: number;
  startDate?: Date;
  endDate?: Date;
  maxExecutions?: number;
  customCronExpression?: string;
  eventDate?: Date;
  eventTrigger?: EventTrigger;
  triggerOffset?: number;
  timezone?: string;
  priority?: number;
  maxRetries?: number;
  isActive?: boolean;
}
