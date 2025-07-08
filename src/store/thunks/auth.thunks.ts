import { AuthApiService } from "@/apis";
import { ApiService } from "@/apis/api.service";
import { UserTypes } from "@/enums";
import { clearSession, saveSession } from "@/helpers";
import {
  AdminAuthAnalytics,
  AdminUserAnalytics,
  Business,
  ChangePasswordBody,
  ForgotPasswordBody,
  GetAdminsRes,
  GetUsersRes,
  GoogleLoginBody,
  LoginUserBody,
  OnboardBusinessBody,
  RegisterUserBody,
  ResetPasswordBody,
  SetupPasswordBody,
  SuspendUserBody,
  UpdateAddressBody,
  UpdateBusinessBasicInfoBody,
  UpdateBusinessContactInfoBody,
  UpdateProfileBody,
  UserData,
  VerifyEmailBody,
} from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

const authApiService = AuthApiService.getInstance();

export const signInUser = createAsyncThunk(
  "signin",
  async (data: { userType: UserTypes; body: LoginUserBody }, thunkAPI) => {
    try {
      const signInApi =
        data.userType === UserTypes.ADMIN
          ? authApiService.loginAdmin
          : authApiService.loginUser;
      const response = await signInApi(data.body);
      ApiService.setAuthorization(response.token);
      saveSession(response.token, response.user);
      return { message: "Successful" };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const signUpUser = createAsyncThunk(
  "signup",
  async (data: RegisterUserBody, thunkAPI) => {
    try {
      const response = await authApiService.registerUser(data);
      ApiService.setAuthorization(response.token);
      saveSession(response.token, response.user);
      return { message: "Successful" };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "verify_email",
  async (data: VerifyEmailBody, thunkAPI) => {
    try {
      const response = await authApiService.verifyEmail(data);
      if (response.success) {
        return { message: "Account verified" };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const sendOtp = createAsyncThunk(
  "send_otp",
  async (_: void, thunkAPI) => {
    try {
      return await authApiService.sendVerificationCode();
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgot_password",
  async (data: { userType: UserTypes; body: ForgotPasswordBody }, thunkAPI) => {
    try {
      const forgotPasswordApi =
        data.userType === UserTypes.ADMIN
          ? authApiService.adminForgotPassword
          : authApiService.userForgotPassword;
      return await forgotPasswordApi(data.body);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "reset_password",
  async (data: { userTypes: UserTypes; body: ResetPasswordBody }, thunkAPI) => {
    try {
      const resetPasswordApi =
        data.userTypes === UserTypes.ADMIN
          ? authApiService.resetAdminPassword
          : authApiService.resetUserPassword;
      return await resetPasswordApi(data.body);
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const changePassword = createAsyncThunk(
  "change_password",
  async (body: ChangePasswordBody, { rejectWithValue }) => {
    try {
      await authApiService.changePassword(body);
      return true;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  }
);

export const setupPassword = createAsyncThunk(
  "setup_password",
  async (body: SetupPasswordBody, { rejectWithValue }) => {
    try {
      await authApiService.setupPassword(body);
      return true;
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  }
);

export const updateProfile = createAsyncThunk<
  undefined,
  UpdateProfileBody,
  { rejectValue: { errors?: Record<string, string>; message: string } }
>("update_profile", async (body: UpdateProfileBody, { rejectWithValue }) => {
  try {
    const res = await authApiService.updateProfile(body);
    sessionStorage.setItem("blacksight_auth_user", JSON.stringify(res.user));
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateAddress = createAsyncThunk<
  undefined,
  UpdateAddressBody,
  { rejectValue: { errors?: Record<string, string>; message: string } }
>("update_address", async (body: UpdateAddressBody, { rejectWithValue }) => {
  try {
    const res = await authApiService.updateAddress(body);
    sessionStorage.setItem("blacksight_auth_user", JSON.stringify(res.user));
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateBusinessBasicInfo = createAsyncThunk<
  Business,
  UpdateBusinessBasicInfoBody,
  { rejectValue: { errors?: Record<string, string>; message: string } }
>(
  "update_business_basic_info",
  async (body: UpdateBusinessBasicInfoBody, { rejectWithValue }) => {
    try {
      return (await authApiService.updateBusinessBasicInfo(body)).business;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateBusinessContactInfo = createAsyncThunk<
  Business,
  UpdateBusinessContactInfoBody,
  { rejectValue: { errors?: Record<string, string>; message: string } }
>(
  "update_business_contact_iinfo",
  async (body: UpdateBusinessContactInfoBody, { rejectWithValue }) => {
    try {
      return (await authApiService.updateBusinessContactInfo(body)).business;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const continueWithGoogle = createAsyncThunk(
  "continue_with_google",
  async (data: GoogleLoginBody, thunkAPI) => {
    try {
      const response = await authApiService.googleAuth(data);
      ApiService.setAuthorization(response.token);
      saveSession(response.token, response.user);
      return { message: "Successful" };
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const logout = createAsyncThunk("logout", (_: void, thunkAPI) => {
  try {
    clearSession();
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getProfile = createAsyncThunk(
  "get_profile",
  async (_: void, thunkAPI) => {
    try {
      const data = await authApiService.getProfile();
      sessionStorage.setItem("blacksight_auth_user", JSON.stringify(data.user));
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const onboardUser = createAsyncThunk<
  Business,
  OnboardBusinessBody,
  { rejectValue: { errors?: Record<string, string>; message: string } }
>("onboard_user", async (body: OnboardBusinessBody, { rejectWithValue }) => {
  try {
    return (await authApiService.onboardBusiness(body)).business;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const getUsers = createAsyncThunk<
  GetUsersRes,
  void,
  { rejectValue: { message: string } }
>("get_users", async (_: void, { rejectWithValue }) => {
  try {
    const res = await authApiService.getUsers();
    return res;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const getAdmins = createAsyncThunk<
  GetAdminsRes,
  void,
  { rejectValue: { message: string } }
>("get_admins", async (_: void, { rejectWithValue }) => {
  try {
    const res = await authApiService.getAdmins();
    return res;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const getAdminUserAnalytics = createAsyncThunk<
  AdminUserAnalytics,
  void,
  { rejectValue: { message: string } }
>("get_admin_user_analytics", async (_: void, { rejectWithValue }) => {
  try {
    const res = await authApiService.getUserAnalytics();
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const getAdminAnalytics = createAsyncThunk<
  AdminAuthAnalytics,
  void,
  { rejectValue: { message: string } }
>("get_admin_auth_analytics", async (_: void, { rejectWithValue }) => {
  try {
    const res = await authApiService.getAdminAnalytics();
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const suspendUser = createAsyncThunk<
  UserData,
  { userId: string; data: SuspendUserBody },
  { rejectValue: { message: string; errors?: Record<string, string> } }
>("suspend_user", async ({ userId, data }, { rejectWithValue }) => {
  try {
    const res = await authApiService.suspendUser(userId, data);
    return res.user;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const liftUserSuspension = createAsyncThunk<
  UserData,
  string,
  { rejectValue: { message: string } }
>("lift_user_suspension", async (userId, { rejectWithValue }) => {
  try {
    const res = await authApiService.liftUserSuspension(userId);
    return res.user;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
