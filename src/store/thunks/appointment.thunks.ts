import { AppointmentApiService } from "@/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

const appointmentApiService = AppointmentApiService.getInstance();

export const getAppointmentAnalytics = createAsyncThunk(
  "get_appointment_analytics",
  async (_: void, thunkAPI) => {
    try {
      const data = await appointmentApiService.getAppointmentAnalytics();
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const getAllAppointments = createAsyncThunk(
  "get_all_appointments",
  async (_: void, thunkAPI) => {
    try {
      const { data, meta } = await appointmentApiService.getAppointments();
      return { data, meta };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);
