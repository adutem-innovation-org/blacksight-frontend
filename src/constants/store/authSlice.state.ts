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

  // Google Auth
  authenticatingWithGoogle: false,
  googleAuthSuccess: false,
  googleAuthErrors: {},
  googleAuthErrorMessage: "",
  gapiReady: false,
};
