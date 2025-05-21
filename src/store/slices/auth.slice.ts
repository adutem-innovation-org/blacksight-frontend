import { initialAuthState } from "@/constants/store";
import { createSlice } from "@reduxjs/toolkit";
import {
  changePasswordBuilder,
  continueWithGoogleBuilder,
  forgotPasswordBuilder,
  getProfileBuilder,
  resetPasswordBuilder,
  sendOtpBuilder,
  setupPasswordBuilder,
  signInUserBuilder,
  signUpUserBuilder,
  verifyEmailBuilder,
} from "../builders";
import {
  changeGapiStateReducer,
  resetContinueWithGoogleReducer,
  resetForgotPasswordReducer,
  resetGetProfileReducer,
  resetPasswordResetReducer,
  resetsendOtpReducer,
  resetSignInUserReducer,
  resetSignUpUserReducer,
  resetUpdatePasswordReducer,
  resetVerifyEmailReducer,
} from "../reducers";

const authSlice = createSlice({
  name: "Auth",
  reducers: {
    resetSignInUser: resetSignInUserReducer,
    resetSignUpUser: resetSignUpUserReducer,
    resetVerifyEmail: resetVerifyEmailReducer,
    resetSendOtp: resetsendOtpReducer,
    resetForgotPassword: resetForgotPasswordReducer,
    resetPasswordReset: resetPasswordResetReducer,
    resetContinueWithGoogle: resetContinueWithGoogleReducer,
    changeGapiState: changeGapiStateReducer,
    resetGetProfile: resetGetProfileReducer,
    resetChangePassword: resetUpdatePasswordReducer,
  },
  initialState: initialAuthState,
  extraReducers: (builder) => {
    signInUserBuilder(builder);
    signUpUserBuilder(builder);
    verifyEmailBuilder(builder);
    sendOtpBuilder(builder);
    forgotPasswordBuilder(builder);
    resetPasswordBuilder(builder);
    continueWithGoogleBuilder(builder);
    getProfileBuilder(builder);
    changePasswordBuilder(builder);
    setupPasswordBuilder(builder);
  },
});

export const authReducer = authSlice.reducer;
export const {
  resetSignInUser,
  resetSignUpUser,
  resetVerifyEmail,
  resetSendOtp,
  resetForgotPassword,
  resetPasswordReset,
  resetContinueWithGoogle,
  changeGapiState,
  resetChangePassword,
} = authSlice.actions;
