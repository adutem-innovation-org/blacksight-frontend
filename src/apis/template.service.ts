import {
  CreateTemplateBody,
  CreateTemplateRes,
  TemplateAnalyticsRes,
  GetTemplatesRes,
  DeleteTemplateRes,
} from "@/interfaces";
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

  createTemplate = (data: CreateTemplateBody) => {
    return this.apiService.post<CreateTemplateBody, CreateTemplateRes>(
      this.urls.CREATE_TEMPLATE,
      data
    );
  };

  getUserTemplates = () => {
    return this.apiService.get<GetTemplatesRes>(this.urls.GET_USER_TEMPLATES);
  };

  getAdminTemplates = () => {
    return this.apiService.get<GetTemplatesRes>(this.urls.GET_ADMIN_TEMPLATES);
  };

  updateTemplate = (id: string, data: CreateTemplateBody) => {
    return this.apiService.update<CreateTemplateBody, CreateTemplateRes>(
      this.urls.UPDATE_TEMPLATE.replace(":id", id),
      data
    );
  };

  deleteTemplate = (id: string) => {
    return this.apiService.delete<DeleteTemplateRes>(
      this.urls.DELETE_TEMPLATE.replace(":id", id)
    );
  };
}
