import { BotState } from "@/interfaces";
import { getBotAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getBotAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(getBotAnalytics.pending, (state) => {
    state.fetchingBotAnalytics = true;
    state.fetchBotAnalyticsErrorMessage = "";
  });

  builder.addCase(getBotAnalytics.fulfilled, (state, action) => {
    state.fetchingBotAnalytics = false;
    state.botAnalyticsFetched = true;
    state.botAnalytics = action.payload;
  });

  builder.addCase(getBotAnalytics.rejected, (state, action) => {
    state.fetchingBotAnalytics = false;
    state.botAnalyticsFetched = false;
    state.fetchBotAnalyticsErrorMessage = action.payload as string;
  });
};
