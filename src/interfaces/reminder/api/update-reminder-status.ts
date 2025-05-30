import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Reminder } from "../store";

export interface UpdateReminderStatusRes extends ApiSuccessResponse {
  reminder: Reminder;
}
