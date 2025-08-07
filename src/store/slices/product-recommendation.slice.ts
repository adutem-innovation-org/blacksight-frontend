import { createSlice } from "@reduxjs/toolkit";
import {
  resetAddProductsSourceReducer,
  resetDeleteProductsSourceReducer,
  resetGetProductsSourcesReducer,
} from "../reducers";
import { initialProductRecommendationState } from "@/constants";
import {
  addProductsSourceBuilder,
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
  },
  extraReducers(builder) {
    getProductsSourcesBuilder(builder);
    addProductsSourceBuilder(builder);
    deleteProductsSourceBuilder(builder);
  },
});

export const productRecommendationReducer = productRecommendationSlice.reducer;
export const {
  resetGetProductsSources,
  resetAddProductsSource,
  resetDeleteProductsSource,
} = productRecommendationSlice.actions;
