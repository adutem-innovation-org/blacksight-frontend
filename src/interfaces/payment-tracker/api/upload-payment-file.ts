import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IPaymentFile } from "../store";

export type UploadPaymentFileBody = FormData;

export interface UploadPaymentFileRes extends ApiSuccessResponse {
  paymentFile: IPaymentFile;
}
