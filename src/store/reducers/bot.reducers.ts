import { Bot, BotState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

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

export const setCurrentBotReducer = (
  state: BotState,
  action: PayloadAction<Bot | null>
) => {
  state.currentBot = action.payload;
};

export const resetUpdateBotConfigReducer = (state: BotState) => {
  state.updatingBotConfig = false;
  state.botConfigUpdated = false;
  state.updateBotConfigErrors = {};
  state.updateBotConfigErrorMessage = "";
};

export const resetUpdateBotInstructionsReducer = (state: BotState) => {
  state.updatingBotInstructions = false;
  state.botInstructionsUpdated = false;
  state.updateBotConfigErrors = {};
  state.updateBotInstructionsErrorMessage = "";
};
