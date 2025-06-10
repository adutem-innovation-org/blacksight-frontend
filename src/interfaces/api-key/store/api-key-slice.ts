import { ApiKey } from "./api-key";

export interface ApiKeyState {
  fetchingApiKey: boolean;
  apiKeyFetched: boolean;
  fetchApiKeyError: string;
  apiKey: ApiKey | null | Record<string, any>;

  creatingApiKey: boolean;
  apiKeyCreated: boolean;
  createApiKeyError: string;

  deactivatingApiKey: boolean;
  apiKeyDeactivated: boolean;
  deactivateApiKeyError: string;

  activatingApiKey: boolean;
  apiKeyActivated: boolean;
  activateApiKeyError: string;

  regeneratingApiKey: boolean;
  apiKeyRegenerated: boolean;
  regenerateApiKeyError: string;
}
