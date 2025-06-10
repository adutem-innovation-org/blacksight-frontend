import { ApiSuccessResponse } from "@/interfaces/api-response";
import { ApiKey } from "../store";

export interface RenegerateApiKeyRes extends ApiSuccessResponse {
  apiKey: ApiKey;
}
