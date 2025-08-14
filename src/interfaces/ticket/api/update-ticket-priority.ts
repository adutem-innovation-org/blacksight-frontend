import { TicketPriority } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Ticket } from "../store";

export type UpdateTicketPriorityBody = {
  priority: TicketPriority;
};

export interface UpdateTicketPriorityRes extends ApiSuccessResponse {
  ticket: Ticket;
}
