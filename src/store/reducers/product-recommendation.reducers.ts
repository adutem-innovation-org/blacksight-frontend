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

export const resetDeleteProductsSourceReducer = (
  state: ProductRecommendationState
) => {
  state.deletingProductsSource = false;
  state.productsSourceDeleted = false;
  state.deleteProductsSourceError = "";
};
