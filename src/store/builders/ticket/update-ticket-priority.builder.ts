import { TicketState } from "@/interfaces";
import { updateTicketPriority } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateTicketPriorityBuilder = (
  builder: ActionReducerMapBuilder<TicketState>
) => {
  builder.addCase(updateTicketPriority.pending, (state) => {
    state.updatingTicketPriority = true;
  });

  builder.addCase(updateTicketPriority.fulfilled, (state, action) => {
    state.updatingTicketPriority = false;
    state.ticketPriorityUpdated = true;
    state.tickets = state.tickets || [];
    state.tickets = state.tickets.map((ticket) => {
      if (ticket._id === action.payload?._id) {
        return {
          ...ticket,
          priority: action.payload.priority,
        };
      }
      return ticket;
    });
  });

  builder.addCase(updateTicketPriority.rejected, (state, action) => {
    state.updatingTicketPriority = false;
    state.ticketPriorityUpdated = false;
    state.updateTicketPriorityErrorMsg =
      action.payload ?? "Unable to update ticket status";
  });
};
