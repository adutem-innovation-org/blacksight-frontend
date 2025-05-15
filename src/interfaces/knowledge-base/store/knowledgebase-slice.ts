import { PaginationMetaData } from "@/interfaces/pagination";
import { KnowledgeBase } from "./knowledge-base";

export type KnowledgeBaseState = {
  fetchingKnowledgeBaseAnalytics: boolean;
  knowledgeBaseAnalyticsFetched: boolean;
  fetchKnowledgeBaseAnalyticsErrorMessage: string;
  knowledgeBaseAnalytics: Record<string, number> | null;

  // Get all knowledgebase
  fetchingAllKnowledgeBases: boolean;
  allKnowledgeBasesFetched: boolean;
  fetchAllKnowledgeBasesErrorMessage: string;
  knowledgeBases: KnowledgeBase[] | null;
  meta: PaginationMetaData | null;

  // Create knowledge base
  addingKnowledgeBase: boolean;
  knowledgeBaseAdded: boolean;
  addKnowledgeBaseErrors: Record<string, string>;
  addKnowledgeBaseErrorMessage: string;

  // Delete knowledge base
  deletingKnowledgeBase: boolean;
  knowledgeBaseDeleted: boolean;
  deleteKnowledgeBaseErrorMessage: string;
};
