import { TicketState } from "@/interfaces";
import { updateTicketStatus } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateTicketStatusBuilder = (
  builder: ActionReducerMapBuilder<TicketState>
) => {
  builder.addCase(updateTicketStatus.pending, (state) => {
    state.updatingTicketStatus = true;
  });

  builder.addCase(updateTicketStatus.fulfilled, (state, action) => {
    state.updatingTicketStatus = false;
    state.ticketStatusUpdated = true;
    state.tickets = state.tickets || [];
    state.tickets = state.tickets.map((ticket) => {
      if (ticket._id === action.payload?._id) {
        return {
          ...ticket,
          status: action.payload!.status,
        };
      }
      return ticket;
    });
  });

  builder.addCase(updateTicketStatus.rejected, (state, action) => {
    state.updatingTicketStatus = false;
    state.ticketStatusUpdated = false;
    state.updateTicketStatusErrorMsg =
      action.payload ?? "Unable to update ticket status";
  });
};
