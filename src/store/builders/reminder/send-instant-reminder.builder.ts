import { ReminderState } from "@/interfaces";
import { sendInstantReminder } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const sendInstantReminderBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(sendInstantReminder.pending, (state) => {
    state.sendingInstantReminder = true;
  });

  builder.addCase(sendInstantReminder.fulfilled, (state, action) => {
    state.sendingInstantReminder = false;
    state.instantReminderSent = true;
  });

  builder.addCase(sendInstantReminder.rejected, (state, action) => {
    state.sendingInstantReminder = false;
    state.instantReminderSent = false;
    state.sendInstantReminderErrors = action.payload?.errors ?? {};
    state.sendInstantReminderErrorMsg = action.payload?.message ?? "";
  });
};
