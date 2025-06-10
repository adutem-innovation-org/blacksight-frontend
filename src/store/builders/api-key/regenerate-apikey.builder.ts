import { ApiKeyState } from "@/interfaces";
import { regenerateApiKey } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const regenerateApiKeyBuilder = (
  builder: ActionReducerMapBuilder<ApiKeyState>
) => [
  builder.addCase(regenerateApiKey.pending, (state) => {
    state.regeneratingApiKey = true;
  }),

  builder.addCase(regenerateApiKey.fulfilled, (state, action) => {
    state.regeneratingApiKey = false;
    state.apiKeyRegenerated = true;
    state.apiKey = action.payload;
  }),

  builder.addCase(regenerateApiKey.rejected, (state, action) => {
    state.regeneratingApiKey = false;
    state.regenerateApiKeyError =
      action.payload ?? "Unable to regenerate api key. Please try again.";
  }),
];
