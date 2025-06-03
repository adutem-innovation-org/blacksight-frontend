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
  resetUpdateBotStatusReducer,
  resetDeleteBotReducer,
  resetSpeechToTextReducer,
  resetGetConversationAnalyticsReducer,
  resetGetAllConversationsReducer,
} from "../reducers";
import {
  askChatbotBuilder,
  clearTrainingConversationBuilder,
  configureBotBuilder,
  updateBotStatusBuilder,
  deleteBotBuilder,
  getAllBotsBuilder,
  getBotAnalyticsBuilder,
  getTrainingConversationBuilder,
  startConversationBuilder,
  updateBotConfigBuilder,
  updateBotInstructionsBuilder,
  speechToTextBuilder,
  getConversationAnalyticsBuilder,
  getAllConversationsBuilder,
} from "../builders";

const botSlice = createSlice({
  name: "Bot",
  initialState: initialBotState,
  reducers: {
    resetGetBotAnalytics: resetGetBotAnalyticsReducer,
    resetGetConversationAnalytics: resetGetConversationAnalyticsReducer,
    resetGetAllBots: resetGetAllBotsReducer,
    resetGetAllConversations: resetGetAllConversationsReducer,
    resetConfigureBot: resetConfigureBotReducer,
    setCurrentBot: setCurrentBotReducer,
    resetUpdateBotConfig: resetUpdateBotConfigReducer,
    resetUpdateBotInstructions: resetUpdateBotInstructionsReducer,
    resetUpdateBotStatus: resetUpdateBotStatusReducer,
    resetDeleteBot: resetDeleteBotReducer,
    newMessage: newMessageReducer,
    clearCurrentConversation: clearCurrentConversationReducer,
    resetStartConversation: resetStartConversationReducer,
    resetAskChatbot: resetAskChatbotReducer,
    resetGetTrainingConversation: resetGetTrainingConversationReducer,
    resetClearTrainingConversation: resetClearTrainingConversationReducer,
    resetSpeechToText: resetSpeechToTextReducer,
  },
  extraReducers(builder) {
    getBotAnalyticsBuilder(builder);
    getConversationAnalyticsBuilder(builder);
    getAllBotsBuilder(builder);
    getAllConversationsBuilder(builder);
    configureBotBuilder(builder);
    updateBotConfigBuilder(builder);
    updateBotInstructionsBuilder(builder);
    updateBotStatusBuilder(builder);
    deleteBotBuilder(builder);
    startConversationBuilder(builder);
    askChatbotBuilder(builder);
    getTrainingConversationBuilder(builder);
    clearTrainingConversationBuilder(builder);
    speechToTextBuilder(builder);
  },
});

export const botReducer = botSlice.reducer;
export const {
  resetGetBotAnalytics,
  resetGetConversationAnalytics,
  resetGetAllBots,
  resetGetAllConversations,
  resetConfigureBot,
  setCurrentBot,
  resetUpdateBotConfig,
  resetUpdateBotInstructions,
  resetUpdateBotStatus,
  resetDeleteBot,
  newMessage,
  clearCurrentConversation,
  resetClearTrainingConversation,
  resetGetTrainingConversation,
  resetSpeechToText,
} = botSlice.actions;
