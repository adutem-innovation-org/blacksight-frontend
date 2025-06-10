import { initialApiKeyState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  activateApiKeyBuilder,
  createApiKeyBuilder,
  deactivateApiKeyBuilder,
  getApiKeyBuilder,
  regenerateApiKeyBuilder,
} from "../builders";
import {
  resetActivateApiKeyReducer,
  resetCreateApiKeyReducer,
  resetDeactivateApiKeyReducer,
  resetGetApiKeyReducer,
  resetRegenerateApiKeyReducer,
} from "../reducers";

const apiKeySlice = createSlice({
  name: "ApiKey",
  initialState: initialApiKeyState,
  reducers: {
    resetGetApiKey: resetGetApiKeyReducer,
    resetCreateApiKey: resetCreateApiKeyReducer,
    resetDeactivateApiKey: resetDeactivateApiKeyReducer,
    resetActivateApiKey: resetActivateApiKeyReducer,
    resetRegenerateApiKey: resetRegenerateApiKeyReducer,
  },
  extraReducers(builder) {
    getApiKeyBuilder(builder);
    createApiKeyBuilder(builder);
    deactivateApiKeyBuilder(builder);
    activateApiKeyBuilder(builder);
    regenerateApiKeyBuilder(builder);
  },
});

export const apiKeyReducer = apiKeySlice.reducer;
export const {
  resetActivateApiKey,
  resetCreateApiKey,
  resetDeactivateApiKey,
  resetGetApiKey,
  resetRegenerateApiKey,
} = apiKeySlice.actions;
