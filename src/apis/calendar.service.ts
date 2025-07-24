import {
  ApiSuccessResponse,
  ConnectCalcomBody,
  GetConnectedProvidersRes,
  GetProviderUrlRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { MEETING_PROVIDER_URLS } from "./endpoints";
import { CalendarProvidersEnum } from "@/enums";

export class CalendarApiService {
  private static instance: CalendarApiService;
  private readonly apiService: ApiService;
  private readonly urls: typeof MEETING_PROVIDER_URLS = MEETING_PROVIDER_URLS;

  constructor() {
    this.apiService = new ApiService("meeting-provider");
  }

  static getInstance(): CalendarApiService {
    if (!this.instance) {
      this.instance = new CalendarApiService();
    }
    return this.instance;
  }

  getProviderAuthUrl = (provider: CalendarProvidersEnum) => {
    return this.apiService.get<GetProviderUrlRes>(
      `${this.urls.CONNECT_PROVIDER}/${provider}`
    );
  };

  connectCalcom = (data: ConnectCalcomBody) => {
    return this.apiService.post<ConnectCalcomBody, ApiSuccessResponse>(
      `${this.urls.CONNECT_PROVIDER}/cal-com`,
      data
    );
  };

  disconnectProvider = (provider: CalendarProvidersEnum) => {
    return this.apiService.delete<ApiSuccessResponse>(
      `${this.urls.DISCONNECT_PROVIDER}/${provider}`
    );
  };

  getConnectedProviders = () => {
    return this.apiService.get<GetConnectedProvidersRes>(
      this.urls.GET_CONNECTED_PROVIDERS
    );
  };
}
