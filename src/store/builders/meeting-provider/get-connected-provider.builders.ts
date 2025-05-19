import { MeetingProviderState } from "@/interfaces";
import { getConnectedProviders } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getConnectedProvidersBuilder = (
  builder: ActionReducerMapBuilder<MeetingProviderState>
) => {
  builder.addCase(getConnectedProviders.pending, (state) => {
    state.fetchingConnectedProviders = true;
  });

  builder.addCase(getConnectedProviders.fulfilled, (state, action) => {
    state.fetchingConnectedProviders = false;
    state.connectedProvidersFetched = true;
    state.connectedProviders = action.payload;
  });

  builder.addCase(getConnectedProviders.rejected, (state, action) => {
    state.fetchingConnectedProviders = false;
    state.connectedProvidersFetched = false;
    state.fetchConnectedProvidersError = action.payload as string;
  });
};
