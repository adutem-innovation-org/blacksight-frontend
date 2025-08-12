import { ReminderApiService } from "@/apis";
import {
  CreateReminderRes,
  Reminder,
  SendInstantReminderBody,
} from "@/interfaces";
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
      const { data, ...rest } = await reminderApiService.getReminders();
      return { data, meta: rest.meta || rest.pagination };
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

export const updateReminder = createAsyncThunk<
  Reminder,
  { id: string; data: FormData },
  { rejectValue: { message: string; errors?: Record<string, string> } }
>(
  "update_reminder",
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await reminderApiService.updateReminder(id, data);
      return response.reminder;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateReminderStatus = createAsyncThunk<
  Reminder,
  { id: string; status: boolean },
  { rejectValue: string }
>(
  "update_reminder_status",
  async (
    { id, status }: { id: string; status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const updateApi = status
        ? reminderApiService.activateReminder
        : reminderApiService.deactivateReminder;
      const response = await updateApi(id);
      return response.reminder;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReminder = createAsyncThunk<
  Reminder,
  string,
  { rejectValue: string }
>("delete_reminder", async (id: string, { rejectWithValue }) => {
  try {
    const res = await reminderApiService.deleteReminder(id);
    return res.reminder;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const sendInstantReminder = createAsyncThunk<
  CreateReminderRes["reminder"],
  SendInstantReminderBody,
  { rejectValue: { message: string; errors?: Record<string, string> | null } }
>("send_instant_reminder", async (data, { rejectWithValue }) => {
  try {
    const response = await reminderApiService.sendInstantReminder(data);
    return response.reminder;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
