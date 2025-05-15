import { BotState } from "@/interfaces";

export const resetGetBotAnalyticsReducer = (state: BotState) => {
  state.fetchingBotAnalytics = false;
  state.botAnalyticsFetched = false;
  state.fetchBotAnalyticsErrorMessage = "";
};

export const resetGetAllBotsReducer = (state: BotState) => {
  state.fetchingAllBots = false;
  state.allBotsFetched = false;
  state.fetchAllBotsErrorMessage = "";
};

export const resetConfigureBotReducer = (state: BotState) => {
  state.configuringBot = false;
  state.botConfigured = false;
  state.configureBotErrors = {};
  state.configureBotErrorMessage = "";
};
