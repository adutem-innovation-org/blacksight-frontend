import { ReminderApiService } from "@/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

const reminderApiService = ReminderApiService.getInstance();

export const getReminderAnalytics = createAsyncThunk(
  "get_reminder_analytics",
  async (_: void, thunkAPI) => {
    try {
      const data = await reminderApiService.getReminderAnalytics();
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const getAllReminders = createAsyncThunk(
  "get_all_reminders",
  async (_: void, thunkAPI) => {
    try {
      const { data, meta } = await reminderApiService.getReminders();
      return { data, meta };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const createReminder = createAsyncThunk(
  "create_reminder",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await reminderApiService.createReminder(data);
      return response.reminder;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);
