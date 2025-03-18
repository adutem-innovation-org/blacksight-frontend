import { AuthApiService } from "@/apis";
import { ApiService } from "@/apis/api.service";
import { UserTypes } from "@/enums";
import { saveSession } from "@/helpers";
import {
  ForgotPasswordBody,
  GoogleLoginBody,
  LoginUserBody,
  RegisterUserBody,
  ResetPasswordBody,
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
