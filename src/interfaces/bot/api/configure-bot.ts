import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Bot } from "../store";

export interface ConfigureBotRes extends ApiSuccessResponse {
  bot: Bot;
}

export type ConfigureBotBody = {
  name: string;
  knowledgeBaseId: string;
  scheduleMeeting: boolean;
  meetingProviderId?: string;
};
