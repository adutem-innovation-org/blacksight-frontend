import { AuthState } from "@/interfaces";

export const initialAuthState: AuthState = {
  signingIn: false,
  isSignedIn: false,
  signInErrors: {},
  signInErrorMessage: "",

  // Sign up
  signingUp: false,
  isSignedUp: false,
  signUpErrors: {},
  signUpErrorMessage: "",

  // Verify email
  verifyingEmail: false,
  emailVerified: false,
  verifyEmailErrors: {},
  verifyEmailErrorMessage: "",

  // Send verification code
  sendingOtp: false,
  otpSent: true,
  sendOtpErrors: {},
  sendOtpErrorMessage: "",

  // Forgot Password
  sendingRecoveryOtp: false,
  recoveryOtpSent: false,
  sendRecoveryOtpErrors: {},
  sendRecoveryOtpErrorMessage: "",

  // Reset password
  resettingPassword: false,
  passwordReset: false,
  resetPasswordErrors: {},
  resetPasswordErrorMessage: "",

  // Change password & Setup password
  changingPassword: false,
  passwordChanged: false,
  changePasswordErrors: {},
  changePasswordErrorMessage: "",

  // Update profile
  updatingProfile: false,
  profileUpdated: false,
  updateProfileErrors: {},
  updateProfileErrorMessage: "",

  // Update address
  updatingAddress: false,
  addressUpdated: false,
  updateAddressErrors: {},
  updateAddressErrorMessage: "",

  // Update business basic info
  updatingBusinessBasicInfo: false,
  businessBasicInfoUpdated: false,
  updateBusinessBasicInfoErrors: {},
  updateBusinessBasicInfoErrorMessage: "",

  // Update business contact info
  updatingBusinessContactInfo: false,
  businessContactInfoUpdated: false,
  updateBusinessContactInfoErrors: {},
  updateBusinessContactInfoErrorMessage: "",

  // Google Auth
  authenticatingWithGoogle: false,
  googleAuthSuccess: false,
  googleAuthErrors: {},
  googleAuthErrorMessage: "",
  gapiReady: false,

  // Get Profile
  fetchingProfile: false,
  profileFetched: false,

  // Onboard business
  onboarding: false,
  onboarded: false,
  onboardingErrors: {},
  onboardingErrorMessage: "",

  // Get users
  fetchingAllUsers: false,
  allUserFetched: false,
  fetchAllUsersErrorMessage: "",
  users: null,
  usersMeta: null,

  // Get Admins
  fetchingAllAdmins: false,
  allAdminsFetched: false,
  fetchAllAdminsErrorMessage: "",
  admins: null,
  adminsMeta: null,

  // Get user analytics
  fetchingUserAnalytics: false,
  userAnalyticsFetched: false,
  fetchUserAnalyticsErrorMessage: "",
  userAnalytics: null,

  // Get admin analytics
  fetchingAdminAnalytics: false,
  adminAnalyticsFetched: false,
  fetchAdminAnalyticsErrorMessage: "",
  adminAnalytics: null,

  // Suspend user
  suspendingUser: false,
  userSuspended: false,
  suspendUserErrors: {},
  suspendUserErrorMessage: "",

  // Lift user suspension
  liftingUserSuspension: false,
  userSuspensionLifted: false,
  liftUserSuspensionErrorMessage: "",
};
