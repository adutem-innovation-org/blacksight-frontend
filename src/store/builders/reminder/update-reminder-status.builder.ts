import { ReminderState } from "@/interfaces";
import { updateReminderStatus } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateReminderStatusBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(updateReminderStatus.pending, (state) => {
    state.updatingReminderStatus = true;
  });

  builder.addCase(updateReminderStatus.fulfilled, (state, action) => {
    state.updatingReminderStatus = false;
    state.reminderStatusUpdated = true;
    state.reminders = state.reminders || [];
    state.reminders = state.reminders.map((reminder) =>
      reminder._id === action.payload._id ? action.payload : reminder
    );
  });

  builder.addCase(updateReminderStatus.rejected, (state, action) => {
    state.updatingReminderStatus = false;
    state.updateReminderStatusError =
      action.payload || "Unable to update reminder status";
  });
};
