import { initialBotState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  resetConfigureBotReducer,
  resetGetAllBotsReducer,
  resetGetBotAnalyticsReducer,
} from "../reducers";
import {
  configureBotBuilder,
  getAllBotsBuilder,
  getBotAnalyticsBuilder,
} from "../builders";

const botSlice = createSlice({
  name: "Bot",
  initialState: initialBotState,
  reducers: {
    resetGetBotAnalytics: resetGetBotAnalyticsReducer,
    resetGetAllBots: resetGetAllBotsReducer,
    resetConfigureBot: resetConfigureBotReducer,
  },
  extraReducers(builder) {
    getBotAnalyticsBuilder(builder);
    getAllBotsBuilder(builder);
    configureBotBuilder(builder);
  },
});

export const botReducer = botSlice.reducer;
export const { resetGetAllBots, resetGetBotAnalytics, resetConfigureBot } =
  botSlice.actions;
