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

export const resetGetPaymentFileBCPsReducer = (state: PaymentTrackerState) => {
  state.fetchingBCPs = false;
  state.bcpsFetched = false;
  state.fetchBCPsError = "";
};

export const clearBCPsReducer = (state: PaymentTrackerState) => {
  state.BCPs = null;
  state.BCPsMeta = null;
};
