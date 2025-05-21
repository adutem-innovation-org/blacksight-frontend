import { initialBotState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  resetConfigureBotReducer,
  resetGetAllBotsReducer,
  resetGetBotAnalyticsReducer,
  resetUpdateBotConfigReducer,
  resetUpdateBotInstructionsReducer,
  setCurrentBotReducer,
} from "../reducers";
import {
  configureBotBuilder,
  getAllBotsBuilder,
  getBotAnalyticsBuilder,
  updateBotConfigBuilder,
  updateBotInstructionsBuilder,
} from "../builders";

const botSlice = createSlice({
  name: "Bot",
  initialState: initialBotState,
  reducers: {
    resetGetBotAnalytics: resetGetBotAnalyticsReducer,
    resetGetAllBots: resetGetAllBotsReducer,
    resetConfigureBot: resetConfigureBotReducer,
    setCurrentBot: setCurrentBotReducer,
    resetUpdateBotConfig: resetUpdateBotConfigReducer,
    resetUpdateBotInstructions: resetUpdateBotInstructionsReducer,
  },
  extraReducers(builder) {
    getBotAnalyticsBuilder(builder);
    getAllBotsBuilder(builder);
    configureBotBuilder(builder);
    updateBotConfigBuilder(builder);
    updateBotInstructionsBuilder(builder);
  },
});

export const botReducer = botSlice.reducer;
export const {
  resetGetAllBots,
  resetGetBotAnalytics,
  resetConfigureBot,
  setCurrentBot,
  resetUpdateBotConfig,
  resetUpdateBotInstructions,
} = botSlice.actions;
