import { PaymentTrackerState } from "@/interfaces";

export const initialPaymentTrackerState: PaymentTrackerState = {
  fetchingPaymentFiles: false,
  paymentFilesFetched: false,
  fetchPaymentFilesError: "",
  paymentFiles: null,
  meta: null,

  // Upload payment file
  uploadingPaymentFile: false,
  paymentFileUploaded: false,
  uploadPaymentFileErrorMsg: "",
  uploadPaymentFileErrors: {},

  // Delete payment file
  deletingPaymentFile: false,
  paymentFileDeleted: false,
  deletePaymentFileError: "",
};
