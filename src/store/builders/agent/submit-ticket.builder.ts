import { AgentState } from "@/interfaces";
import { submitTicket } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const submitTicketBuilder = (
  builder: ActionReducerMapBuilder<AgentState>
) => {
  builder.addCase(submitTicket.pending, (state) => {
    state.submittingTicket = true;
  });

  builder.addCase(submitTicket.fulfilled, (state, action) => {
    state.submittingTicket = false;
    state.ticketSubmitted = true;
    state.chatHistory = state.chatHistory || [];
    state.chatHistory = state.chatHistory.concat(action.payload);
  });

  builder.addCase(submitTicket.rejected, (state, action) => {
    state.submittingTicket = false;
    state.submitTicketErrors = action.payload?.errors || {};
    state.submitTicketErrorMessage =
      action.payload?.message || "Unable to submit ticket";
  });
};
