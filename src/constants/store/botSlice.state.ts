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
};
