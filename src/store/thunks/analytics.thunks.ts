import { AnalyticsApiService } from "@/apis";
import { UserTypes } from "@/enums";
import { createAsyncThunk } from "@reduxjs/toolkit";

const analyticsApiService = AnalyticsApiService.getInstance();

export const getAnalytics = createAsyncThunk(
  "get_analytics",
  async (userType: UserTypes, thunkAPI) => {
    try {
      const analyticsApiHandler =
        userType === UserTypes.USER
          ? analyticsApiService.getBusinessAnalytics
          : analyticsApiService.getAdminAnalytics;
      const data = await analyticsApiHandler();
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
