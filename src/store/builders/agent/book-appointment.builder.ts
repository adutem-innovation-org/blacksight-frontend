import { AgentState } from "@/interfaces";
import { bookAppointment } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const bookAppointmentBuilder = (
  builder: ActionReducerMapBuilder<AgentState>
) => {
  builder.addCase(bookAppointment.pending, (state) => {
    state.bookingAppointment = true;
  });

  builder.addCase(bookAppointment.fulfilled, (state, action) => {
    state.bookingAppointment = false;
    state.appointmentBooked = true;
    state.chatHistory = state.chatHistory || [];
    state.chatHistory = state.chatHistory.concat(action.payload);
  });

  builder.addCase(bookAppointment.rejected, (state, action) => {
    state.bookingAppointment = false;
    state.bookAppointmentErrors = action.payload?.errors || {};
    state.bookAppointmentErrorMessage =
      action.payload?.message || "Unable to book appointment";
  });
};
