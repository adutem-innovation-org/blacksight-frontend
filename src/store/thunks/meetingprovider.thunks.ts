import { MeetingProviderApiService } from "@/apis";
import { MeetingProvidersEnum } from "@/enums";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "./auth.thunks";

const meetingProviderApiService = MeetingProviderApiService.getInstance();

export const getProviderAuthUrl = createAsyncThunk(
  "get_provider_auth_url",
  async (provider: MeetingProvidersEnum, thunkAPI) => {
    try {
      const data = await meetingProviderApiService.getProviderAuthUrl(provider);
      return data.url;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const disconnectProvider = createAsyncThunk(
  "disconnect_provider",
  async (provider: MeetingProvidersEnum, { dispatch, rejectWithValue }) => {
    try {
      await meetingProviderApiService.disconnectProvider(provider);
      dispatch(getConnectedProviders());
      dispatch(getProfile());
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const getConnectedProviders = createAsyncThunk(
  "get_connected_providers",
  async (_: void, thunkAPI) => {
    try {
      const data = await meetingProviderApiService.getConnectedProviders();
      return data.providers;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);
