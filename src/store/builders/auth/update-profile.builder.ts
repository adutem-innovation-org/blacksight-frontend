import { AuthState } from "@/interfaces";
import { updateProfile } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateProfileBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(updateProfile.pending, (state) => {
    state.updatingProfile = true;
  });
  builder.addCase(updateProfile.fulfilled, (state) => {
    state.updatingProfile = false;
    state.profileUpdated = true;
  });
  builder.addCase(updateProfile.rejected, (state, action) => {
    state.updatingProfile = false;
    state.updateProfileErrors = action?.payload?.errors || {};
    state.updateProfileErrorMessage =
      action?.payload?.message ?? "Unable to update profile";
  });
};
