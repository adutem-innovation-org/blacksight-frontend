import { AppointmentApiService } from "@/apis";
import { Appointment, UpdateAppointmentStatusBody } from "@/interfaces";
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

export const updateAppointmentStatus = createAsyncThunk<
  Appointment,
  { id: string; data: UpdateAppointmentStatusBody },
  { rejectValue: { message: string; errors?: Record<string, string> } }
>("update_appointment_status", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await appointmentApiService.updateAppointmentStatus(id, data);
    return res.appointment;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deleteAppointment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("delete_appointment", async (id: string, { rejectWithValue }) => {
  try {
    const res = await appointmentApiService.deleteAppointment(id);
    return res.appointment._id;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});
