import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "@/interfaces/bot";

export type AskAgentBody = {
  userQuery: string;
};

export interface AskAgentRes extends ApiSuccessResponse {
  data: Message;
}
