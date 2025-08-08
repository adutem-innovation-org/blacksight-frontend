import { PaymentTrackerState } from "@/interfaces";
import { deleteBCP } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteBCPBuilder = (
  builder: ActionReducerMapBuilder<PaymentTrackerState>
) => {
  builder.addCase(deleteBCP.pending, (state) => {
    state.deletingBCP = true;
    state.bcpDeleted = false;
  });

  builder.addCase(deleteBCP.fulfilled, (state, action) => {
    state.deletingBCP = false;
    state.bcpDeleted = true;
    state.BCPs = state.BCPs || [];
    state.BCPs = state.BCPs?.filter((bcp) => bcp._id !== action.payload._id);
  });

  builder.addCase(deleteBCP.rejected, (state, action) => {
    state.deletingBCP = false;
    state.bcpDeleted = false;
    state.deleteBCPError = action.payload as string;
  });
};
