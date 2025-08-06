import { AuthState } from "@/interfaces";
import { verifyMfaCode } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const verifyMfaCodeBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(verifyMfaCode.pending, (state) => {
    state.verifyingMfaCode = true;
  });

  builder.addCase(verifyMfaCode.fulfilled, (state) => {
    state.verifyingMfaCode = false;
    state.mfaCodeVerified = true;
  });

  builder.addCase(verifyMfaCode.rejected, (state, action) => {
    state.verifyingMfaCode = false;
    state.mfaCodeVerified = false;
    state.verifyMfaCodeErrors = action.payload?.errors ?? {};
    state.verifyMfaCodeErrorMessage =
      action.payload?.message ??
      "Unable to verify verification code. Please try again.";
  });
};
