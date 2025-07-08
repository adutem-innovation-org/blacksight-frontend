import { PaginationMetaData } from "@/interfaces/pagination";
import { PaginatedUserData, UserData } from "./user";
import { AdminUserAnalytics } from "../api";

export type AuthState = {
  signingIn: boolean;
  isSignedIn: boolean;
  signInErrors: Record<string, string>;
  signInErrorMessage: string;

  // Sign up states
  signingUp: boolean;
  isSignedUp: boolean;
  signUpErrors: Record<string, string>;
  signUpErrorMessage: string;

  // Verify email states
  verifyingEmail: boolean;
  emailVerified: boolean;
  verifyEmailErrors: Record<string, string>;
  verifyEmailErrorMessage: string;

  // Send verification code
  sendingOtp: boolean;
  otpSent: boolean;
  sendOtpErrors: Record<string, string>;
  sendOtpErrorMessage: string;

  // Forgot Password
  sendingRecoveryOtp: boolean;
  recoveryOtpSent: boolean;
  sendRecoveryOtpErrors: Record<string, string>;
  sendRecoveryOtpErrorMessage: string;

  // Reset Password
  resettingPassword: boolean;
  passwordReset: boolean;
  resetPasswordErrors: Record<string, string>;
  resetPasswordErrorMessage: string;

  // Change password & setup password
  changingPassword: boolean;
  passwordChanged: boolean;
  changePasswordErrors: Record<string, string>;
  changePasswordErrorMessage: string;

  // Update profile
  updatingProfile: boolean;
  profileUpdated: boolean;
  updateProfileErrors: Record<string, string>;
  updateProfileErrorMessage: string;

  // Update address
  updatingAddress: boolean;
  addressUpdated: boolean;
  updateAddressErrors: Record<string, string>;
  updateAddressErrorMessage: string;

  // Update business basic info
  updatingBusinessBasicInfo: boolean;
  businessBasicInfoUpdated: boolean;
  updateBusinessBasicInfoErrors: Record<string, string>;
  updateBusinessBasicInfoErrorMessage: string;

  // Update business contact info
  updatingBusinessContactInfo: boolean;
  businessContactInfoUpdated: boolean;
  updateBusinessContactInfoErrors: Record<string, string>;
  updateBusinessContactInfoErrorMessage: string;

  // Google login
  authenticatingWithGoogle: boolean;
  googleAuthSuccess: boolean;
  googleAuthErrors: Record<string, string>;
  googleAuthErrorMessage: string;
  gapiReady: boolean;

  // Get Profile
  fetchingProfile: boolean;
  profileFetched: boolean;

  // Onboard business
  onboarding: boolean;
  onboarded: boolean;
  onboardingErrors: Record<string, string>;
  onboardingErrorMessage: string;

  // Get users
  fetchingAllUsers: boolean;
  allUserFetched: boolean;
  fetchAllUsersErrorMessage: string;
  users: PaginatedUserData[] | null;
  usersMeta: PaginationMetaData | null;

  // Get Admins
  fetchingAllAdmins: boolean;
  allAdminsFetched: boolean;
  fetchAllAdminsErrorMessage: string;
  admins: PaginatedUserData[] | null;
  adminsMeta: PaginationMetaData | null;

  // Get user analytics
  fetchingUserAnalytics: boolean;
  userAnalyticsFetched: boolean;
  fetchUserAnalyticsErrorMessage: string;
  userAnalytics: Record<string, number> | null;

  // Get admin analytics
  fetchingAdminAnalytics: boolean;
  adminAnalyticsFetched: boolean;
  fetchAdminAnalyticsErrorMessage: string;
  adminAnalytics: Record<string, number> | null;

  // Suspend user
  suspendingUser: boolean;
  userSuspended: boolean;
  suspendUserErrors: Record<string, string>;
  suspendUserErrorMessage: string;

  // Lift user suspension
  liftingUserSuspension: boolean;
  userSuspensionLifted: boolean;
  liftUserSuspensionErrorMessage: string;

  // Create admin
  creatingAdmin: boolean;
  adminCreated: boolean;
  createAdminErrors: Record<string, string>;
  createAdminErrorMessage: string;
};
