import { CalendarProvidersEnum } from "@/enums";

export interface CalendarProvider {
  _id: string;
  userId: string;
  provider: CalendarProvidersEnum;
  eventTypeId: string;
  apiKey: string;
  accessToken: string;
  refreshToken: string;
  expiryDate: Date;
}
