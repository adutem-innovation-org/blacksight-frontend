import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "@/interfaces/bot";

export type SubmitTicketBody = {
  customerName: string;
  customerEmail: string;
  message: string;
};

export interface SubmitTicketRes extends ApiSuccessResponse {
  chatData: Message[];
}
