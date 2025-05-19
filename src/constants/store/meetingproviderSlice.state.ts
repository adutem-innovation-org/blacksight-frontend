import { MeetingProviderState } from "@/interfaces";

export const initialMeetingProviderState: MeetingProviderState = {
  // Get authorization url
  fetchingProviderAuthUrl: false,
  providerAuthUrlFetched: false,
  providerAuthUrl: "",
  fetchProviderAuthUrlError: "",

  // Connect provider;
  connectingProvider: false,

  // Disconnect provider
  disconnectingProvider: false,
  providerDisconnected: false,
  disconnectProviderError: "",

  // Get Providers
  fetchingConnectedProviders: false,
  connectedProvidersFetched: false,
  connectedProviders: null,
  fetchConnectedProvidersError: "",
};
