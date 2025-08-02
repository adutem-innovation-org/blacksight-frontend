import {
  AskChatbotBody,
  AskChatbotRes,
  BotAnalyticsRes,
  ClearTrainingConversationRes,
  ConfigureBotBody,
  ConfigureBotRes,
  ConversationAnalyticsRes,
  DeleteBotRes,
  EscalateChatBody,
  EscalateChatRes,
  GetAllConversationsRes,
  GetBotsRes,
  GetTrainingConversationRes,
  ScheduleAppointmentBody,
  ScheduleAppointmentRes,
  SpeechToTextBody,
  SpeechToTextRes,
  StartConversationBody,
  StartConversationRes,
  UpdateBotConfigBody,
  UpdateBotConfigRes,
  UpdateBotInstructionsBody,
  UpdateBotInstructionsRes,
  UpdateBotStatusRes,
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

  getConversationAnalytics = () => {
    return this.apiService.get<ConversationAnalyticsRes>(
      this.urls.CONVERSATION_ANALYTICS
    );
  };

  getAllConversations = () => {
    return this.apiService.get<GetAllConversationsRes>(
      this.urls.GET_ALL_CONVERSATIONS
    );
  };

  configureBot = (data: ConfigureBotBody) => {
    return this.apiService.post<ConfigureBotBody, ConfigureBotRes>(
      this.urls.CONFIGURE_BOT,
      data
    );
  };

  cloneBot = (botId: string) => {
    return this.apiService.post<string, ConfigureBotRes>(
      `${this.urls.CLONE_BOT}/${botId}`
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
    return this.apiService.update<any, UpdateBotStatusRes>(
      `${this.urls.DEACTIVATE_BOT}/${botId}`
    );
  };

  activateBot = (botId: string) => {
    return this.apiService.update<any, UpdateBotStatusRes>(
      `${this.urls.ACTIVATE_BOT}/${botId}`
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

  speechToText = (data: SpeechToTextBody) => {
    return this.apiService.postWithFile<SpeechToTextBody, SpeechToTextRes>(
      this.urls.SPEECH_TO_TEXT,
      data,
      { timeout: 40000 }
    );
  };

  scheduleAppointment = (data: ScheduleAppointmentBody) => {
    return this.apiService.post<
      ScheduleAppointmentBody,
      ScheduleAppointmentRes
    >(this.urls.SCHEDULE_APPOINTMENT, data, {
      timeout: 45000,
    });
  };

  escalateChat = (data: EscalateChatBody) => {
    return this.apiService.post<EscalateChatBody, EscalateChatRes>(
      this.urls.ESCALATE_CHAT,
      data,
      { timeout: 45000 }
    );
  };
}
