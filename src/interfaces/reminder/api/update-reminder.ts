import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IReminder, Reminder } from "../store";
import { CreateScheduledReminderBody } from "./create-reminder";

export interface UpdateReminderRes extends ApiSuccessResponse {
  reminder: IReminder;
}

export type UpdateReminderBody = Partial<CreateScheduledReminderBody>;
