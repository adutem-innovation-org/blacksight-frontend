import { MFAMethods } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";
import { UserData } from "../store/user";

export type VerifyMfaCodeBody = {
  code: string;
  method: MFAMethods;
};

export interface VerifyMfaCodeRes extends ApiSuccessResponse {
  user: UserData;
  token: string;
}
