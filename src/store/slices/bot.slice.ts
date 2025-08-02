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
  resetCloneBotReducer,
  clearBotActionReducer,
  resetScheduleAppointmentReducer,
  resetEscalateChatReducer,
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
  cloneBotBuilder,
  scheduleAppointmentBuilder,
  escalateChatBuilder,
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
    resetCloneBot: resetCloneBotReducer,
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
    clearBotAction: clearBotActionReducer,
    resetScheduleAppointment: resetScheduleAppointmentReducer,
    resetEscalateChat: resetEscalateChatReducer,
  },
  extraReducers(builder) {
    getBotAnalyticsBuilder(builder);
    getConversationAnalyticsBuilder(builder);
    getAllBotsBuilder(builder);
    getAllConversationsBuilder(builder);
    configureBotBuilder(builder);
    cloneBotBuilder(builder);
    updateBotConfigBuilder(builder);
    updateBotInstructionsBuilder(builder);
    updateBotStatusBuilder(builder);
    deleteBotBuilder(builder);
    startConversationBuilder(builder);
    askChatbotBuilder(builder);
    getTrainingConversationBuilder(builder);
    clearTrainingConversationBuilder(builder);
    speechToTextBuilder(builder);
    scheduleAppointmentBuilder(builder);
    escalateChatBuilder(builder);
  },
});

export const botReducer = botSlice.reducer;
export const {
  resetGetBotAnalytics,
  resetGetConversationAnalytics,
  resetGetAllBots,
  resetGetAllConversations,
  resetConfigureBot,
  resetCloneBot,
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
  clearBotAction,
  resetEscalateChat,
  resetScheduleAppointment,
} = botSlice.actions;
