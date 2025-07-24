import { CalendarState } from "@/interfaces";
import { disconnectProvider } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const disconnectProviderBuilder = (
  builder: ActionReducerMapBuilder<CalendarState>
) => {
  builder.addCase(disconnectProvider.pending, (state) => {
    state.disconnectingProvider = true;
  });

  builder.addCase(disconnectProvider.fulfilled, (state, action) => {
    state.disconnectingProvider = false;
    state.providerDisconnected = true;
  });

  builder.addCase(disconnectProvider.rejected, (state, action) => {
    state.disconnectingProvider = false;
    state.disconnectProviderError = action.payload as string;
  });
};
