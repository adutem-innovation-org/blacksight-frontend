import { AuthState } from "@/interfaces";
import { getMfaStatus } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getMfaStatusBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(getMfaStatus.pending, (state) => {
    state.fetchingMfaStatus = true;
  });

  builder.addCase(getMfaStatus.fulfilled, (state, action) => {
    state.fetchingMfaStatus = false;
    state.mfaStatusFetched = true;
    state.mfaEnabled = action.payload.mfaEnabled;
    state.availableMethods = action.payload.availableMethods;
  });

  builder.addCase(getMfaStatus.rejected, (state, action) => {
    state.fetchingMfaStatus = false;
    state.mfaStatusFetched = false;
    state.fetchMfaStatusErrorMessage =
      action.payload?.message ?? "Unable to fetch MFA status";
  });
};
