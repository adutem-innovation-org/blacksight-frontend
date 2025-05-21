import {
  BotAnalyticsRes,
  ConfigureBotBody,
  ConfigureBotRes,
  GetBotsRes,
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
}
