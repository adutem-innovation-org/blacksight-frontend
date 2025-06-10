import { ApiSuccessResponse } from "@/interfaces/api-response";
import { ApiKey } from "../store";

export interface GetApiKeyRes extends ApiSuccessResponse {
  apiKey: ApiKey | {};
}
