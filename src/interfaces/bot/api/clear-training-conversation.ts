import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Conversation } from "../store";

export interface ClearTrainingConversationRes extends ApiSuccessResponse {
  conversation: Conversation;
}
