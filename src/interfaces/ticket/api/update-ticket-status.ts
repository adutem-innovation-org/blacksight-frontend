import { TicketStatus } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Ticket } from "../store";

export type UpdateTicketStatusBody = {
  status: TicketStatus;
};

export interface UpdateTicketStatusRes extends ApiSuccessResponse {
  ticket: Ticket;
}
