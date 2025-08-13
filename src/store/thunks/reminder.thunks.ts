import { ReminderApiService } from "@/apis";
import {
  CreateScheduledReminderBody,
  CreateReminderRes,
  Reminder,
  SendInstantReminderBody,
  IReminder,
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
  IReminder,
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
        ? reminderApiService.resumeReminder
        : reminderApiService.pauseReminder;
      const response = await updateApi(id);
      return response.reminder;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelReminder = createAsyncThunk<
  IReminder,
  string,
  { rejectValue: string }
>("cancel_reminder", async (id: string, { rejectWithValue }) => {
  try {
    const res = await reminderApiService.cancelReminder(id);
    return res.reminder;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteReminder = createAsyncThunk<
  IReminder,
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
  { notFile?: boolean; data: SendInstantReminderBody },
  { rejectValue: { message: string; errors?: Record<string, string> | null } }
>(
  "send_instant_reminder",
  async ({ notFile = false, data }, { rejectWithValue }) => {
    try {
      const api = notFile
        ? reminderApiService.sendInstantBCPReminder
        : reminderApiService.sendInstantReminder;
      const response = await api(data);
      return response.reminder;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createScheduledReminder = createAsyncThunk<
  CreateReminderRes["reminder"],
  { notFile?: boolean; data: CreateScheduledReminderBody },
  { rejectValue: { message: string; errors?: Record<string, string> | null } }
>(
  "create_scheduled_reminder",
  async ({ notFile = false, data }, { rejectWithValue }) => {
    try {
      const api = notFile
        ? reminderApiService.createScheduledBCPReminder
        : reminderApiService.createScheduledReminder;
      const response = await api(data);
      return response.reminder;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
