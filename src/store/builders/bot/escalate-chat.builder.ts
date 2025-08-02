import { BotState } from "@/interfaces";
import { escalateChat } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const escalateChatBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(escalateChat.pending, (state) => {
    state.escalatingChat = true;
  });

  builder.addCase(escalateChat.fulfilled, (state, action) => {
    state.escalatingChat = false;
    state.chatEscalated = true;
    state.currentConversation = state.currentConversation || [];
    state.currentConversation = state.currentConversation.concat(
      action.payload
    );
  });

  builder.addCase(escalateChat.rejected, (state, action) => {
    state.escalatingChat = false;
    state.escalateChatErrors = action.payload?.errors || {};
    state.escalateChatErrorMessage =
      action.payload?.message || "Unable to escalate chat.";
  });
};
