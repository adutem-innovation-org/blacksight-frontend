import { ApiKeyState } from "@/interfaces";
import { getApiKey } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getApiKeyBuilder = (
  builder: ActionReducerMapBuilder<ApiKeyState>
) => {
  builder.addCase(getApiKey.pending, (state) => {
    state.fetchingApiKey = true;
  });

  builder.addCase(getApiKey.fulfilled, (state, action) => {
    state.fetchingApiKey = false;
    state.apiKeyFetched = true;
    state.apiKey = action.payload;
  });

  builder.addCase(getApiKey.rejected, (state, action) => {
    state.fetchingApiKey = false;
    state.fetchApiKeyError = action.payload ?? "Unable to fetch api key";
  });
};
