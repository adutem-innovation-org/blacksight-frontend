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
};
