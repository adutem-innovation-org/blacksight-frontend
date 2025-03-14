import { AuthState } from "@/interfaces";
import { forgotPassword } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const forgotPasswordBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(forgotPassword.pending, (state) => {
    state.sendingRecoveryOtp = true;
  });

  builder.addCase(forgotPassword.fulfilled, (state) => {
    state.sendingRecoveryOtp = false;
    state.recoveryOtpSent = true;
  });

  builder.addCase(forgotPassword.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.sendingRecoveryOtp = false;
    state.recoveryOtpSent = false;
    state.sendRecoveryOtpErrors = error.errors;
    state.sendRecoveryOtpErrorMessage = error.message;
  });
};
