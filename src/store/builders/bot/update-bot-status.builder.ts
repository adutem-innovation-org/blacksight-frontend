import { BotState } from "@/interfaces";
import { updateBotStatus } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateBotStatusBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(updateBotStatus.pending, (state) => {
    state.updatingBotStatus = true;
  });

  builder.addCase(updateBotStatus.fulfilled, (state, action) => {
    state.updatingBotStatus = false;
    state.botStatusUpdated = true;
    state.bots = state.bots || [];
    state.bots = state.bots.map((bot) =>
      bot._id === action.payload._id ? action.payload : bot
    );
  });

  builder.addCase(updateBotStatus.rejected, (state, action) => {
    state.updatingBotStatus = false;
    state.updateBotStatusError = action?.payload || "Unable to update bot";
  });
};
