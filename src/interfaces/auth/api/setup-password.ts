import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface SetupPasswordRes extends ApiSuccessResponse {
  message: string;
}

export type SetupPasswordBody = {
  password: string;
};
