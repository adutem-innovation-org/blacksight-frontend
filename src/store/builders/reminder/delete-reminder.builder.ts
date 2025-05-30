import { ReminderState } from "@/interfaces";
import { deleteReminder } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteReminderBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(deleteReminder.pending, (state) => {
    state.deletingReminder = true;
  });

  builder.addCase(deleteReminder.fulfilled, (state, action) => {
    state.deletingReminder = false;
    state.reminderDeleted = true;
    state.reminders = state.reminders || [];
    state.reminders = state.reminders.filter(
      (reminder) => reminder._id !== action.payload._id
    );
  });

  builder.addCase(deleteReminder.rejected, (state, action) => {
    state.deletingReminder = false;
    state.deleteReminderError = action?.payload || "Unable to delete reminder";
  });
};
