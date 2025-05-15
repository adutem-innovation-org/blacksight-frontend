import { ApiSuccessResponse } from "@/interfaces/api-response";
import { KnowledgeBase } from "../store";

export interface AddKnowledgeBaseRes extends ApiSuccessResponse {
  knowledgeBase: KnowledgeBase;
}

export type AddKnowledgeBaseBody = FormData;
