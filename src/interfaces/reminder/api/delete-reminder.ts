import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IReminder } from "../store";

export interface DeleteReminderRes extends ApiSuccessResponse {
  reminder: IReminder;
}
