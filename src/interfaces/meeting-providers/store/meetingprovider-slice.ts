import { MeetingProvider } from "./meeting-provider";

export interface MeetingProviderState {
  // Generate auth url
  fetchingProviderAuthUrl: boolean;
  providerAuthUrlFetched: boolean;
  providerAuthUrl: string;
  fetchProviderAuthUrlError: string;

  // Connect provider
  connectingProvider: boolean;

  // Disconnect provider
  disconnectingProvider: boolean;
  providerDisconnected: boolean;
  disconnectProviderError: string;

  // Get providers
  fetchingConnectedProviders: boolean;
  connectedProvidersFetched: boolean;
  connectedProviders: MeetingProvider[] | null;
  fetchConnectedProvidersError: string;
}
