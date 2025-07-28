import { TemplateAnalyticsRes } from "@/interfaces/template";
import { ApiService } from "./api.service";
import { TEMPLATE_URLS } from "./endpoints";

export class TemplateService {
  private static instance: TemplateService;
  private readonly apiService: ApiService;

  private readonly urls: typeof TEMPLATE_URLS = TEMPLATE_URLS;

  constructor() {
    this.apiService = new ApiService("template");
  }

  static getInstance(): TemplateService {
    if (!this.instance) {
      this.instance = new TemplateService();
    }
    return this.instance;
  }

  getTemplateAnalytics = () => {
    return this.apiService.get<TemplateAnalyticsRes>(
      this.urls.TEMPLATE_ANALYTICS
    );
  };
}
