import { ApiSuccessResponse } from "@/interfaces/api-response";
import { ApiKey } from "../store";

export interface ActivateApiKeyRes extends ApiSuccessResponse {
  apiKey: Omit<ApiKey, "secretKey">;
}
