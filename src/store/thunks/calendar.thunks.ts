import { CalendarApiService } from "@/apis";
import { CalendarProvidersEnum } from "@/enums";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "./auth.thunks";
import { ApiSuccessResponse, ConnectCalcomBody } from "@/interfaces";

const calendarApiService = CalendarApiService.getInstance();

export const getProviderAuthUrl = createAsyncThunk(
  "get_provider_auth_url",
  async (provider: CalendarProvidersEnum, thunkAPI) => {
    try {
      const data = await calendarApiService.getProviderAuthUrl(provider);
      return data.url;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const connectCalcom = createAsyncThunk<
  ApiSuccessResponse,
  ConnectCalcomBody,
  { rejectValue: { message: string; errors?: Record<string, string> } }
>("connect_calcom", async (data: ConnectCalcomBody, { rejectWithValue }) => {
  try {
    const resp = await calendarApiService.connectCalcom(data);
    return resp;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const disconnectProvider = createAsyncThunk(
  "disconnect_provider",
  async (provider: CalendarProvidersEnum, { dispatch, rejectWithValue }) => {
    try {
      await calendarApiService.disconnectProvider(provider);
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
      const data = await calendarApiService.getConnectedProviders();
      return data.providers;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);
