import { initialApiKeyState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  activateApiKeyBuilder,
  createApiKeyBuilder,
  deactivateApiKeyBuilder,
  deleteApiKeyBuilder,
  getApiKeyBuilder,
  regenerateApiKeyBuilder,
} from "../builders";
import {
  resetActivateApiKeyReducer,
  resetCreateApiKeyReducer,
  resetDeactivateApiKeyReducer,
  resetDeleteApiKeyReducer,
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
    resetDeleteApiKey: resetDeleteApiKeyReducer,
  },
  extraReducers(builder) {
    getApiKeyBuilder(builder);
    createApiKeyBuilder(builder);
    deactivateApiKeyBuilder(builder);
    activateApiKeyBuilder(builder);
    regenerateApiKeyBuilder(builder);
    deleteApiKeyBuilder(builder);
  },
});

export const apiKeyReducer = apiKeySlice.reducer;
export const {
  resetActivateApiKey,
  resetCreateApiKey,
  resetDeactivateApiKey,
  resetGetApiKey,
  resetRegenerateApiKey,
  resetDeleteApiKey,
} = apiKeySlice.actions;
