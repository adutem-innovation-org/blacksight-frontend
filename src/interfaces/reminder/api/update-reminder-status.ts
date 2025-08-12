import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IReminder } from "../store";

export interface UpdateReminderStatusRes extends ApiSuccessResponse {
  reminder: IReminder;
}
