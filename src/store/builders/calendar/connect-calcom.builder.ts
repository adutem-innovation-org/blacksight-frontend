import { CalendarState } from "@/interfaces";
import { connectCalcom } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const connectCalcomBuilder = (
  builder: ActionReducerMapBuilder<CalendarState>
) => {
  builder.addCase(connectCalcom.pending, (state) => {
    state.connectingCalcom = true;
  });

  builder.addCase(connectCalcom.fulfilled, (state) => {
    state.connectingCalcom = false;
    state.calcomConnected = true;
  });

  builder.addCase(connectCalcom.rejected, (state, action) => {
    state.connectingCalcom = false;
    state.calcomConnected = false;
    state.connectCalcomErrors = action.payload?.errors || {};
    state.connectCalcomErrorMessage =
      action.payload?.message || "Failed to connect Calcom";
  });
};
