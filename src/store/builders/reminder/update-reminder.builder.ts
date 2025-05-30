import { ReminderState } from "@/interfaces";
import { updateReminder } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateReminderBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(updateReminder.pending, (state) => {
    state.updatingReminder = true;
  });

  builder.addCase(updateReminder.fulfilled, (state, action) => {
    state.updatingReminder = false;
    state.reminderUpdated = true;
    state.reminders = state.reminders || [];
    state.reminders = state.reminders.map((reminder) =>
      reminder._id === action.payload._id ? action.payload : reminder
    );
  });

  builder.addCase(updateReminder.rejected, (state, action) => {
    state.updatingReminder = false;
    state.updateReminderErrors = action.payload?.errors || {};
    state.updateReminderErrorMessage =
      action.payload?.message || "Unable to update reminder";
  });
};
