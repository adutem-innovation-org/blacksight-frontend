import { AuthState } from "@/interfaces";
import { sendOtp } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const sendOtpBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(sendOtp.pending, (state) => {
    state.sendingOtp = true;
    state.otpSent = false;
  });

  builder.addCase(sendOtp.fulfilled, (state) => {
    state.sendingOtp = false;
    state.otpSent = true;
  });

  builder.addCase(sendOtp.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.sendingOtp = false;
    state.otpSent = false;
    state.sendOtpErrors = error.errors;
    state.sendOtpErrorMessage = error.message;
  });
};
