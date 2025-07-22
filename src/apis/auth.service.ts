import {
  CurrentSessionRes,
  LoginUserBody,
  LoginUserRes,
  LogoutRes,
  RegisterUserBody,
  RegisterUserRes,
  VerifyEmailBody,
  VerifyEmailRes,
  SendOtpRes,
  GetProfileRes,
  ForgotPasswordBody,
  ForgotPasswordRes,
  ResetPasswordBody,
  ResetPasswordRes,
  DeleteAccountRes,
  CreateAdminBody,
  CreateAdminRes,
  GetUsersRes,
  GoogleLoginBody,
  GoogleLoginRes,
  ChangePasswordBody,
  ChangePasswordRes,
  SetupPasswordBody,
  SetupPasswordRes,
  UpdateProfileBody,
  UpdateProfileRes,
  UpdateAddressRes,
  UpdateAddressBody,
  UpdateBusinessBasicInfoBody,
  UpdateBusinessInfoRes,
  UpdateBusinessContactInfoBody,
  OnboardBusinessBody,
  OnboardBusinessRes,
  UserAnalyticsRes,
  AdminAnalyticsRes,
  SuspendUserBody,
  SuspendUserRes,
  LiftUserSuspensionRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { AUTH_URLS } from "./endpoints";
import axios from "axios";

export class AuthApiService {
  private static instance: AuthApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof AUTH_URLS = AUTH_URLS;

  constructor() {
    this.apiService = new ApiService("auth");
  }

  static getInstance(): AuthApiService {
    if (!this.instance) {
      this.instance = new AuthApiService();
    }
    return this.instance;
  }

  getCurrentSession = () => {
    return this.apiService.get<CurrentSessionRes>(this.urls.CURRENT_SESSION);
  };

  getProfile = () => {
    return this.apiService.get<GetProfileRes>(this.urls.GET_PROFILE);
  };

  logout = () => {
    return this.apiService.post<null, LogoutRes>(this.urls.LOGOUT);
  };

  loginUser = (data: LoginUserBody) => {
    return this.apiService.post<LoginUserBody, LoginUserRes>(
      this.urls.LOGIN_USER,
      data
    );
  };

  registerUser = (data: RegisterUserBody) => {
    return this.apiService.post<RegisterUserBody, RegisterUserRes>(
      this.urls.REGISTER_USER,
      data
    );
  };

  googleAuth = (data: GoogleLoginBody) => {
    return this.apiService.post<GoogleLoginBody, GoogleLoginRes>(
      this.urls.USER_GOOGLE_AUTH,
      data
    );
  };

  verifyEmail = (data: VerifyEmailBody) => {
    return this.apiService.post<VerifyEmailBody, VerifyEmailRes>(
      this.urls.USER_VERIFY_EMAIL,
      data
    );
  };

  sendVerificationCode = () => {
    return this.apiService.get<SendOtpRes>(this.urls.USER_SEND_OTP);
  };

  /**
   * Check if user account exist and tries to email a reset token
   * @param data
   * @returns {Promise<ForgotPasswordRes>}
   */
  userForgotPassword = (
    data: ForgotPasswordBody
  ): Promise<ForgotPasswordRes> => {
    return this.apiService.post<ForgotPasswordBody, ForgotPasswordRes>(
      this.urls.USER_FORGOT_PASSWORD,
      data
    );
  };

  /**
   * Reset user password
   * @param data
   * @returns {Promise<ResetPasswordRes>}
   */
  resetUserPassword = (data: ResetPasswordBody): Promise<ResetPasswordRes> => {
    return this.apiService.update<ResetPasswordBody, ResetPasswordRes>(
      this.urls.USER_RESET_PASSWORD,
      data
    );
  };

  /**
   * Change user password
   * @param data
   * @returns {Promise<ChangePasswordRes>}
   */
  changePassword = (data: ChangePasswordBody): Promise<ChangePasswordRes> => {
    return this.apiService.update<ChangePasswordBody, ChangePasswordRes>(
      this.urls.CHANGE_PASSWORD,
      data
    );
  };

  /**
   * Setup password for users without password
   * @params data
   * @returns {Promise<SetupPasswordRes>}
   */
  setupPassword = (data: SetupPasswordBody): Promise<SetupPasswordRes> => {
    return this.apiService.post<SetupPasswordBody, SetupPasswordRes>(
      this.urls.SETUP_PASSWORD,
      data
    );
  };

  /**
   * Delete user's account from blacksight
   * @returns {Promise<DeleteAccountRes>}
   */
  deleteUserAccount = (): Promise<DeleteAccountRes> => {
    return this.apiService.delete<DeleteAccountRes>(
      this.urls.USER_DELETE_ACCOUNT
    );
  };

  /**
   * Update user profile
   * @returns {Promise<UpdateProfileRes>}
   */
  updateProfile = (data: UpdateProfileBody): Promise<UpdateProfileRes> => {
    return this.apiService.update<UpdateProfileBody, UpdateProfileRes>(
      this.urls.USER_UPDATE_PROFILE,
      data
    );
  };

  /**
   * Update user adddress
   * @returns {Promise<UpdateAddressRes>}
   */
  updateAddress = (data: UpdateAddressBody): Promise<UpdateAddressRes> => {
    return this.apiService.update<UpdateAddressBody, UpdateAddressRes>(
      this.urls.USER_UPDATE_ADDRESS,
      data
    );
  };

  /**
   * Update primary business information
   * @param data
   * @returns {Promise<UpdateBusinessInfoRes>}
   */
  updateBusinessBasicInfo = (
    data: UpdateBusinessBasicInfoBody
  ): Promise<UpdateBusinessInfoRes> => {
    return this.apiService.update<
      UpdateBusinessBasicInfoBody,
      UpdateBusinessInfoRes
    >(this.urls.USER_UPDATE_BUSINESS_BASIC_INFO, data);
  };

  /**
   * Update business's contact info
   * @param data
   * @returns {Promise<UpdateBusinessInfoRes>}
   */
  updateBusinessContactInfo = (
    data: UpdateBusinessContactInfoBody
  ): Promise<UpdateBusinessInfoRes> => {
    return this.apiService.update<
      UpdateBusinessContactInfoBody,
      UpdateBusinessInfoRes
    >(this.urls.USER_UPDATE_BUSINESS_CONTACT_INFO, data);
  };

  onboardBusiness = (
    data: OnboardBusinessBody
  ): Promise<OnboardBusinessRes> => {
    return this.apiService.post<OnboardBusinessBody, OnboardBusinessRes>(
      this.urls.USER_ONBOARD_BUSINESS,
      data
    );
  };

  skipOnboarding = () => {
    return this.apiService.post<null, null>(this.urls.USER_SKIP_ONBOARDING);
  };

  /**
   * Login as an admin
   * @param data
   * @returns {Promise<LoginUserRes>}
   */
  loginAdmin = (data: LoginUserBody): Promise<LoginUserRes> => {
    return this.apiService.post<LoginUserBody, LoginUserRes>(
      this.urls.LOGIN_ADMIN,
      data
    );
  };

  /**
   * Create as admin.
   * @description Requires super admin access
   * @param data
   * @returns {Promise<CreateAdminRes>}
   */
  createAdmin = (data: CreateAdminBody): Promise<CreateAdminRes> => {
    return this.apiService.post<CreateAdminBody, CreateAdminRes>(
      this.urls.CREATE_ADMIN,
      data
    );
  };

  /**
   * Get records of users in the database
   * @params params
   * @returns {Promise<GetUsersRes>}
   */
  getUsers = (params?: {}): Promise<GetUsersRes> => {
    return this.apiService.get<GetUsersRes>(this.urls.GET_USERS, params);
  };

  /**
   * Get records of admins in the database.
   * @description Requires super admin access
   * @params params
   * @returns {Promise<GetUsersRes>}
   */
  getAdmins = (params?: {}): Promise<GetUsersRes> => {
    return this.apiService.get<GetUsersRes>(this.urls.GET_ADMINS, params);
  };

  /**
   * Get users analytics
   * @description Requires admin access
   * @returns {Promise<UserAnalyticsRes>}
   */
  getUserAnalytics = (): Promise<UserAnalyticsRes> => {
    return this.apiService.get<UserAnalyticsRes>(this.urls.GET_USER_ANALYTICS);
  };

  /**
   * Get admins analytics
   * @description Requires admin access
   * @returns {Promise<AdminAnalyticsRes>}
   */
  getAdminAnalytics = (): Promise<AdminAnalyticsRes> => {
    return this.apiService.get<AdminAnalyticsRes>(
      this.urls.GET_ADMIN_ANALYTICS
    );
  };

  /**
   * Check if admin account exist and tries to email a reset token
   * @param data
   * @returns {Promise<ForgotPasswordRes>}
   */
  adminForgotPassword = (
    data: ForgotPasswordBody
  ): Promise<ForgotPasswordRes> => {
    return this.apiService.post<ForgotPasswordBody, ForgotPasswordRes>(
      this.urls.ADMIN_FORGOT_PASSWORD,
      data
    );
  };

  /**
   * Reset admin password
   * @param data
   * @returns {Promise<ResetPasswordRes>}
   */
  resetAdminPassword = (data: ResetPasswordBody): Promise<ResetPasswordRes> => {
    return this.apiService.update<ResetPasswordBody, ResetPasswordRes>(
      this.urls.ADMIN_RESET_PASSWORD,
      data
    );
  };

  /**
   * Get user info from google access token
   * @param access_token
   * @returns
   */
  getOAuthData = (access_token: string) => {
    return axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  };

  /**
   * Suspend a user's account
   * @param data The reason for suspension and the user id
   * @param userId The unique identifier of the user to be suspended
   * @returns {Promise<SuspendUserRes>}
   */
  suspendUser = (
    userId: string,
    data: SuspendUserBody
  ): Promise<SuspendUserRes> => {
    return this.apiService.post(`${this.urls.SUSPEND_USER}/${userId}`, data);
  };

  /**
   * Lift the suspension on a user
   * @param userId The unique identifier of the user to be suspended
   * @returns {Promise<LiftUserSuspensionRes>}
   */
  liftUserSuspension = (userId: string): Promise<LiftUserSuspensionRes> => {
    return this.apiService.post(`${this.urls.LIFT_USER_SUSPENSION}/${userId}`);
  };
}
