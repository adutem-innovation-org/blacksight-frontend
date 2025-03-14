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
};
