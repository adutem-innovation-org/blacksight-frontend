import { ProductRecommendationState } from "@/interfaces";
import { detachAgentFromProductSource } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const detachAgentFromProductSourceBuilder = (
  builder: ActionReducerMapBuilder<ProductRecommendationState>
) => {
  builder
    .addCase(detachAgentFromProductSource.pending, (state) => {
      state.detachingAgent = true;
    })
    .addCase(detachAgentFromProductSource.fulfilled, (state) => {
      state.detachingAgent = false;
      state.agentDetached = true;
    })
    .addCase(detachAgentFromProductSource.rejected, (state, action) => {
      state.detachingAgent = false;
      state.agentDetached = false;
      state.detachAgentErrorMsg = action.payload as string;
    });
};
