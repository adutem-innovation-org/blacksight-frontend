import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface AttachAgentToProductSourceReq {
  agentId: string;
}

export interface AttachAgentToProductSourceRes extends ApiSuccessResponse {}
