import { PaginationMetaData } from "@/interfaces/pagination";
import { IProductSource } from "./product-source";

export interface ProductRecommendationState {
  fetchingProductsSources: boolean;
  productsSourcesFetched: boolean;
  fetchProductsSourcesError: string;
  productsSources: IProductSource[] | null;
  meta: PaginationMetaData | null;

  // Add products sources
  addingProductsSource: boolean;
  productsSourceAdded: boolean;
  addProductsSourceErrors: Record<string, string>;
  addProductsSourceErrorMessage: string;
}
