import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "../store";

export type ScheduleAppointmentBody = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  dateTime: string;
  timezone: string;
  botId: string;
  conversationId: string;
};

export interface ScheduleAppointmentRes extends ApiSuccessResponse {
  chatData: Message[];
}
