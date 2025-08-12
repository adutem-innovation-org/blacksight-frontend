import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Reminder } from "../store";
import { ReminderCategory, ReminderChannels } from "@/enums";

export interface CreateReminderRes extends ApiSuccessResponse {
  reminder: Reminder;
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
