import { RoleEnum, UserActions } from "@/enums";
import { Bot, BotState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const resetGetBotAnalyticsReducer = (state: BotState) => {
  state.fetchingBotAnalytics = false;
  state.botAnalyticsFetched = false;
  state.fetchBotAnalyticsErrorMessage = "";
};

export const resetGetConversationAnalyticsReducer = (state: BotState) => {
  state.fetchingConversationAnalytics = false;
  state.conversationAnalyticsFetched = false;
  state.fetchConversationAnalyticsError = "";
};

export const resetGetAllBotsReducer = (state: BotState) => {
  state.fetchingAllBots = false;
  state.allBotsFetched = false;
  state.fetchAllBotsErrorMessage = "";
};

export const resetGetAllConversationsReducer = (state: BotState) => {
  state.fetchingAllConversations = false;
  state.allConversationsFetched = false;
  state.fetchAllConversationsError = "";
};

export const resetConfigureBotReducer = (state: BotState) => {
  state.configuringBot = false;
  state.botConfigured = false;
  state.configureBotErrors = {};
  state.configureBotErrorMessage = "";
};

export const resetCloneBotReducer = (state: BotState) => {
  state.cloningBot = false;
  state.botCloned = false;
  state.cloneBotErrorMessage = "";
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

export const resetUpdateBotStatusReducer = (state: BotState) => {
  state.updatingBotStatus = false;
  state.botStatusUpdated = false;
  state.updateBotStatusError = "";
};

export const resetDeleteBotReducer = (state: BotState) => {
  state.deletingBot = false;
  state.botDeleted = false;
  state.deleteBotError = "";
};

export const newMessageReducer = (
  state: BotState,
  action: PayloadAction<{ role: RoleEnum; content: string }>
) => {
  state.currentConversation = state.currentConversation || [];
  state.currentConversation.push(action.payload);
};

export const clearCurrentConversationReducer = (state: BotState) => {
  state.currentConversation = null;
  state.currentConversationId = null;
};

export const resetStartConversationReducer = (state: BotState) => {
  state.startingConversation = false;
  state.startConversationError = "";
};

export const resetAskChatbotReducer = (state: BotState) => {
  state.askingChatbot = false;
  state.askChatbotError = "";
};

export const resetClearTrainingConversationReducer = (state: BotState) => {
  state.clearingTrainingConversation = false;
  state.trainingConversationCleared = false;
  state.clearTrainingConversationError = "";
};

export const resetGetTrainingConversationReducer = (state: BotState) => {
  state.fetchingTrainingConversation = false;
  state.trainingConversationFetched = false;
  state.fetchTrainingConversationError = "";
};

export const resetSpeechToTextReducer = (state: BotState) => {
  state.transcribingSpeech = false;
  state.speechTranscribed = false;
  state.transcribeSpeechError = "";
  state.transcribedText;
};

export const clearBotActionReducer = (
  state: BotState,
  action: PayloadAction<{
    role: RoleEnum;
    content: string;
    action: UserActions;
  }>
) => {
  state.action = null;
  state.currentConversation = state.currentConversation || [];
  state.currentConversation.push(action.payload);
};

export const resetScheduleAppointmentReducer = (state: BotState) => {
  state.schedulingAppointment = false;
  state.appointmentScheduled = false;
  state.scheduleAppointmentErrors = {};
  state.scheduleAppointmentErrorMessage = "";
};

export const resetEscalateChatReducer = (state: BotState) => {
  state.escalatingChat = false;
  state.chatEscalated = false;
  state.escalateChatErrors = {};
  state.escalateChatErrorMessage = "";
};
