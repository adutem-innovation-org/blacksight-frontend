import { PaymentInterval } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IBCP } from "../store";

export type UpdateBCPBody = {
  name?: string;
  email?: string;
  phone?: string;
  paymentInterval?: PaymentInterval;
  lastPayment?: Date;
  nextPayment?: Date;
};

export interface UpdateBCPRes extends ApiSuccessResponse {
  bcp: IBCP;
}
