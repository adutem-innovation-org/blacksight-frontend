import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "../store";

export interface GetTrainingConversationRes extends ApiSuccessResponse {
  messages: Message[];
  conversationId: string;
  botId: string;
}
