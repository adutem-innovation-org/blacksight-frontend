import { PaginationMetaData } from "@/interfaces/pagination";
import { IPaymentFile } from "./payment-file";

export interface PaymentTrackerState {
  fetchingPaymentFiles: boolean;
  paymentFilesFetched: boolean;
  fetchPaymentFilesError: string;
  paymentFiles: IPaymentFile[] | null;
  meta: PaginationMetaData | null;

  uploadingPaymentFile: boolean;
  paymentFileUploaded: boolean;
  uploadPaymentFileErrorMsg: string;
  uploadPaymentFileErrors: Record<string, string>;

  deletingPaymentFile: boolean;
  paymentFileDeleted: boolean;
  deletePaymentFileError: string;
}
