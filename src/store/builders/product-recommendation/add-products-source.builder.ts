import { ProductRecommendationState } from "@/interfaces";
import { addProductsSource } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const addProductsSourceBuilder = (
  builder: ActionReducerMapBuilder<ProductRecommendationState>
) => {
  builder.addCase(addProductsSource.pending, (state) => {
    state.addingProductsSource = true;
  });

  builder.addCase(addProductsSource.fulfilled, (state, action) => {
    state.addingProductsSource = false;
    state.productsSourceAdded = true;
  });

  builder.addCase(addProductsSource.rejected, (state, action) => {
    state.addingProductsSource = false;
    state.productsSourceAdded = false;
    state.addProductsSourceErrors = action.payload?.errors ?? {};
    state.addProductsSourceErrorMessage =
      action.payload?.message ?? "Unable to add products source";
  });
};
