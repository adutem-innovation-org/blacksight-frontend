import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface KnowledgeBaseAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalKnowledgeBase: number;
    activeKnowledgeBase: number;
  };
}
