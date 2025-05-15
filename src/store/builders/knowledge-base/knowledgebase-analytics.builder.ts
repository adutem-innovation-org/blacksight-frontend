import { KnowledgeBaseState } from "@/interfaces";
import { getKnowledgeBaseAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getKnowledgeBaseAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<KnowledgeBaseState>
) => {
  builder.addCase(getKnowledgeBaseAnalytics.pending, (state) => {
    state.fetchingKnowledgeBaseAnalytics = true;
    state.fetchKnowledgeBaseAnalyticsErrorMessage = "";
  });

  builder.addCase(getKnowledgeBaseAnalytics.fulfilled, (state, action) => {
    state.fetchingKnowledgeBaseAnalytics = false;
    state.knowledgeBaseAnalyticsFetched = true;
    state.knowledgeBaseAnalytics = action.payload;
  });

  builder.addCase(getKnowledgeBaseAnalytics.rejected, (state, action) => {
    state.fetchingKnowledgeBaseAnalytics = false;
    state.knowledgeBaseAnalyticsFetched = false;
    state.fetchKnowledgeBaseAnalyticsErrorMessage = action.payload as string;
  });
};
