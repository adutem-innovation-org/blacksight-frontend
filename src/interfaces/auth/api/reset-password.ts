import { ApiSuccessResponse } from "@/interfaces/api-response";

export type ResetPasswordBody = {
  password: string;
  code: string;
  email: string;
};

export interface ResetPasswordRes extends ApiSuccessResponse {
  message: string;
}
