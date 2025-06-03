import { BotState } from "@/interfaces";
import { getAllConversations } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAllConversationsBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(getAllConversations.pending, (state) => {
    state.fetchingAllConversations = true;
  });

  builder.addCase(getAllConversations.fulfilled, (state, action) => {
    state.fetchingAllConversations = false;
    state.allConversationsFetched = true;
    state.conversations = action.payload.data;
    state.conversationMeta = action.payload.meta;
  });

  builder.addCase(getAllConversations.rejected, (state, action) => {
    state.fetchingAllConversations = false;
    state.allConversationsFetched = false;
    state.fetchAllConversationsError = action.payload as string;
  });
};
