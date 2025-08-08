import { PaymentTrackerState } from "@/interfaces";
import { deletePaymentFile } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deletePaymentFileBuilder = (
  builder: ActionReducerMapBuilder<PaymentTrackerState>
) => {
  builder.addCase(deletePaymentFile.pending, (state) => {
    state.deletingPaymentFile = true;
    state.paymentFileDeleted = false;
  });

  builder.addCase(deletePaymentFile.fulfilled, (state) => {
    state.deletingPaymentFile = false;
    state.paymentFileDeleted = true;
  });

  builder.addCase(deletePaymentFile.rejected, (state, action) => {
    state.deletingPaymentFile = false;
    state.paymentFileDeleted = false;
    state.deletePaymentFileError = action.payload as string;
  });
};
