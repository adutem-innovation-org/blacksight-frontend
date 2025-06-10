import { ApiKeyState } from "@/interfaces";
import { activateApiKey } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const activateApiKeyBuilder = (
  builder: ActionReducerMapBuilder<ApiKeyState>
) => {
  builder.addCase(activateApiKey.pending, (state) => {
    state.activatingApiKey = true;
  });

  builder.addCase(activateApiKey.fulfilled, (state, action) => {
    state.activatingApiKey = false;
    state.apiKeyActivated = true;
    state.apiKey = { ...state.apiKey, ...action.payload };
  });

  builder.addCase(activateApiKey.rejected, (state, action) => {
    state.activatingApiKey = false;
    state.activateApiKeyError =
      action.payload ?? "Unable to activate api key. Please try again";
  });
};
