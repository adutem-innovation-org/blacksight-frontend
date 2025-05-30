import { PaginationMetaData } from "@/interfaces/pagination";
import { Bot } from "./bot";

export type BotState = {
  fetchingBotAnalytics: boolean;
  botAnalyticsFetched: boolean;
  fetchBotAnalyticsErrorMessage: string;
  botAnalytics: Record<string, number> | null;

  // Get all bots
  fetchingAllBots: boolean;
  allBotsFetched: boolean;
  fetchAllBotsErrorMessage: string;
  bots: Bot[] | null;
  meta: PaginationMetaData | null;

  // Configure bot
  configuringBot: boolean;
  botConfigured: boolean;
  configureBotErrors: Record<string, string>;
  configureBotErrorMessage: string;

  // Playground
  currentBot: Bot | null;
  currentConversationId: string | null;
  currentConversation: any[] | null;

  // Update bot configuration
  updatingBotConfig: boolean;
  botConfigUpdated: boolean;
  updateBotConfigErrors: Record<string, string>;
  updateBotConfigErrorMessage: string;

  // Update bot instructions
  updatingBotInstructions: boolean;
  botInstructionsUpdated: boolean;
  updateBotInstructionsErrors: Record<string, string>;
  updateBotInstructionsErrorMessage: string;

  // Deactivate bot
  deactivatingBot: boolean;
  botDeactivated: boolean;
  deactivateBotError: string;

  // Delete bot
  deletingBot: boolean;
  botDeleted: boolean;
  deleteBotError: string;

  // Start conversation
  startingConversation: boolean;
  startConversationError: string;

  // Ask chatbot
  askingChatbot: boolean;
  askChatbotError: string;

  // Get training conversation
  fetchingTrainingConversation: boolean;
  trainingConversationFetched: boolean;
  fetchTrainingConversationError: string;

  // Clear training conversation
  clearingTrainingConversation: boolean;
  trainingConversationCleared: boolean;
  clearTrainingConversationError: string;
};
