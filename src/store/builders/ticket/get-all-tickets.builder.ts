import { TicketState } from "@/interfaces";
import { getAllTickets } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAllTicketsBuilder = (
  builder: ActionReducerMapBuilder<TicketState>
) => {
  builder.addCase(getAllTickets.pending, (state) => {
    state.fetchingAllTickets = true;
  });

  builder.addCase(getAllTickets.fulfilled, (state, action) => {
    state.fetchingAllTickets = false;
    state.allTicketsFetched = true;
    state.tickets = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(getAllTickets.rejected, (state, action) => {
    state.fetchingAllTickets = false;
    state.allTicketsFetched = false;
    state.fetchAllTicketsErrorMsg = action.payload ?? "Unable to fetch tickets";
  });
};
