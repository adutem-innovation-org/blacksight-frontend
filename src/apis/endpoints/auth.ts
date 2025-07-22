// Authentication
// General
export const CURRENT_SESSION = "/session";
export const CHANGE_PASSWORD = "/change-password";
export const SETUP_PASSWORD = "/setup-password";
export const GET_PROFILE = "/profile";
export const LOGOUT = "/logout";

// User
export const REGISTER_USER = "/user/register";
export const LOGIN_USER = "/user/login";
export const USER_FORGOT_PASSWORD = "/user/forgot-password";
export const USER_RESET_PASSWORD = "/user/reset-password";
export const USER_SEND_OTP = "/user/send-otp";
export const USER_VERIFY_EMAIL = "/user/verify-email";
export const USER_DELETE_ACCOUNT = "/user/delete";
export const USER_GOOGLE_AUTH = "/google";
export const USER_UPDATE_PROFILE = "/user/update-profile";
export const USER_UPDATE_ADDRESS = "/user/update-address";
export const USER_UPDATE_BUSINESS_BASIC_INFO = "/user/update/business/info";
export const USER_UPDATE_BUSINESS_CONTACT_INFO =
  "/user/update/business/contact/info";
export const USER_ONBOARD_BUSINESS = "/user/business/onboard";
export const USER_SKIP_ONBOARDING = "/user/skip-onboarding";

// Admin
export const LOGIN_ADMIN = "/admin/login";
export const ADMIN_FORGOT_PASSWORD = "/admin/forgot-password";
export const ADMIN_RESET_PASSWORD = "/admin/reset-password";
export const GET_USERS = "/admin/get-users";
export const GET_ADMINS = "/admin/get-admins";
export const CREATE_ADMIN = "/admin/create-admin";
export const GET_USER_ANALYTICS = "/admin/user-analytics";
export const GET_ADMIN_ANALYTICS = "/admin/admin-analytics";
export const SUSPEND_USER = "/admin/suspend/user";
export const LIFT_USER_SUSPENSION = "/admin/lift-suspension/user";
