import { TicketState } from "@/interfaces";
import { deleteTicket } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteTicketBuilder = (
  builder: ActionReducerMapBuilder<TicketState>
) => {
  builder.addCase(deleteTicket.pending, (state) => {
    state.deletingTicket = true;
  });

  builder.addCase(deleteTicket.fulfilled, (state, action) => {
    state.deletingTicket = false;
    state.ticketDeleted = true;
    state.tickets = (state.tickets || [])?.filter(
      (ticket) => ticket._id !== action.payload
    );
  });

  builder.addCase(deleteTicket.rejected, (state, action) => {
    state.deletingTicket = false;
    state.ticketDeleted = false;
    state.deleteTicketErrorMsg = action.payload ?? "Unable to delete ticket";
  });
};
