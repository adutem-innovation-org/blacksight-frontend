import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IPaymentFile } from "../store";

export interface DeletePaymentFileRes extends ApiSuccessResponse {
  paymentFile: IPaymentFile;
}
