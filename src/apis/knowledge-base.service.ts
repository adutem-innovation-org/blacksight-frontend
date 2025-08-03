import {
  AddKnowledgeBaseBody,
  AddKnowledgeBaseRes,
  DeleteKnowledgeBaseRes,
  GenerateKnowledgeBaseBody,
  GenerateKnowledgeBaseRes,
  GetKNowledgeBasesRes,
  KnowledgeBaseAnalyticsRes,
  UpdateKBStatusRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { KNOWLEDGE_BASE_URLS } from "./endpoints";

export class KnowledgeBaseApiService {
  private static instance: KnowledgeBaseApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof KNOWLEDGE_BASE_URLS = KNOWLEDGE_BASE_URLS;

  constructor() {
    this.apiService = new ApiService("knowledge-base");
  }

  static getInstance(): KnowledgeBaseApiService {
    if (!this.instance) {
      this.instance = new KnowledgeBaseApiService();
    }
    return this.instance;
  }

  getKnowledgeBaseAnalytics = () => {
    return this.apiService.get<KnowledgeBaseAnalyticsRes>(
      this.urls.KNOWLEDGE_BASE_ANALYTICS
    );
  };

  getKnowledgeBases = () => {
    return this.apiService.get<GetKNowledgeBasesRes>(
      this.urls.GET_KNOWLEDGE_BASES
    );
  };

  addKnowledgeBase = (data: AddKnowledgeBaseBody) => {
    return this.apiService.postWithFile<
      AddKnowledgeBaseBody,
      AddKnowledgeBaseRes
    >(this.urls.ADD_KNOWLEDGE_BASE, data, { timeout: 100000 });
  };

  generateKnowledgeBase = (data: GenerateKnowledgeBaseBody) => {
    return this.apiService.post<
      GenerateKnowledgeBaseBody,
      GenerateKnowledgeBaseRes
    >(this.urls.GENERATE_KNOWLEDGE_BASE, data, {
      timeout: 100000,
    });
  };

  deactivateKB = (id: string) => {
    return this.apiService.update<any, UpdateKBStatusRes>(
      `${this.urls.DEACTIVATE_KNOWLEDGE_BASE}/${id}`
    );
  };

  activateKB = (id: string) => {
    return this.apiService.update<any, UpdateKBStatusRes>(
      `${this.urls.ACTIVATE_KNOWLEDGE_BASE}/${id}`
    );
  };

  deleteKnowledgeBase = (id: string) => {
    return this.apiService.delete<DeleteKnowledgeBaseRes>(
      `${this.urls.DELETE_KNOWLEDGE_BASE}/${id}`
    );
  };
}
