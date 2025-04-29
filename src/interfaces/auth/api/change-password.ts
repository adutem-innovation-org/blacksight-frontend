import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface ChangePasswordRes extends ApiSuccessResponse {
  message: string;
}

export type ChangePasswordBody = {
  password: string;
  oldPassword: string;
};
