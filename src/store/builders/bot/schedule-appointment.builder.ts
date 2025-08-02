import { BotState } from "@/interfaces";
import { scheduleAppointment } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const scheduleAppointmentBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(scheduleAppointment.pending, (state) => {
    state.schedulingAppointment = true;
  });

  builder.addCase(scheduleAppointment.fulfilled, (state, action) => {
    state.schedulingAppointment = false;
    state.appointmentScheduled = true;
    state.currentConversation = state.currentConversation || [];
    state.currentConversation = state.currentConversation.concat(
      action.payload
    );
  });

  builder.addCase(scheduleAppointment.rejected, (state, action) => {
    state.schedulingAppointment = false;
    state.scheduleAppointmentErrors = action.payload?.errors || {};
    state.scheduleAppointmentErrorMessage =
      action.payload?.message || "Unable to schedule appointment";
  });
};
