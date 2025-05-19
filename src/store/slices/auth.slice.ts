import { initialAuthState } from "@/constants/store";
import { createSlice } from "@reduxjs/toolkit";
import {
  continueWithGoogleBuilder,
  forgotPasswordBuilder,
  getProfileBuilder,
  resetPasswordBuilder,
  sendOtpBuilder,
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
} = authSlice.actions;
