import { ProductRecommendationState } from "@/interfaces";

export const resetGetProductsSourcesReducer = (
  state: ProductRecommendationState
) => {
  state.fetchingProductsSources = false;
  state.productsSourcesFetched = false;
  state.fetchProductsSourcesError = "";
};

export const resetAddProductsSourceReducer = (
  state: ProductRecommendationState
) => {
  state.addingProductsSource = false;
  state.productsSourceAdded = false;
  state.addProductsSourceErrors = {};
  state.addProductsSourceErrorMessage = "";
};
