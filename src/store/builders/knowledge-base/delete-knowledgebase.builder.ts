import { KnowledgeBaseState } from "@/interfaces";
import { deleteKnowledgeBase } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteKnowledgeBaseBuilder = (
  builder: ActionReducerMapBuilder<KnowledgeBaseState>
) => {
  builder.addCase(deleteKnowledgeBase.pending, (state) => {
    state.deletingKnowledgeBase = true;
  });

  builder.addCase(deleteKnowledgeBase.fulfilled, (state, action) => {
    state.deletingKnowledgeBase = false;
    state.knowledgeBaseDeleted = true;
    state.knowledgeBases = (state.knowledgeBases || []).filter(
      (kBase) => kBase._id !== action.payload._id
    );
  });

  builder.addCase(deleteKnowledgeBase.rejected, (state, action) => {
    state.deletingKnowledgeBase = false;
    state.knowledgeBaseDeleted = false;
    state.deleteKnowledgeBaseErrorMessage = action.payload as string;
  });
};
