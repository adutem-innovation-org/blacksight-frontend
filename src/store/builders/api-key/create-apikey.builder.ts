import { ApiKeyState } from "@/interfaces";
import { createApiKey } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const createApiKeyBuilder = (
  builder: ActionReducerMapBuilder<ApiKeyState>
) => {
  builder.addCase(createApiKey.pending, (state) => {
    state.creatingApiKey = true;
  });

  builder.addCase(createApiKey.fulfilled, (state, action) => {
    state.creatingApiKey = false;
    state.apiKeyCreated = true;
    state.apiKey = action.payload;
  });

  builder.addCase(createApiKey.rejected, (state, action) => {
    state.creatingApiKey = false;
    state.createApiKeyError =
      action.payload ?? "Unable to generate key. Please try again";
  });
};
