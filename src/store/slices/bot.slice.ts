import { initialBotState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  clearCurrentConversationReducer,
  newMessageReducer,
  resetConfigureBotReducer,
  resetGetAllBotsReducer,
  resetGetBotAnalyticsReducer,
  resetUpdateBotConfigReducer,
  resetUpdateBotInstructionsReducer,
  setCurrentBotReducer,
  resetStartConversationReducer,
  resetAskChatbotReducer,
  resetGetTrainingConversationReducer,
  resetClearTrainingConversationReducer,
} from "../reducers";
import {
  askChatbotBuilder,
  clearTrainingConversationBuilder,
  configureBotBuilder,
  getAllBotsBuilder,
  getBotAnalyticsBuilder,
  getTrainingConversationBuilder,
  startConversationBuilder,
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
    newMessage: newMessageReducer,
    clearCurrentConversation: clearCurrentConversationReducer,
    resetStartConversation: resetStartConversationReducer,
    resetAskChatbot: resetAskChatbotReducer,
    resetGetTrainingConversation: resetGetTrainingConversationReducer,
    resetClearTrainingConversation: resetClearTrainingConversationReducer,
  },
  extraReducers(builder) {
    getBotAnalyticsBuilder(builder);
    getAllBotsBuilder(builder);
    configureBotBuilder(builder);
    updateBotConfigBuilder(builder);
    updateBotInstructionsBuilder(builder);
    startConversationBuilder(builder);
    askChatbotBuilder(builder);
    getTrainingConversationBuilder(builder);
    clearTrainingConversationBuilder(builder);
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
  newMessage,
  clearCurrentConversation,
  resetClearTrainingConversation,
  resetGetTrainingConversation,
} = botSlice.actions;
