import { ApiSuccessResponse } from "@/interfaces/api-response";

export type VerifyEmailBody = {
  otp: string;
};

export interface VerifyEmailRes extends ApiSuccessResponse {
  message: string;
}
