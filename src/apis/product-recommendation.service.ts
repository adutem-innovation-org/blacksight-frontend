import {
  AddProductsSourceBody,
  AddProductsSourceRes,
  GetProductsSourcesRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { RECOMMENDATION_URLS } from "./endpoints";

export class ProductRecommendationApiService {
  private static instance: ProductRecommendationApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof RECOMMENDATION_URLS = RECOMMENDATION_URLS;

  constructor() {
    this.apiService = new ApiService("product-recommendation");
  }

  static getInstance(): ProductRecommendationApiService {
    if (!this.instance) {
      this.instance = new ProductRecommendationApiService();
    }
    return this.instance;
  }

  getProductsSources = () => {
    return this.apiService.get<GetProductsSourcesRes>(
      this.urls.GET_PRODUCTS_SOURCES
    );
  };

  addProductsSource = (data: AddProductsSourceBody) => {
    return this.apiService.postWithFile<
      AddProductsSourceBody,
      AddProductsSourceRes
    >(this.urls.ADD_PRODUCTS_SOURCE, data, { timeout: 100000 });
  };
}
