import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface SendOtpRes extends ApiSuccessResponse {
  message: string;
}
