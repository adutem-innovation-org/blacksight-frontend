import { BotState } from "@/interfaces";
import { startConversation } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const startConversationBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(startConversation.pending, (state) => {
    state.startingConversation = true;
  });

  builder.addCase(startConversation.fulfilled, (state, action) => {
    state.startingConversation = false;
    state.currentConversationId = action.payload.conversationId;
    state.currentConversation = state.currentConversation || [];
    state.currentConversation.push(action.payload.data);
  });

  builder.addCase(startConversation.rejected, (state, action) => {
    state.startingConversation = false;
    state.startConversationError = action.payload as string;
  });
};
