import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "@/interfaces/bot";

export type BookAppointmentBody = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  dateTime: string;
  timezone: string;
};

export interface BookAppointmentRes extends ApiSuccessResponse {
  chatData: Message[];
}
