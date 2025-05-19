import { initialMeetingProviderState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  resetGetProviderAuthUrlReducer,
  resetDisconnectProviderReducer,
  setConnectingProviderStatusReducer,
  resetGetConnectedProvidersReducer,
} from "../reducers";
import {
  getProviderAuthUrlBuilder,
  disconnectProviderBuilder,
  getConnectedProvidersBuilder,
} from "../builders";

const meetingProviderSlice = createSlice({
  name: "MeetingProvider",
  initialState: initialMeetingProviderState,
  reducers: {
    resetGetProviderAuthUrl: resetGetProviderAuthUrlReducer,
    resetDisconnectProvider: resetDisconnectProviderReducer,
    setConnectingProviderStatus: setConnectingProviderStatusReducer,
    resetGetConnectedProviders: resetGetConnectedProvidersReducer,
  },
  extraReducers(builder) {
    getProviderAuthUrlBuilder(builder);
    disconnectProviderBuilder(builder);
    getConnectedProvidersBuilder(builder);
  },
});

export const meetingProviderReducer = meetingProviderSlice.reducer;
export const {
  resetGetProviderAuthUrl,
  resetDisconnectProvider,
  setConnectingProviderStatus,
  resetGetConnectedProviders,
} = meetingProviderSlice.actions;
