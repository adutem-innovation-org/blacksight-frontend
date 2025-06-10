import { ApiSuccessResponse } from "@/interfaces/api-response";
import { ApiKey } from "../store";

export interface DeactivateApiKeyRes extends ApiSuccessResponse {
  apiKey: Omit<ApiKey, "secretKey">;
}
