import { ProductRecommendationState } from "@/interfaces";
import { deleteProductsSource } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteProductsSourceBuilder = (
  builder: ActionReducerMapBuilder<ProductRecommendationState>
) => {
  builder.addCase(deleteProductsSource.pending, (state) => {
    state.deletingProductsSource = true;
  });

  builder.addCase(deleteProductsSource.fulfilled, (state) => {
    state.deletingProductsSource = false;
    state.productsSourceDeleted = true;
  });

  builder.addCase(deleteProductsSource.rejected, (state, action) => {
    state.deletingProductsSource = false;
    state.productsSourceDeleted = false;
    state.deleteProductsSourceError = action.payload as string;
  });
};
