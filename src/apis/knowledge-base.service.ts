import {
  AddKnowledgeBaseBody,
  AddKnowledgeBaseRes,
  DeleteKnowledgeBaseRes,
  GetKNowledgeBasesRes,
  KnowledgeBaseAnalyticsRes,
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

  deleteKnowledgeBase = (id: string) => {
    return this.apiService.delete<DeleteKnowledgeBaseRes>(
      `${this.urls.DELETE_KNOWLEDGE_BASE}/${id}`
    );
  };
}
