import { ApiSuccessResponse } from "@/interfaces/api-response";

export type GenerateKnowledgeBaseBody = {
  prompt: string;
};

export interface GenerateKnowledgeBaseRes extends ApiSuccessResponse {
  generatedKB: string;
}
