import { ProductRecommendationState } from "@/interfaces";
import { attachAgentToProductSource } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const attachAgentToProductSourceBuilder = (
  builder: ActionReducerMapBuilder<ProductRecommendationState>
) => {
  builder
    .addCase(attachAgentToProductSource.pending, (state) => {
      state.attachingAgent = true;
    })
    .addCase(attachAgentToProductSource.fulfilled, (state) => {
      state.attachingAgent = false;
      state.agentAttached = true;
    })
    .addCase(attachAgentToProductSource.rejected, (state, action) => {
      state.attachingAgent = false;
      state.attachAgentErrorMsg = action.payload as string;
    });
};
