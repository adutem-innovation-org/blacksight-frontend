import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "../store";

export type EscalateChatBody = {
  customerName: string;
  customerEmail: string;
  message: string;
  botId: string;
  conversationId: string;
};

export interface EscalateChatRes extends ApiSuccessResponse {
  chatData: Message[];
}
