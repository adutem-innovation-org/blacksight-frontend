import { PaymentTrackerState } from "@/interfaces";

export const resetGetAllPaymentFilesReducer = (state: PaymentTrackerState) => {
  state.fetchingPaymentFiles = false;
  state.paymentFilesFetched = false;
  state.fetchPaymentFilesError = "";
};

export const resetUploadPaymentFileReducer = (state: PaymentTrackerState) => {
  state.uploadingPaymentFile = false;
  state.paymentFileUploaded = false;
  state.uploadPaymentFileErrorMsg = "";
  state.uploadPaymentFileErrors = {};
};

export const resetDeletePaymentFileReducer = (state: PaymentTrackerState) => {
  state.deletingPaymentFile = false;
  state.paymentFileDeleted = false;
  state.deletePaymentFileError = "";
};
