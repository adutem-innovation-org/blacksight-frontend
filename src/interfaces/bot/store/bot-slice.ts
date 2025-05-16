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
};
