import {
  ActivateApiKeyRes,
  CreateApiKeyRes,
  DeactivateApiKeyRes,
  DeleteApiKeyRes,
  GetApiKeyRes,
  RenegerateApiKeyRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { API_KEY_URLS } from "./endpoints";

export class ApiKeyApiService {
  private static instance: ApiKeyApiService;
  private readonly apiService: ApiService;
  private readonly urls: typeof API_KEY_URLS = API_KEY_URLS;

  constructor() {
    this.apiService = new ApiService("api-key");
  }

  static getInstance(): ApiKeyApiService {
    if (!this.instance) {
      this.instance = new ApiKeyApiService();
    }
    return this.instance;
  }

  revokeApiKey = () => {};

  reactivateApiKey = () => {};

  getAllApiKeys = () => {};

  createApiKey = () => {
    return this.apiService.post<null, CreateApiKeyRes>(
      this.urls.CREATE_API_KEY
    );
  };

  getApiKey = () => {
    return this.apiService.get<GetApiKeyRes>(this.urls.GET_API_KEY);
  };

  deactivateApiKey = (id: string) => {
    return this.apiService.update<null, DeactivateApiKeyRes>(
      `${this.urls.DEACTIVATE_API_KEY}/${id}`
    );
  };

  activateApiKey = (id: string) => {
    return this.apiService.update<null, ActivateApiKeyRes>(
      `${this.urls.ACTIVATE_API_KEY}/${id}`
    );
  };

  regenerateApiKey = (id: string) => {
    return this.apiService.put<null, RenegerateApiKeyRes>(
      `${this.urls.REGENERATE_API_KEY}/${id}`
    );
  };

  deleteApiKey = (id: string) => {
    return this.apiService.delete<DeleteApiKeyRes>(
      `${this.urls.DELETE_API_KEY}/${id}`
    );
  };
}
