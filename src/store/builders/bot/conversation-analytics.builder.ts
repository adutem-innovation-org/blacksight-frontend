import { BotState } from "@/interfaces";
import { getConversationAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getConversationAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(getConversationAnalytics.pending, (state) => {
    state.fetchingConversationAnalytics = true;
    state.fetchConversationAnalyticsError = "";
  });

  builder.addCase(getConversationAnalytics.fulfilled, (state, action) => {
    state.fetchingConversationAnalytics = false;
    state.conversationAnalyticsFetched = true;
    state.conversationAnalytics = action.payload;
  });

  builder.addCase(getConversationAnalytics.rejected, (state, action) => {
    state.fetchingConversationAnalytics = false;
    state.conversationAnalyticsFetched = false;
    state.fetchConversationAnalyticsError =
      action.payload ?? "Unable to fetch analytics";
  });
};
