import { PaginationMetaData } from "@/interfaces/pagination";
import { IPaymentFile } from "./payment-file";
import { IBCP } from "./bcp";

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

  fetchingBCPs: boolean;
  bcpsFetched: boolean;
  fetchBCPsError: string;
  BCPs: IBCP[] | null;
  BCPsMeta: PaginationMetaData | null;
}
