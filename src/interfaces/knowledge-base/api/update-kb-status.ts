import { ApiSuccessResponse } from "@/interfaces/api-response";
import { KnowledgeBase } from "../store";

export interface UpdateKBStatusRes extends ApiSuccessResponse {
  knowledgeBase: KnowledgeBase;
}
