import { CalendarState } from "@/interfaces";

export const initialCalendarState: CalendarState = {
  // Get authorization url
  fetchingProviderAuthUrl: false,
  providerAuthUrlFetched: false,
  providerAuthUrl: "",
  fetchProviderAuthUrlError: "",

  // Connect provider;
  connectingProvider: false,

  // Connect Calcom
  connectingCalcom: false,
  calcomConnected: false,
  connectCalcomErrors: {},
  connectCalcomErrorMessage: "",

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
