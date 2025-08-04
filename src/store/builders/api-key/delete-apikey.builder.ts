import { ApiKeyState } from "@/interfaces";
import { deleteApiKey } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteApiKeyBuilder = (
  builder: ActionReducerMapBuilder<ApiKeyState>
) => {
  builder.addCase(deleteApiKey.pending, (state) => {
    state.deletingApiKey = true;
  });

  builder.addCase(deleteApiKey.fulfilled, (state) => {
    state.deletingApiKey = false;
    state.apiKeyDeleted = true;
    state.apiKey = null;
  });

  builder.addCase(deleteApiKey.rejected, (state, action) => {
    state.deletingApiKey = false;
    state.deleteApiKeyError = action.payload ?? "Unable to delete api key";
  });
};
