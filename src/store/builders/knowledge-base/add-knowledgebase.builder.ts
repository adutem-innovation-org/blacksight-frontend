import { KnowledgeBaseState } from "@/interfaces";
import { addKnowledgeBase } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const addKnowledgeBaseBuilder = (
  builder: ActionReducerMapBuilder<KnowledgeBaseState>
) => {
  builder.addCase(addKnowledgeBase.pending, (state) => {
    state.addingKnowledgeBase = true;
  });

  builder.addCase(addKnowledgeBase.fulfilled, (state) => {
    state.addingKnowledgeBase = false;
    state.knowledgeBaseAdded = true;
  });

  builder.addCase(addKnowledgeBase.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.addingKnowledgeBase = false;
    state.knowledgeBaseAdded = false;
    state.addKnowledgeBaseErrors = error.errors;
    state.addKnowledgeBaseErrorMessage = error.message;
  });
};
