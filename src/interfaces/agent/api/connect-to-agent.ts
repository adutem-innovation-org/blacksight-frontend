import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Agent } from "../store";
import { Message } from "@/interfaces/bot";

export interface ConnectToAgentRes extends ApiSuccessResponse {
  agent: Agent;
  chatHistory: Message[];
}
