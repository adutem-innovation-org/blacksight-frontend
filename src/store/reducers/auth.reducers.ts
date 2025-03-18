import { AuthState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const resetSignInUserReducer = (state: AuthState) => {
  state.isSignedIn = false;
  state.signingIn = false;
  state.signInErrors = {};
  state.signInErrorMessage = "";
};

export const resetSignUpUserReducer = (state: AuthState) => {
  state.isSignedUp = false;
  state.signingUp = false;
  state.signUpErrors = {};
  state.signUpErrorMessage = "";
};

export const resetVerifyEmailReducer = (state: AuthState) => {
  state.verifyingEmail = false;
  state.emailVerified = false;
  state.verifyEmailErrors = {};
  state.verifyEmailErrorMessage = "";
};

export const resetsendOtpReducer = (state: AuthState) => {
  state.sendingOtp = false;
  state.otpSent = false;
  state.sendOtpErrors = {};
  state.sendOtpErrorMessage = "";
};

export const resetForgotPasswordReducer = (state: AuthState) => {
  state.sendingRecoveryOtp = false;
  state.recoveryOtpSent = false;
  state.sendRecoveryOtpErrors = {};
  state.sendRecoveryOtpErrorMessage = "";
};

export const resetPasswordResetReducer = (state: AuthState) => {
  state.resettingPassword = false;
  state.passwordReset = false;
  state.resetPasswordErrors = {};
  state.resetPasswordErrorMessage = "";
};

export const resetContinueWithGoogleReducer = (state: AuthState) => {
  state.authenticatingWithGoogle = false;
  state.googleAuthSuccess = false;
  state.googleAuthErrors = {};
  state.googleAuthErrorMessage = "";
};

export const changeGapiStateReducer = (
  state: AuthState,
  action: PayloadAction<boolean>
) => {
  state.gapiReady = action.payload;
};
