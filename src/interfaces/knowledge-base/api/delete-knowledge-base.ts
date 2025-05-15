import { ApiSuccessResponse } from "@/interfaces/api-response";
import { KnowledgeBase } from "../store";

export interface DeleteKnowledgeBaseRes extends ApiSuccessResponse {
  knowledgeBase: KnowledgeBase;
}
