import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKeyApiService } from "@/apis";
import { ApiKey } from "@/interfaces";

const apiKeyApiService = ApiKeyApiService.getInstance();

export const getApiKey = createAsyncThunk<
  ApiKey | {},
  void,
  { rejectValue: string }
>("get_api_key", async (_: void, { rejectWithValue }) => {
  try {
    const result = await apiKeyApiService.getApiKey();
    return result.apiKey;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createApiKey = createAsyncThunk<
  ApiKey,
  void,
  { rejectValue: string }
>("create_api_key", async (_: void, { rejectWithValue }) => {
  try {
    const result = await apiKeyApiService.createApiKey();
    return result.apiKey;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deactivateApiKey = createAsyncThunk<
  Omit<ApiKey, "secretKey">,
  string,
  { rejectValue: string }
>("deactivate_api_key", async (id: string, { rejectWithValue }) => {
  try {
    const result = await apiKeyApiService.deactivateApiKey(id);
    return result.apiKey;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const activateApiKey = createAsyncThunk<
  Omit<ApiKey, "secretKey">,
  string,
  { rejectValue: string }
>("activate_api_key", async (id: string, { rejectWithValue }) => {
  try {
    const result = await apiKeyApiService.activateApiKey(id);
    return result.apiKey;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const regenerateApiKey = createAsyncThunk<
  ApiKey,
  string,
  { rejectValue: string }
>("regenerate_api_key", async (id: string, { rejectWithValue }) => {
  try {
    const result = await apiKeyApiService.regenerateApiKey(id);
    return result.apiKey;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
