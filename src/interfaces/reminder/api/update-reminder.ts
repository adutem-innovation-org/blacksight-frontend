import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Reminder } from "../store";

export interface UpdateReminderRes extends ApiSuccessResponse {
  reminder: Reminder;
}

export type UpdateReminderBody = FormData;
