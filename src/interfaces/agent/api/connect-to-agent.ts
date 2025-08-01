import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Agent } from "../store";

export interface ConnectToAgentRes extends ApiSuccessResponse {
  agent: Agent;
}
