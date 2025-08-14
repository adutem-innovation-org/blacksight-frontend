import { initialTicketState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  openTicketReducer,
  removeOpenedTicketReducer,
  resetDeleteTicketReducer,
  resetGetAllTicketsReducer,
  resetGetTicketAnalyticsReducer,
  resetReplyTicketReducer,
  resetUpdateTicketPriorityReducer,
  resetUpdateTicketStatusReducer,
} from "../reducers";
import {
  deleteTicketBuilder,
  getAllTicketsBuilder,
  getTicketAnalyticsBuilder,
  replyTicketBuilder,
  updateTicketPriorityBuilder,
  updateTicketStatusBuilder,
} from "../builders";

const ticketSlice = createSlice({
  name: "Ticket",
  initialState: initialTicketState,
  reducers: {
    resetDeleteTicket: resetDeleteTicketReducer,
    resetGetAllTickets: resetGetAllTicketsReducer,
    resetGetTicketAnalytics: resetGetTicketAnalyticsReducer,
    resetReplyTicket: resetReplyTicketReducer,
    resetUpdateTicketPriority: resetUpdateTicketPriorityReducer,
    resetUpdateTicketStatus: resetUpdateTicketStatusReducer,
    openTicket: openTicketReducer,
    removeOpenedTicket: removeOpenedTicketReducer,
  },
  extraReducers(builder) {
    deleteTicketBuilder(builder);
    getAllTicketsBuilder(builder);
    getTicketAnalyticsBuilder(builder);
    replyTicketBuilder(builder);
    updateTicketPriorityBuilder(builder);
    updateTicketStatusBuilder(builder);
  },
});

export const ticketReducer = ticketSlice.reducer;
export const {
  resetDeleteTicket,
  resetGetAllTickets,
  resetGetTicketAnalytics,
  resetReplyTicket,
  resetUpdateTicketPriority,
  resetUpdateTicketStatus,
  openTicket,
  removeOpenedTicket,
} = ticketSlice.actions;
