import { ApiSuccessResponse } from "@/interfaces/api-response";

export type ForgotPasswordBody = { email: string };

export interface ForgotPasswordRes extends ApiSuccessResponse {
  message: string;
}
