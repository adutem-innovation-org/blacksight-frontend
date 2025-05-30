import { BotState } from "@/interfaces";

export const initialBotState: BotState = {
  fetchingBotAnalytics: false,
  botAnalyticsFetched: false,
  fetchBotAnalyticsErrorMessage: "",
  botAnalytics: null,

  // Get all bots
  fetchingAllBots: false,
  allBotsFetched: false,
  fetchAllBotsErrorMessage: "",
  bots: null,
  meta: null,

  // Configure bot
  configuringBot: false,
  botConfigured: false,
  configureBotErrors: {},
  configureBotErrorMessage: "",

  // Playground
  currentBot: null,
  currentConversation: null,
  currentConversationId: null,

  // Update bot configuration
  updatingBotConfig: false,
  botConfigUpdated: false,
  updateBotConfigErrors: {},
  updateBotConfigErrorMessage: "",

  // Update bot instructions
  updatingBotInstructions: false,
  botInstructionsUpdated: false,
  updateBotInstructionsErrors: {},
  updateBotInstructionsErrorMessage: "",

  // Deactivate bot
  deactivatingBot: false,
  botDeactivated: false,
  deactivateBotError: "",

  // Delete bot
  deletingBot: false,
  botDeleted: false,
  deleteBotError: "",

  // Start conversation
  startingConversation: false,
  startConversationError: "",

  // Ask chatbot
  askingChatbot: false,
  askChatbotError: "",

  // Get training conversation
  fetchingTrainingConversation: false,
  trainingConversationFetched: false,
  fetchTrainingConversationError: "",

  // Clear training conversation
  clearingTrainingConversation: false,
  trainingConversationCleared: false,
  clearTrainingConversationError: "",
};
