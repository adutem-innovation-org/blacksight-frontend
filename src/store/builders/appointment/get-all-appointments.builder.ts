import { AppointmentState } from "@/interfaces";
import { getAllAppointments } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAllAppointmentsBuilder = (
  builder: ActionReducerMapBuilder<AppointmentState>
) => {
  builder.addCase(getAllAppointments.pending, (state) => {
    state.fetchingAllAppointments = true;
  });

  builder.addCase(getAllAppointments.fulfilled, (state, action) => {
    state.fetchingAllAppointments = false;
    state.allAppointmentsFetched = true;
    state.appointments = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(getAllAppointments.rejected, (state, action) => {
    state.fetchingAllAppointments = false;
    state.allAppointmentsFetched = false;
    state.fetchAllAppointmentsError = action.payload as string;
  });
};
