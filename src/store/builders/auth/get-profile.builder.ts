import { AuthState } from "@/interfaces";
import { getProfile } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getProfileBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(getProfile.pending, (state) => {
    state.fetchingProfile = true;
    state.profileFetched = false;
  });

  builder.addCase(getProfile.fulfilled, (state) => {
    state.fetchingProfile = false;
    state.profileFetched = true;
  });

  builder.addCase(getProfile.rejected, (state) => {
    state.fetchingProfile = false;
    state.profileFetched = false;
  });
};
