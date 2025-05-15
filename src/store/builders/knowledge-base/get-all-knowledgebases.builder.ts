import { KnowledgeBaseState } from "@/interfaces";
import { getAllKnowledgeBases } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAllKnowledgeBasesBuilder = (
  builder: ActionReducerMapBuilder<KnowledgeBaseState>
) => {
  builder.addCase(getAllKnowledgeBases.pending, (state) => {
    state.fetchingAllKnowledgeBases = true;
  });

  builder.addCase(getAllKnowledgeBases.fulfilled, (state, action) => {
    state.fetchingAllKnowledgeBases = false;
    state.allKnowledgeBasesFetched = true;
    state.knowledgeBases = action.payload.data;
    state.meta = action.payload.meta;
  });
};
