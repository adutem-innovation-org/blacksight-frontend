import { ApiSuccessResponse } from "@/interfaces/api-response";
import { CalendarProvider } from "../store";

export interface GetConnectedProvidersRes extends ApiSuccessResponse {
  providers: CalendarProvider[];
}
