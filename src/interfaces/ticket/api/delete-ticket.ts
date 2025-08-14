import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Ticket } from "../store";

export interface DeleteTicketRes extends ApiSuccessResponse {
  ticket: Ticket;
}
