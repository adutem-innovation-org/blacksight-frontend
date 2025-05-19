import { MeetingProviderState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const resetGetProviderAuthUrlReducer = (state: MeetingProviderState) => {
  state.fetchingProviderAuthUrl = false;
  state.providerAuthUrlFetched = false;
  state.fetchProviderAuthUrlError = "";
};

export const resetDisconnectProviderReducer = (state: MeetingProviderState) => {
  state.disconnectingProvider = false;
  state.providerDisconnected = false;
  state.disconnectProviderError = "";
};

export const setConnectingProviderStatusReducer = (
  state: MeetingProviderState,
  action: PayloadAction<boolean>
) => {
  state.connectingProvider = action.payload;
};

export const resetGetConnectedProvidersReducer = (
  state: MeetingProviderState
) => {
  state.fetchingConnectedProviders = false;
  state.connectedProvidersFetched = false;
  state.fetchConnectedProvidersError = "";
};
