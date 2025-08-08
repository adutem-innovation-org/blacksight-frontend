import { PaymentTrackerState } from "@/interfaces";
import { getPaymentFileBCPs } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getPaymentFileBCPsBuilder = (
  builder: ActionReducerMapBuilder<PaymentTrackerState>
) => {
  builder.addCase(getPaymentFileBCPs.pending, (state) => {
    state.fetchingBCPs = true;
    state.bcpsFetched = false;
  });

  builder.addCase(getPaymentFileBCPs.fulfilled, (state, action) => {
    state.fetchingBCPs = false;
    state.bcpsFetched = true;
    state.BCPs = action.payload.data;
    state.BCPsMeta = action.payload.meta;
  });

  builder.addCase(getPaymentFileBCPs.rejected, (state, action) => {
    state.fetchingBCPs = false;
    state.bcpsFetched = false;
    state.fetchBCPsError = action.payload as string;
  });
};
