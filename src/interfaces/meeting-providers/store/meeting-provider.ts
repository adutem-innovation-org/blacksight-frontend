import { MeetingProvidersEnum } from "@/enums";

export interface MeetingProvider {
  _id: string;
  userId: string;
  provider: MeetingProvidersEnum;
  accessToken: string;
  refreshToken: string;
  expiryDate: Date;
}
