import { ApiSuccessResponse } from "./api-response";

export type VerifyEmailBody = {
  otp: string;
};

export interface VerifyEmailRes extends ApiSuccessResponse {
  message: string;
}
