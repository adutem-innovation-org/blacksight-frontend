import { createSlice } from "@reduxjs/toolkit";
import {
  resetAddProductsSourceReducer,
  resetAttachAgentReducer,
  resetDeleteProductsSourceReducer,
  resetDetachAgentReducer,
  resetGetProductsSourcesReducer,
} from "../reducers";
import { initialProductRecommendationState } from "@/constants";
import {
  addProductsSourceBuilder,
  attachAgentToProductSourceBuilder,
  deleteProductsSourceBuilder,
  detachAgentFromProductSourceBuilder,
  getProductsSourcesBuilder,
} from "../builders";

export const productRecommendationSlice = createSlice({
  name: "ProductRecommendation",
  initialState: initialProductRecommendationState,
  reducers: {
    resetGetProductsSources: resetGetProductsSourcesReducer,
    resetAddProductsSource: resetAddProductsSourceReducer,
    resetDeleteProductsSource: resetDeleteProductsSourceReducer,
    resetAttachAgent: resetAttachAgentReducer,
    resetDetachAgent: resetDetachAgentReducer,
  },
  extraReducers(builder) {
    getProductsSourcesBuilder(builder);
    addProductsSourceBuilder(builder);
    deleteProductsSourceBuilder(builder);
    attachAgentToProductSourceBuilder(builder);
    detachAgentFromProductSourceBuilder(builder);
  },
});

export const productRecommendationReducer = productRecommendationSlice.reducer;
export const {
  resetGetProductsSources,
  resetAddProductsSource,
  resetDeleteProductsSource,
  resetAttachAgent,
  resetDetachAgent,
} = productRecommendationSlice.actions;
