import { KnowledgeBaseState } from "@/interfaces";

export const resetGetKnowledgeBaseAnalyticsReducer = (
  state: KnowledgeBaseState
) => {
  state.fetchingKnowledgeBaseAnalytics = false;
  state.knowledgeBaseAnalyticsFetched = false;
  state.fetchKnowledgeBaseAnalyticsErrorMessage = "";
};

export const resetGetAllKnowledgeBasesReducer = (state: KnowledgeBaseState) => {
  state.fetchingAllKnowledgeBases = false;
  state.allKnowledgeBasesFetched = false;
  state.fetchAllKnowledgeBasesErrorMessage = "";
};

export const resetAddKnowledgeBaseReducer = (state: KnowledgeBaseState) => {
  state.addingKnowledgeBase = false;
  state.knowledgeBaseAdded = false;
  state.addKnowledgeBaseErrors = {};
  state.addKnowledgeBaseErrorMessage = "";
};

export const resetDeleteKnowledgeBaseReducer = (state: KnowledgeBaseState) => {
  state.deletingKnowledgeBase = false;
  state.knowledgeBaseDeleted = false;
  state.deleteKnowledgeBaseErrorMessage = "";
};
