import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "../store";

export type StartConversationBody = {
  botId: string;
};

export interface StartConversationRes extends ApiSuccessResponse {
  data: Message;
  conversationId: string;
}
