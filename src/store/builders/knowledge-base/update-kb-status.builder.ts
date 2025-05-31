import { KnowledgeBaseState } from "@/interfaces";
import { updateKBStatus } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateKBStatusBuilder = (
  builder: ActionReducerMapBuilder<KnowledgeBaseState>
) => {
  builder.addCase(updateKBStatus.pending, (state) => {
    state.updatingKBStatus = true;
  });

  builder.addCase(updateKBStatus.fulfilled, (state, action) => {
    state.updatingKBStatus = false;
    state.kbStatusUpdated = true;
    state.knowledgeBases = state.knowledgeBases || [];
    state.knowledgeBases = state.knowledgeBases.map((kb) =>
      kb._id === action.payload._id ? action.payload : kb
    );
  });

  builder.addCase(updateKBStatus.rejected, (state, action) => {
    state.updatingKBStatus = false;
    state.updateKBStatusError =
      action?.payload || "Unable to update knowledge base";
  });
};
