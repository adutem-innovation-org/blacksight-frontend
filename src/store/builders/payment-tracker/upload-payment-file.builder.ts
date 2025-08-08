import { PaymentTrackerState } from "@/interfaces";
import { uploadPaymentFile } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const uploadPaymentFileBuilder = (
  builder: ActionReducerMapBuilder<PaymentTrackerState>
) => {
  builder.addCase(uploadPaymentFile.pending, (state) => {
    state.uploadingPaymentFile = true;
    state.paymentFileUploaded = false;
  });

  builder.addCase(uploadPaymentFile.fulfilled, (state, action) => {
    state.uploadingPaymentFile = false;
    state.paymentFileUploaded = true;
  });

  builder.addCase(uploadPaymentFile.rejected, (state, action) => {
    state.uploadingPaymentFile = false;
    state.paymentFileUploaded = false;
    state.uploadPaymentFileErrorMsg = action.payload?.message ?? "";
    state.uploadPaymentFileErrors = action.payload?.errors ?? {};
  });
};
