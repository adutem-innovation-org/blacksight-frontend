import { ProductRecommendationState } from "@/interfaces";

export const initialProductRecommendationState: ProductRecommendationState = {
  fetchingProductsSources: false,
  productsSourcesFetched: false,
  fetchProductsSourcesError: "",
  productsSources: null,
  meta: null,

  // Add products source
  addingProductsSource: false,
  productsSourceAdded: false,
  addProductsSourceErrors: {},
  addProductsSourceErrorMessage: "",

  // Delete products source
  deletingProductsSource: false,
  productsSourceDeleted: false,
  deleteProductsSourceError: "",
};
