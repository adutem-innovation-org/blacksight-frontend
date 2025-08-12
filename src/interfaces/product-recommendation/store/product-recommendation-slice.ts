import { PaginationMetaData } from "@/interfaces/pagination";
import { IProductsSource } from "./product-source";
import { boolean } from "yup";

export interface ProductRecommendationState {
  fetchingProductsSources: boolean;
  productsSourcesFetched: boolean;
  fetchProductsSourcesError: string;
  productsSources: IProductsSource[] | null;
  meta: PaginationMetaData | null;

  // Add products sources
  addingProductsSource: boolean;
  productsSourceAdded: boolean;
  addProductsSourceErrors: Record<string, string>;
  addProductsSourceErrorMessage: string;

  // Delete products source
  deletingProductsSource: boolean;
  productsSourceDeleted: boolean;
  deleteProductsSourceError: string;

  // Attach agent to products source
  attachingAgent: boolean;
  agentAttached: boolean;
  attachAgentErrorMsg: string;
}
