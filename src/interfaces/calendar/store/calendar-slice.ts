import { CalendarProvider } from "./calendar-provider";

export interface CalendarState {
  // Generate auth url
  fetchingProviderAuthUrl: boolean;
  providerAuthUrlFetched: boolean;
  providerAuthUrl: string;
  fetchProviderAuthUrlError: string;

  // Connect provider
  connectingProvider: boolean;

  // Connect calcom
  connectingCalcom: boolean;
  calcomConnected: boolean;
  connectCalcomErrors: Record<string, string>;
  connectCalcomErrorMessage: string;

  // Disconnect provider
  disconnectingProvider: boolean;
  providerDisconnected: boolean;
  disconnectProviderError: string;

  // Get providers
  fetchingConnectedProviders: boolean;
  connectedProvidersFetched: boolean;
  connectedProviders: CalendarProvider[] | null;
  fetchConnectedProvidersError: string;
}
