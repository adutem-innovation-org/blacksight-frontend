import { createSlice } from "@reduxjs/toolkit";
import {
  resetAddProductsSourceReducer,
  resetAttachAgentReducer,
  resetDeleteProductsSourceReducer,
  resetGetProductsSourcesReducer,
} from "../reducers";
import { initialProductRecommendationState } from "@/constants";
import {
  addProductsSourceBuilder,
  attachAgentToProductSourceBuilder,
  deleteProductsSourceBuilder,
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
  },
  extraReducers(builder) {
    getProductsSourcesBuilder(builder);
    addProductsSourceBuilder(builder);
    deleteProductsSourceBuilder(builder);
    attachAgentToProductSourceBuilder(builder);
  },
});

export const productRecommendationReducer = productRecommendationSlice.reducer;
export const {
  resetGetProductsSources,
  resetAddProductsSource,
  resetDeleteProductsSource,
  resetAttachAgent,
} = productRecommendationSlice.actions;
