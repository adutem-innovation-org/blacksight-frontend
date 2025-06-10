import { ApiKeyState } from "@/interfaces";

export const initialApiKeyState: ApiKeyState = {
  fetchingApiKey: false,
  apiKeyFetched: false,
  fetchApiKeyError: "",
  apiKey: null,

  creatingApiKey: false,
  apiKeyCreated: false,
  createApiKeyError: "",

  deactivatingApiKey: false,
  apiKeyDeactivated: false,
  deactivateApiKeyError: "",

  activatingApiKey: false,
  apiKeyActivated: false,
  activateApiKeyError: "",

  regeneratingApiKey: false,
  apiKeyRegenerated: false,
  regenerateApiKeyError: "",
};
