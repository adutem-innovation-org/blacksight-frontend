import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface EnableMfaMethodRes extends ApiSuccessResponse {}

export type EnableSMSMfaMethodBody = {
  phoneNumber: string;
};
