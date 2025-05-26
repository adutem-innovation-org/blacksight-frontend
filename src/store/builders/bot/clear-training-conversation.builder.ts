import { BotState } from "@/interfaces";
import { clearTrainingConversation } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const clearTrainingConversationBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(clearTrainingConversation.pending, (state) => {
    state.clearingTrainingConversation = true;
  });

  builder.addCase(clearTrainingConversation.fulfilled, (state, action) => {
    state.clearingTrainingConversation = false;
    state.trainingConversationCleared = true;
    if (state.currentConversationId === action.payload.conversationId) {
      state.currentConversation = [];
    }
  });

  builder.addCase(clearTrainingConversation.rejected, (state, action) => {
    state.clearingTrainingConversation = false;
    state.clearTrainingConversationError = action.payload as string;
  });
};
