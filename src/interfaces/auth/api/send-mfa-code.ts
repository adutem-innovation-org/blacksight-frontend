import { MFAMethods } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";

export type SendMfaCodeBody = {
  method: MFAMethods;
};

export interface SendMfaCodeRes extends ApiSuccessResponse {
  method: MFAMethods;
}
