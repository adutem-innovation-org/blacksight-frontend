import { GetAdminAnalyticsRes, GetBusinessAnalyticsRes } from "@/interfaces";
import { ApiService } from "./api.service";
import { ANALYTICS_URLS } from "./endpoints";

export class AnalyticsApiService {
  private static instance: AnalyticsApiService;

  private readonly apiService: ApiService;
  private readonly urls: typeof ANALYTICS_URLS = ANALYTICS_URLS;

  constructor() {
    this.apiService = new ApiService("analytics");
  }

  static getInstance(): AnalyticsApiService {
    if (!this.instance) {
      this.instance = new AnalyticsApiService();
    }
    return this.instance;
  }

  getBusinessAnalytics = () => {
    return this.apiService.get<GetBusinessAnalyticsRes>(
      this.urls.BUSINESS_ANALYTICS
    );
  };

  getAdminAnalytics = () => {
    return this.apiService.get<GetAdminAnalyticsRes>(this.urls.ADMIN_ANALYTICS);
  };
}
