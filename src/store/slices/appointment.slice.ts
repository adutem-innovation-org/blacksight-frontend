import { createSlice } from "@reduxjs/toolkit";
import {
  resetGetAllAppointmentsReducer,
  resetGetAppointmentAnalyticsReducer,
} from "../reducers";
import { initialAppointmentState } from "@/constants";
import {
  getAllAppointmentsBuilder,
  getAppointmentAnalyticsBuilder,
} from "../builders";

const appointmentSlice = createSlice({
  name: "Appointment",
  initialState: initialAppointmentState,
  reducers: {
    resetGetAppointmentAnalytics: resetGetAppointmentAnalyticsReducer,
    resetGetAllAppointments: resetGetAllAppointmentsReducer,
  },
  extraReducers(builder) {
    getAppointmentAnalyticsBuilder(builder);
    getAllAppointmentsBuilder(builder);
  },
});

export const appointmentReducer = appointmentSlice.reducer;
export const { resetGetAppointmentAnalytics, resetGetAllAppointments } =
  appointmentSlice.actions;
