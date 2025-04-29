import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Reminder } from "../store";

export interface CreateReminderRes extends ApiSuccessResponse {
  reminder: Reminder;
}

export type CreateReminderBody = FormData;
