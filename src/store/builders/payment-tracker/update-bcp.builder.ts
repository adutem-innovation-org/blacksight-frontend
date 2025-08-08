import { PaymentTrackerState } from "@/interfaces";
import { updateBCP } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateBCPBuilder = (
  builder: ActionReducerMapBuilder<PaymentTrackerState>
) => {
  builder.addCase(updateBCP.pending, (state) => {
    state.updatingBCP = true;
    state.bcpUpdated = false;
  });

  builder.addCase(updateBCP.fulfilled, (state, action) => {
    state.updatingBCP = false;
    state.bcpUpdated = true;
    state.BCPs = state.BCPs || [];
    state.BCPs = state.BCPs?.map((bcp) =>
      bcp._id === action.payload._id ? action.payload : bcp
    );
  });

  builder.addCase(updateBCP.rejected, (state, action) => {
    state.updatingBCP = false;
    state.bcpUpdated = false;
    state.updateBCPErrorMsg = action.payload?.message as string;
    state.updateBCPErrors = action.payload?.errors ?? {};
  });
};
