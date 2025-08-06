import { KnowledgeBaseState } from "@/interfaces";

export const initialKnowledgeBaseState: KnowledgeBaseState = {
  fetchingKnowledgeBaseAnalytics: false,
  knowledgeBaseAnalyticsFetched: false,
  fetchKnowledgeBaseAnalyticsErrorMessage: "",
  knowledgeBaseAnalytics: null,

  // Get all knowledge base
  fetchingAllKnowledgeBases: false,
  allKnowledgeBasesFetched: false,
  fetchAllKnowledgeBasesErrorMessage: "",
  knowledgeBases: null,
  meta: null,

  // Add knowledge base
  addingKnowledgeBase: false,
  knowledgeBaseAdded: false,
  addKnowledgeBaseErrors: {},
  addKnowledgeBaseErrorMessage: "",

  // Update KB status
  updatingKBStatus: false,
  kbStatusUpdated: false,
  updateKBStatusError: "",

  // Delete knowledge base
  deletingKnowledgeBase: false,
  knowledgeBaseDeleted: false,
  deleteKnowledgeBaseErrorMessage: "",

  // Generate knowledge base
  generatingKnowledgeBase: false,
  knowledgeBaseGenerated: false,
  generateKnowledgeBaseError: "",
  generatedKB: "",
};
