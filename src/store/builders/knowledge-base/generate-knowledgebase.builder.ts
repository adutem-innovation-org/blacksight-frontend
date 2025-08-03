import { KnowledgeBaseState } from "@/interfaces";
import { generateKnowledgeBase } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const generateKnowledgeBaseBuilder = (
  builder: ActionReducerMapBuilder<KnowledgeBaseState>
) => {
  builder.addCase(generateKnowledgeBase.pending, (state) => {
    state.generatingKnowledgeBase = true;
  });

  builder.addCase(generateKnowledgeBase.fulfilled, (state, action) => {
    state.generatingKnowledgeBase = false;
    state.knowledgeBaseGenerated = true;
    state.generatedKB = action.payload.generatedKB;
  });

  builder.addCase(generateKnowledgeBase.rejected, (state, action) => {
    state.generatingKnowledgeBase = false;
    state.generateKnowledgeBaseError =
      action?.payload?.message || "Unable to generate knowledge base";
  });
};
