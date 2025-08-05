import { AuthState } from "@/interfaces";
import { sendMfaCode } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const sendMfaCodeBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(sendMfaCode.pending, (state) => {
    state.sendingMfaCode = true;
  });

  builder.addCase(sendMfaCode.fulfilled, (state) => {
    state.sendingMfaCode = false;
    state.mfaCodeSent = true;
  });

  builder.addCase(sendMfaCode.rejected, (state, action) => {
    state.sendingMfaCode = false;
    state.mfaCodeSent = false;
    state.sendMfaCodeErrors = action.payload?.errors ?? {};
    state.sendMfaCodeErrorMessage =
      action.payload?.message ??
      "Unable to send verification code. Please try again.";
  });
};
