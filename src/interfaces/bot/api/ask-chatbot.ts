import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "../store";

export type AskChatbotBody = {
  botId: string;
  conversationId: string;
  userQuery: string;
};

export interface AskChatbotRes extends ApiSuccessResponse {
  data: Message;
}
