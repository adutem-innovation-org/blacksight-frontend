import { PaginationMetaData } from "@/interfaces/pagination";
import { Ticket } from "./ticket";

export interface TicketState {
  fetchingAllTickets: boolean;
  allTicketsFetched: boolean;
  fetchAllTicketsErrorMsg: string;
  tickets: Ticket[] | null;
  meta: PaginationMetaData | null;

  fetchingTicketAnalytics: boolean;
  ticketAnalyticsFetched: boolean;
  fetchTicketAnalyticsErrorMsg: string;
  ticketAnalytics: TicketAnalytics | null;

  updatingTicketStatus: boolean;
  ticketStatusUpdated: boolean;
  updateTicketStatusErrorMsg: string;

  replyingTicket: boolean;
  ticketReplied: boolean;
  replyTicketErrorMsg: string;

  deletingTicket: boolean;
  ticketDeleted: boolean;
  deleteTicketErrorMsg: string;

  updatingTicketPriority: boolean;
  ticketPriorityUpdated: boolean;
  updateTicketPriorityErrorMsg: string;

  currentTicket: Ticket | null;
}

type TicketAnalytics = {
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  closedTickets: number;
};
