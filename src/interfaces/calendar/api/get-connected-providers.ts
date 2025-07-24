import { ApiSuccessResponse } from "@/interfaces/api-response";
import { MeetingProvider } from "../store";

export interface GetConnectedProvidersRes extends ApiSuccessResponse {
  providers: MeetingProvider[];
}
