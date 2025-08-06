import { MFAMethods } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface GetMfaStatusRes extends ApiSuccessResponse {
  availableMethods: MFAMethods[];
  mfaEnabled: boolean;
}
