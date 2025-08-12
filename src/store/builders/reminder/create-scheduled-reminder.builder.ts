import { ReminderState } from "@/interfaces";
import { createScheduledReminder } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const createScheduledReminderBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(createScheduledReminder.pending, (state) => {
    state.creatingScheduledReminder = true;
  });

  builder.addCase(createScheduledReminder.fulfilled, (state, action) => {
    state.creatingScheduledReminder = false;
    state.scheduledReminderCreated = true;
  });

  builder.addCase(createScheduledReminder.rejected, (state, action) => {
    state.creatingScheduledReminder = false;
    state.scheduledReminderCreated = false;
    state.createScheduledReminderErrors = action.payload?.errors ?? {};
    state.createScheduledReminderErrorMsg = action.payload?.message ?? "";
  });
};
