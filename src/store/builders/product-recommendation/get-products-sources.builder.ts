import { ProductRecommendationState } from "@/interfaces";
import { getAllProductsSources } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getProductsSourcesBuilder = (
  builder: ActionReducerMapBuilder<ProductRecommendationState>
) => {
  builder.addCase(getAllProductsSources.pending, (state) => {
    state.fetchingProductsSources = true;
  });

  builder.addCase(getAllProductsSources.fulfilled, (state, action) => {
    state.fetchingProductsSources = false;
    state.productsSourcesFetched = true;
    state.productsSources = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(getAllProductsSources.rejected, (state, action) => {
    state.fetchingProductsSources = false;
    state.productsSourcesFetched = false;
    state.fetchProductsSourcesError = action.payload as string;
  });
};
