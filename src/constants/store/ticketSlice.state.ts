import { TicketState } from "@/interfaces";

export const initialTicketState: TicketState = {
  // Fetch all tickets
  fetchingAllTickets: false,
  allTicketsFetched: false,
  fetchAllTicketsErrorMsg: "",
  tickets: null,
  meta: null,

  // Fetch ticket analytics
  fetchingTicketAnalytics: false,
  ticketAnalyticsFetched: false,
  fetchTicketAnalyticsErrorMsg: "",
  ticketAnalytics: null,

  // Update ticket status
  updatingTicketStatus: false,
  ticketStatusUpdated: false,
  updateTicketStatusErrorMsg: "",

  // Reply ticket
  replyingTicket: false,
  ticketReplied: false,
  replyTicketErrorMsg: "",

  // Delete ticket
  deletingTicket: false,
  ticketDeleted: false,
  deleteTicketErrorMsg: "",

  // Update ticket priority
  updatingTicketPriority: false,
  ticketPriorityUpdated: false,
  updateTicketPriorityErrorMsg: "",

  // Ticket
  currentTicket: null,
};
