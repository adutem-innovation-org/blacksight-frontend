import { BotActions, RoleEnum } from "@/enums";
import { Bot, BotState } from "@/interfaces";
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
    state.action = (action.payload?.action as BotActions) ?? null;
  });

  builder.addCase(askChatbot.rejected, (state, action) => {
    state.askingChatbot = false;
    state.askChatbotError = action.payload as string;
    state.currentConversation = state.currentConversation || [];
    state.currentConversation.push({
      content: action.payload as string,
      role: RoleEnum.ASSISTANT,
      isError: true,
    });
  });
};
