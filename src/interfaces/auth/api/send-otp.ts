import { ApiSuccessResponse } from "./api-response";

export interface SendOtpRes extends ApiSuccessResponse {
  message: string;
}
