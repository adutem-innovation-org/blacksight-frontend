import { BotState } from "@/interfaces";
import { askChatbot } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const askChatbotBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(askChatbot.pending, (state) => {
    state.askingChatbot = true;
  });

  builder.addCase(askChatbot.fulfilled, (state, action) => {
    state.askingChatbot = false;
    state.currentConversation = state.currentConversation || [];
    state.currentConversation.push(action.payload);
  });

  builder.addCase(askChatbot.rejected, (state, action) => {
    state.askingChatbot = false;
    state.askChatbotError = action.payload as string;
  });
};
