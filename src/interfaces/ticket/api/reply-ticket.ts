import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Ticket } from "../store";

export type ReplyTicketBody = {
  message: string;
};

export interface ReplyTicketRes extends ApiSuccessResponse {
  ticket: Ticket;
}
