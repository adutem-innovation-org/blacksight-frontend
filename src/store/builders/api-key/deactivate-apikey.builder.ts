import { ApiKeyState } from "@/interfaces";
import { deactivateApiKey } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deactivateApiKeyBuilder = (
  builder: ActionReducerMapBuilder<ApiKeyState>
) => {
  builder.addCase(deactivateApiKey.pending, (state) => {
    state.deactivatingApiKey = true;
  });

  builder.addCase(deactivateApiKey.fulfilled, (state, action) => {
    state.deactivatingApiKey = false;
    state.apiKeyDeactivated = true;
    state.apiKey = { ...state.apiKey, ...action.payload };
  });

  builder.addCase(deactivateApiKey.rejected, (state, action) => {
    state.deactivatingApiKey = false;
    state.deactivateApiKeyError =
      action.payload ?? "Unable to deactivate api key. Please try again";
  });
};
