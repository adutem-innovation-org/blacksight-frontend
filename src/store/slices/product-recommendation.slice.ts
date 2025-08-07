import { createSlice } from "@reduxjs/toolkit";
import {
  resetAddProductsSourceReducer,
  resetGetProductsSourcesReducer,
} from "../reducers";
import { initialProductRecommendationState } from "@/constants";
import {
  addProductsSourceBuilder,
  getProductsSourcesBuilder,
} from "../builders";

export const productRecommendationSlice = createSlice({
  name: "ProductRecommendation",
  initialState: initialProductRecommendationState,
  reducers: {
    resetGetProductsSources: resetGetProductsSourcesReducer,
    resetAddProductsSource: resetAddProductsSourceReducer,
  },
  extraReducers(builder) {
    getProductsSourcesBuilder(builder);
    addProductsSourceBuilder(builder);
  },
});

export const productRecommendationReducer = productRecommendationSlice.reducer;
export const { resetGetProductsSources, resetAddProductsSource } =
  productRecommendationSlice.actions;
