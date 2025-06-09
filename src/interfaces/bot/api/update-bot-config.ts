import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Bot } from "../store";

export interface UpdateBotConfigRes extends ApiSuccessResponse {
  bot: Bot;
}

export type UpdateBotConfigBody = {
  name?: string;
  welcomeMessage?: string;
  knowledgeBaseIds?: string[];
  scheduleMeeting?: boolean;
  meetingProviderId?: string;
};
