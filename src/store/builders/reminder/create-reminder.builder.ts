import { ReminderState } from "@/interfaces";
import { createReminder } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const createReminderBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(createReminder.pending, (state) => {
    state.creatingReminder = true;
  });

  builder.addCase(createReminder.fulfilled, (state, action) => {
    state.creatingReminder = false;
    state.reminderCreated = true;
  });

  builder.addCase(createReminder.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.creatingReminder = false;
    state.reminderCreated = false;
    state.createReminderErrors = error.errrors;
    state.createReminderErrorMessage = error.message;
  });
};
