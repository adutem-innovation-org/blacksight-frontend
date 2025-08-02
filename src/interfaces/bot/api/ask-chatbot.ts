import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "../store";
import { UserActions } from "@/enums";

export type AskChatbotBody = {
  botId: string;
  conversationId: string;
  userQuery: string;
  action?: UserActions;
};

export interface AskChatbotRes extends ApiSuccessResponse {
  data: Message;
}
