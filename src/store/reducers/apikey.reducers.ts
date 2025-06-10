import { ApiKeyState } from "@/interfaces";

export const resetGetApiKeyReducer = (state: ApiKeyState) => {
  state.fetchingApiKey = false;
  state.apiKeyFetched = false;
  state.fetchApiKeyError = "";
};

export const resetCreateApiKeyReducer = (state: ApiKeyState) => {
  state.creatingApiKey = false;
  state.apiKeyCreated = false;
  state.createApiKeyError = "";
};

export const resetDeactivateApiKeyReducer = (state: ApiKeyState) => {
  state.deactivatingApiKey = false;
  state.apiKeyDeactivated = false;
  state.deactivateApiKeyError = "";
};

export const resetActivateApiKeyReducer = (state: ApiKeyState) => {
  state.activatingApiKey = false;
  state.apiKeyActivated = false;
  state.activateApiKeyError = "";
};

export const resetRegenerateApiKeyReducer = (state: ApiKeyState) => {
  state.regeneratingApiKey = false;
  state.apiKeyRegenerated = false;
  state.regenerateApiKeyError = "";
};
