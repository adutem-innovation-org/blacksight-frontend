import { MFAMethods } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";

export type DisableMfaMethodBody = {
  method: MFAMethods;
};

export interface DisableMfaMethodRes extends ApiSuccessResponse {
  method: MFAMethods;
}
