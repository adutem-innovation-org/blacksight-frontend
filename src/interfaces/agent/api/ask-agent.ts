import { UserActions } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Message } from "@/interfaces/bot";

export type AskAgentBody = {
  userQuery: string;
  action?: UserActions;
};

export interface AskAgentRes extends ApiSuccessResponse {
  data: Message;
}
