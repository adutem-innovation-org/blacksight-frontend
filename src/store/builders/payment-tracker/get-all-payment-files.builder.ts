import { PaymentTrackerState } from "@/interfaces";
import { getAllPaymentFiles } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAllPaymentFilesBuilder = (
  builder: ActionReducerMapBuilder<PaymentTrackerState>
) => {
  builder.addCase(getAllPaymentFiles.pending, (state) => {
    state.fetchingPaymentFiles = true;
  });

  builder.addCase(getAllPaymentFiles.fulfilled, (state, action) => {
    state.fetchingPaymentFiles = false;
    state.paymentFilesFetched = true;
    state.paymentFiles = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(getAllPaymentFiles.rejected, (state, action) => {
    state.fetchingPaymentFiles = false;
    state.paymentFilesFetched = false;
    state.fetchPaymentFilesError = action.payload as string;
  });
};
