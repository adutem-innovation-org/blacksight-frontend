import { CalendarState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const resetGetProviderAuthUrlReducer = (state: CalendarState) => {
  state.fetchingProviderAuthUrl = false;
  state.providerAuthUrlFetched = false;
  state.fetchProviderAuthUrlError = "";
};

export const resetDisconnectProviderReducer = (state: CalendarState) => {
  state.disconnectingProvider = false;
  state.providerDisconnected = false;
  state.disconnectProviderError = "";
};

export const setConnectingProviderStatusReducer = (
  state: CalendarState,
  action: PayloadAction<boolean>
) => {
  state.connectingProvider = action.payload;
};

export const resetGetConnectedProvidersReducer = (state: CalendarState) => {
  state.fetchingConnectedProviders = false;
  state.connectedProvidersFetched = false;
  state.fetchConnectedProvidersError = "";
};

export const resetConnectCalcomReducer = (state: CalendarState) => {
  state.connectingCalcom = false;
  state.calcomConnected = false;
  state.connectCalcomErrors = {};
  state.connectCalcomErrorMessage = "";
};
