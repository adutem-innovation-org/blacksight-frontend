import { TicketState } from "@/interfaces";
import { replyTicket } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const replyTicketBuilder = (
  builder: ActionReducerMapBuilder<TicketState>
) => {
  builder.addCase(replyTicket.pending, (state) => {
    state.replyingTicket = true;
  });

  builder.addCase(replyTicket.fulfilled, (state, action) => {
    state.replyingTicket = false;
    state.ticketReplied = true;
    if (state.currentTicket && state.currentTicket._id === action.payload._id) {
      state.currentTicket.messages = action.payload.messages;
    }
    state.tickets = state.tickets || [];
    state.tickets = state.tickets.map((ticket) => {
      if (ticket._id === action.payload._id) {
        return {
          ...ticket,
          messages: action.payload.messages,
        };
      }
      return ticket;
    });
  });

  builder.addCase(replyTicket.rejected, (state, action) => {
    state.replyingTicket = false;
    state.ticketReplied = false;
    state.replyTicketErrorMsg = action.payload ?? "Unable to reply to ticket";
  });
};
