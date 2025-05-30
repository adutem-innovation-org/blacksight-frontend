import {
  AskChatbotBody,
  AskChatbotRes,
  BotAnalyticsRes,
  ClearTrainingConversationRes,
  ConfigureBotBody,
  ConfigureBotRes,
  DeactivateBotRes,
  DeleteBotRes,
  GetBotsRes,
  GetTrainingConversationRes,
  StartConversationBody,
  StartConversationRes,
  UpdateBotConfigBody,
  UpdateBotConfigRes,
  UpdateBotInstructionsBody,
  UpdateBotInstructionsRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { BOT_URLS } from "./endpoints";

export class BotApiService {
  private static instance: BotApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof BOT_URLS = BOT_URLS;

  constructor() {
    this.apiService = new ApiService("bot");
  }

  static getInstance(): BotApiService {
    if (!this.instance) {
      this.instance = new BotApiService();
    }
    return this.instance;
  }

  getBotAnalytics = () => {
    return this.apiService.get<BotAnalyticsRes>(this.urls.BOT_ANALYTICS);
  };

  getBots = () => {
    return this.apiService.get<GetBotsRes>(this.urls.GET_ALL_BOTS);
  };

  configureBot = (data: ConfigureBotBody) => {
    return this.apiService.post<ConfigureBotBody, ConfigureBotRes>(
      this.urls.CONFIGURE_BOT,
      data
    );
  };

  updateBotConfig = (id: string, data: UpdateBotConfigBody) => {
    return this.apiService.update<UpdateBotConfigBody, UpdateBotConfigRes>(
      `/${id}`,
      data
    );
  };

  updateBotInstructions = (id: string, data: UpdateBotInstructionsBody) => {
    return this.apiService.update<
      UpdateBotInstructionsBody,
      UpdateBotInstructionsRes
    >(`${this.urls.UPDATE_BOT_INSTRUCTIONS}/${id}`, data);
  };

  deactivateBot = (botId: string) => {
    return this.apiService.update<any, DeactivateBotRes>(
      `${this.urls.DEACTIVATE_BOT}/${botId}`
    );
  };

  deleteBot = (botId: string) => {
    return this.apiService.delete<DeleteBotRes>(
      `${this.urls.DELETE_BOT}/${botId}`
    );
  };

  getTrainingConversation = (botId: string) => {
    return this.apiService.get<GetTrainingConversationRes>(
      `${this.urls.TRAINING_CONVERSATION}/${botId}`
    );
  };

  clearTrainingConversation = (botId: string, conversationId: string) => {
    return this.apiService.delete<ClearTrainingConversationRes>(
      `${this.urls.TRAINING_CONVERSATION}/${botId}/${conversationId}`
    );
  };

  startConversation = (data: StartConversationBody) => {
    return this.apiService.post<StartConversationBody, StartConversationRes>(
      this.urls.START_CONVERSATION,
      data
    );
  };

  askChatbot = (data: AskChatbotBody) => {
    return this.apiService.post<AskChatbotBody, AskChatbotRes>(
      this.urls.ASK_CHATBOT,
      data,
      { timeout: 40000 }
    );
  };
}
