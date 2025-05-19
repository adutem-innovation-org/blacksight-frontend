import {
  ApiSuccessResponse,
  GetConnectedProvidersRes,
  GetProviderUrlRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { MEETING_PROVIDER_URLS } from "./endpoints";
import { MeetingProvidersEnum } from "@/enums";

export class MeetingProviderApiService {
  private static instance: MeetingProviderApiService;
  private readonly apiService: ApiService;
  private readonly urls: typeof MEETING_PROVIDER_URLS = MEETING_PROVIDER_URLS;

  constructor() {
    this.apiService = new ApiService("meeting-provider");
  }

  static getInstance(): MeetingProviderApiService {
    if (!this.instance) {
      this.instance = new MeetingProviderApiService();
    }
    return this.instance;
  }

  getProviderAuthUrl = (provider: MeetingProvidersEnum) => {
    return this.apiService.get<GetProviderUrlRes>(
      `${this.urls.CONNECT_PROVIDER}/${provider}`
    );
  };

  disconnectProvider = (provider: MeetingProvidersEnum) => {
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
