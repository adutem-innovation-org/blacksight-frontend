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

export const resetGetProfileReducer = (state: AuthState) => {
  state.fetchingProfile = false;
  state.profileFetched = false;
};

export const resetUpdatePasswordReducer = (state: AuthState) => {
  state.changingPassword = false;
  state.passwordChanged = false;
  state.changePasswordErrorMessage = "";
  state.changePasswordErrors = {};
};

export const resetUpdateProfileReducer = (state: AuthState) => {
  state.updatingProfile = false;
  state.profileUpdated = false;
  state.updateProfileErrorMessage = "";
  state.updateProfileErrors = {};
};

export const resetUpdateAddressReducer = (state: AuthState) => {
  state.updatingAddress = false;
  state.addressUpdated = false;
  state.updateAddressErrorMessage = "";
  state.updateAddressErrors = {};
};

export const resetUpdateBusinessBasicInfoReducer = (state: AuthState) => {
  state.updatingBusinessBasicInfo = false;
  state.businessBasicInfoUpdated = false;
  state.updateBusinessBasicInfoErrors = {};
  state.updateBusinessBasicInfoErrorMessage = "";
};

export const resetUpdateBusinessContactInfoReducer = (state: AuthState) => {
  state.updatingBusinessContactInfo = false;
  state.businessContactInfoUpdated = false;
  state.updateBusinessContactInfoErrors = {};
  state.updateBusinessContactInfoErrorMessage = "";
};

export const resetOnboardUserReducder = (state: AuthState) => {
  state.onboarding = false;
  state.onboarded = false;
  state.onboardingErrors = {};
  state.onboardingErrorMessage = "";
};
