import { TicketState } from "@/interfaces";
import { getTicketAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getTicketAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<TicketState>
) => {
  builder.addCase(getTicketAnalytics.pending, (state) => {
    state.fetchingTicketAnalytics = true;
  });

  builder.addCase(getTicketAnalytics.fulfilled, (state, action) => {
    state.fetchingTicketAnalytics = false;
    state.ticketAnalyticsFetched = true;
    state.ticketAnalytics = action.payload;
  });

  builder.addCase(getTicketAnalytics.rejected, (state, action) => {
    state.fetchingTicketAnalytics = false;
    state.ticketAnalyticsFetched = false;
    state.fetchTicketAnalyticsErrorMsg =
      action.payload ?? "Unable to fetch ticket analytics";
  });
};
