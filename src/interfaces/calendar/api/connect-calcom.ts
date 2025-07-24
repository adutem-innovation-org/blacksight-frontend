import { CalendarProvidersEnum } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";

export type ConnectCalcomBody = {
  eventTypeId: string;
  apiKey: string;
  provider: CalendarProvidersEnum;
};

export interface ConnectCalcomRes extends ApiSuccessResponse {}
