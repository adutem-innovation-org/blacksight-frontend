import { ReminderState } from "@/interfaces";
import { cancelReminder } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const cancelReminderBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(cancelReminder.pending, (state) => {
    state.cancelingReminder = true;
  });

  builder.addCase(cancelReminder.fulfilled, (state, action) => {
    state.cancelingReminder = false;
    state.reminderCanceled = true;
    state.reminders = state.reminders || [];
    state.reminders = state.reminders.map((reminder) =>
      reminder._id === action.payload._id ? action.payload : reminder
    );
  });

  builder.addCase(cancelReminder.rejected, (state, action) => {
    state.cancelingReminder = false;
    state.cancelReminderError = action?.payload || "Unable to delete reminder";
  });
};
