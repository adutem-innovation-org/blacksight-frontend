import { CalendarState } from "@/interfaces";
import { getProviderAuthUrl } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getProviderAuthUrlBuilder = (
  builder: ActionReducerMapBuilder<CalendarState>
) => {
  builder.addCase(getProviderAuthUrl.pending, (state) => {
    state.fetchingProviderAuthUrl = true;
    state.providerAuthUrl = "";
  });

  builder.addCase(getProviderAuthUrl.fulfilled, (state, action) => {
    state.fetchingProviderAuthUrl = false;
    state.providerAuthUrlFetched = true;
    state.providerAuthUrl = action.payload;
  });

  builder.addCase(getProviderAuthUrl.rejected, (state, action) => {
    state.fetchingProviderAuthUrl = false;
    state.fetchProviderAuthUrlError = action.payload as string;
  });
};
