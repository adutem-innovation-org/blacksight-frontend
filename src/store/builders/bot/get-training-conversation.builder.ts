import { BotState } from "@/interfaces";
import { getTrainingConversation } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getTrainingConversationBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(getTrainingConversation.pending, (state) => {
    state.fetchingTrainingConversation = true;
  });

  builder.addCase(getTrainingConversation.fulfilled, (state, action) => {
    state.fetchingTrainingConversation = false;
    state.trainingConversationFetched = true;
    if (state.currentBot?._id === action.payload.botId) {
      state.currentConversation = action.payload.messages;
      state.currentConversationId = action.payload.conversationId;
    }
  });

  builder.addCase(getTrainingConversation.rejected, (state, action) => {
    state.fetchingTrainingConversation = false;
    state.fetchTrainingConversationError = action.payload as string;
  });
};
