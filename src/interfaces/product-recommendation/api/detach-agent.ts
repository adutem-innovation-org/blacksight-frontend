import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface DetachAgentFromProductSourceReq {
  agentId: string;
}

export interface DetachAgentFromProductSourceRes extends ApiSuccessResponse {}
