import { initialCalendarState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  resetGetProviderAuthUrlReducer,
  resetDisconnectProviderReducer,
  setConnectingProviderStatusReducer,
  resetGetConnectedProvidersReducer,
  resetConnectCalcomReducer,
} from "../reducers";
import {
  getProviderAuthUrlBuilder,
  disconnectProviderBuilder,
  getConnectedProvidersBuilder,
  connectCalcomBuilder,
} from "../builders";

const meetingProviderSlice = createSlice({
  name: "Calendar",
  initialState: initialCalendarState,
  reducers: {
    resetGetProviderAuthUrl: resetGetProviderAuthUrlReducer,
    resetDisconnectProvider: resetDisconnectProviderReducer,
    setConnectingProviderStatus: setConnectingProviderStatusReducer,
    resetGetConnectedProviders: resetGetConnectedProvidersReducer,
    resetConnectCalcom: resetConnectCalcomReducer,
  },
  extraReducers(builder) {
    getProviderAuthUrlBuilder(builder);
    disconnectProviderBuilder(builder);
    getConnectedProvidersBuilder(builder);
    connectCalcomBuilder(builder);
  },
});

export const meetingProviderReducer = meetingProviderSlice.reducer;
export const {
  resetGetProviderAuthUrl,
  resetDisconnectProvider,
  setConnectingProviderStatus,
  resetGetConnectedProviders,
  resetConnectCalcom,
} = meetingProviderSlice.actions;
