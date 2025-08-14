import { createSlice } from "@reduxjs/toolkit";
import {
  resetDeleteAppointmentReducer,
  resetGetAllAppointmentsReducer,
  resetGetAppointmentAnalyticsReducer,
  resetUpdateAppointmentStatusReducer,
} from "../reducers";
import { initialAppointmentState } from "@/constants";
import {
  deleteAppointmentBuilder,
  getAllAppointmentsBuilder,
  getAppointmentAnalyticsBuilder,
  updateAppointmentStatusBuilder,
} from "../builders";

const appointmentSlice = createSlice({
  name: "Appointment",
  initialState: initialAppointmentState,
  reducers: {
    resetGetAppointmentAnalytics: resetGetAppointmentAnalyticsReducer,
    resetGetAllAppointments: resetGetAllAppointmentsReducer,
    resetDeleteAppointment: resetDeleteAppointmentReducer,
    resetUpdateAppointmentStatus: resetUpdateAppointmentStatusReducer,
  },
  extraReducers(builder) {
    getAppointmentAnalyticsBuilder(builder);
    getAllAppointmentsBuilder(builder);
    deleteAppointmentBuilder(builder);
    updateAppointmentStatusBuilder(builder);
  },
});

export const appointmentReducer = appointmentSlice.reducer;
export const {
  resetGetAppointmentAnalytics,
  resetGetAllAppointments,
  resetDeleteAppointment,
  resetUpdateAppointmentStatus,
} = appointmentSlice.actions;
