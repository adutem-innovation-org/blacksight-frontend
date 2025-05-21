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
};
