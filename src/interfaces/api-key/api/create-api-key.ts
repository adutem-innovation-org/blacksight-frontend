import { ApiSuccessResponse } from "@/interfaces/api-response";
import { ApiKey } from "../store";

export interface CreateApiKeyRes extends ApiSuccessResponse {
  apiKey: ApiKey;
}
