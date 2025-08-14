import { AppointmentState } from "@/interfaces";
import { deleteAppointment } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteAppointmentBuilder = (
  builder: ActionReducerMapBuilder<AppointmentState>
) => {
  builder.addCase(deleteAppointment.pending, (state) => {
    state.deletingAppointment = true;
  });

  builder.addCase(deleteAppointment.fulfilled, (state, action) => {
    state.deletingAppointment = false;
    state.appointmentDeleted = true;
    state.appointments = (state.appointments ?? [])?.filter(
      (appointment) => appointment._id !== action.payload
    );
  });

  builder.addCase(deleteAppointment.rejected, (state, action) => {
    state.deletingAppointment = false;
    state.deleteAppointmentError =
      action?.payload || "Unable to delete this bot";
  });
};
