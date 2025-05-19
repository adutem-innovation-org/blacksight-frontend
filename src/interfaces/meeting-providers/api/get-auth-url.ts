import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface GetProviderUrlRes extends ApiSuccessResponse {
  url: string;
}
