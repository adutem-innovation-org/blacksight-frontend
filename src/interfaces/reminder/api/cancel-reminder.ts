import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IReminder } from "../store";

export interface CancelReminderRes extends ApiSuccessResponse {
  reminder: IReminder;
}
