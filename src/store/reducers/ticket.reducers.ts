import { Ticket, TicketState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const resetDeleteTicketReducer = (state: TicketState) => {
  state.deletingTicket = false;
  state.ticketDeleted = false;
  state.deleteTicketErrorMsg = "";
};

export const resetGetAllTicketsReducer = (state: TicketState) => {
  state.fetchingAllTickets = false;
  state.allTicketsFetched = false;
  state.fetchAllTicketsErrorMsg = "";
};

export const resetGetTicketAnalyticsReducer = (state: TicketState) => {
  state.fetchingTicketAnalytics = false;
  state.ticketAnalyticsFetched = false;
  state.fetchTicketAnalyticsErrorMsg = "";
};

export const resetReplyTicketReducer = (state: TicketState) => {
  state.replyingTicket = false;
  state.ticketReplied = false;
  state.replyTicketErrorMsg = "";
};

export const resetUpdateTicketPriorityReducer = (state: TicketState) => {
  state.updatingTicketPriority = false;
  state.ticketPriorityUpdated = false;
  state.updateTicketPriorityErrorMsg = "";
};

export const resetUpdateTicketStatusReducer = (state: TicketState) => {
  state.updatingTicketStatus = false;
  state.ticketStatusUpdated = false;
  state.updateTicketStatusErrorMsg = "";
};

export const openTicketReducer = (
  state: TicketState,
  action: PayloadAction<Ticket>
) => {
  state.currentTicket = action.payload;
};

export const removeOpenedTicketReducer = (state: TicketState) => {
  state.currentTicket = null;
};
