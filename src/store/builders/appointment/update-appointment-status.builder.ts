import { AppointmentState } from "@/interfaces";
import { updateAppointmentStatus } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateAppointmentStatusBuilder = (
  builder: ActionReducerMapBuilder<AppointmentState>
) => {
  builder.addCase(updateAppointmentStatus.pending, (state) => {
    state.updatingAppointmentStatus = true;
  });

  builder.addCase(updateAppointmentStatus.fulfilled, (state, action) => {
    state.updatingAppointmentStatus = false;
    state.appointmentStatusUpdated = true;
    state.appointments = (state.appointments ?? []).map((appointment) => {
      if (appointment._id === action.payload._id) {
        return action.payload;
      }
      return appointment;
    });
  });

  builder.addCase(updateAppointmentStatus.rejected, (state, action) => {
    state.updatingAppointmentStatus = false;
    state.updateAppointmentStatusErrors = action.payload?.errors ?? {};
    state.updateAppointmentStatusErrorMsg = action.payload?.message ?? "";
  });
};
