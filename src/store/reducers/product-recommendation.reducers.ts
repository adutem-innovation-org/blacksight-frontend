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

export const resetAttachAgentReducer = (state: ProductRecommendationState) => {
  state.attachingAgent = false;
  state.agentAttached = false;
  state.attachAgentErrorMsg = "";
};

export const resetDetachAgentReducer = (state: ProductRecommendationState) => {
  state.detachingAgent = false;
  state.agentDetached = false;
  state.detachAgentErrorMsg = "";
};
