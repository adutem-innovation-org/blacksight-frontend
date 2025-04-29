import { ReminderState } from "@/interfaces";
import { getAllReminders } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAllRemindersBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(getAllReminders.pending, (state) => {
    state.fetchingAllReminders = true;
  });

  builder.addCase(getAllReminders.fulfilled, (state, action) => {
    state.fetchingAllReminders = false;
    state.allRemindersFetched = true;
    state.reminders = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(getAllReminders.rejected, (state, action) => {
    state.fetchingAllReminders = false;
    state.allRemindersFetched = false;
    state.fetchAllRemindersErrorMessage = action.payload as string;
  });
};
