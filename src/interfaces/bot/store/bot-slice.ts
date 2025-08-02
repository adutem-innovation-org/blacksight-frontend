import { PaginationMetaData } from "@/interfaces/pagination";
import { Bot, Conversation } from "./bot";
import { BotActions } from "@/enums";

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

  // Fetch conversation analytics
  fetchingConversationAnalytics: boolean;
  conversationAnalyticsFetched: boolean;
  fetchConversationAnalyticsError: string;
  conversationAnalytics: Record<string, number> | null;

  // Get all conversations
  fetchingAllConversations: boolean;
  allConversationsFetched: boolean;
  fetchAllConversationsError: string;
  conversations: Conversation[] | null;
  conversationMeta: PaginationMetaData | null;

  // Configure bot
  configuringBot: boolean;
  botConfigured: boolean;
  configureBotErrors: Record<string, string>;
  configureBotErrorMessage: string;

  // Clone bot
  cloningBot: boolean;
  botCloned: boolean;
  cloneBotErrorMessage: string;

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

  // Update bot status
  updatingBotStatus: boolean;
  botStatusUpdated: boolean;
  updateBotStatusError: string;

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
  action: BotActions | null;

  // Get training conversation
  fetchingTrainingConversation: boolean;
  trainingConversationFetched: boolean;
  fetchTrainingConversationError: string;

  // Clear training conversation
  clearingTrainingConversation: boolean;
  trainingConversationCleared: boolean;
  clearTrainingConversationError: string;

  // Speech to text
  transcribingSpeech: boolean;
  speechTranscribed: boolean;
  transcribeSpeechError: string;
  transcribedText: string;

  // Schedule appointment
  schedulingAppointment: boolean;
  appointmentScheduled: boolean;
  scheduleAppointmentErrors: Record<string, string>;
  scheduleAppointmentErrorMessage: string;

  // Escalate chat
  escalatingChat: boolean;
  chatEscalated: boolean;
  escalateChatErrors: Record<string, string>;
  escalateChatErrorMessage: string;
};
