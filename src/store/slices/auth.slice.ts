import { initialAuthState } from "@/constants/store";
import { createSlice } from "@reduxjs/toolkit";
import {
  changePasswordBuilder,
  continueWithGoogleBuilder,
  forgotPasswordBuilder,
  getAdminAnalyticsBuilder,
  getAdminsBuilder,
  getAdminUserAnalyticsBuilder,
  getProfileBuilder,
  getUsersBuilder,
  liftUserSuspensionBuilder,
  onboardUserBuilder,
  resetPasswordBuilder,
  sendOtpBuilder,
  setupPasswordBuilder,
  signInUserBuilder,
  signUpUserBuilder,
  suspendUserBuilder,
  updateAddressBuilder,
  updateBusinessBasicInfoBuilder,
  updateBusinessContactInfoBuilder,
  updateProfileBuilder,
  verifyEmailBuilder,
} from "../builders";
import {
  changeGapiStateReducer,
  resetContinueWithGoogleReducer,
  resetForgotPasswordReducer,
  resetGetAdminsReducer,
  resetGetUsersReducer,
  resetGetProfileReducer,
  resetOnboardUserReducder,
  resetPasswordResetReducer,
  resetsendOtpReducer,
  resetSignInUserReducer,
  resetSignUpUserReducer,
  resetUpdateAddressReducer,
  resetUpdateBusinessBasicInfoReducer,
  resetUpdateBusinessContactInfoReducer,
  resetUpdatePasswordReducer,
  resetUpdateProfileReducer,
  resetVerifyEmailReducer,
  resetGetAdminUserAnalyticsReducer,
  resetGetAdminAnalyticsReducer,
  resetSuspendUserReducer,
  resetLiftUserSuspensionReducer,
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
    resetUpdateProfile: resetUpdateProfileReducer,
    resetUpdateAddress: resetUpdateAddressReducer,
    resetUpdateBusinessBasicInfo: resetUpdateBusinessBasicInfoReducer,
    resetUpdateBusinessContactInfo: resetUpdateBusinessContactInfoReducer,
    resetOnboardUser: resetOnboardUserReducder,
    resetGetUsers: resetGetUsersReducer,
    resetGetAdmins: resetGetAdminsReducer,
    resetGetAdminUserAnalytics: resetGetAdminUserAnalyticsReducer,
    resetGetAdminAnalytics: resetGetAdminAnalyticsReducer,
    resetSuspendUser: resetSuspendUserReducer,
    resetLiftUserSuspension: resetLiftUserSuspensionReducer,
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
    updateProfileBuilder(builder);
    updateAddressBuilder(builder);
    updateBusinessBasicInfoBuilder(builder);
    updateBusinessContactInfoBuilder(builder);
    onboardUserBuilder(builder);
    getUsersBuilder(builder);
    getAdminsBuilder(builder);
    getAdminUserAnalyticsBuilder(builder);
    getAdminAnalyticsBuilder(builder);
    suspendUserBuilder(builder);
    liftUserSuspensionBuilder(builder);
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
  resetUpdateAddress,
  resetUpdateProfile,
  resetUpdateBusinessBasicInfo,
  resetUpdateBusinessContactInfo,
  resetOnboardUser,
  resetGetAdmins,
  resetGetUsers,
  resetGetAdminUserAnalytics,
  resetGetAdminAnalytics,
  resetSuspendUser,
  resetLiftUserSuspension,
} = authSlice.actions;
