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
  resetDeactivateBotReducer,
  resetDeleteBotReducer,
} from "../reducers";
import {
  askChatbotBuilder,
  clearTrainingConversationBuilder,
  configureBotBuilder,
  deactivateBotBuilder,
  deleteBotBuilder,
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
    resetDeactivateBot: resetDeactivateBotReducer,
    resetDeleteBot: resetDeleteBotReducer,
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
    deactivateBotBuilder(builder);
    deleteBotBuilder(builder);
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
  resetDeactivateBot,
  resetDeleteBot,
  newMessage,
  clearCurrentConversation,
  resetClearTrainingConversation,
  resetGetTrainingConversation,
} = botSlice.actions;
