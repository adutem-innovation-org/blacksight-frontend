import { BotState } from "@/interfaces";
import { deactivateBot } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deactivateBotBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(deactivateBot.pending, (state) => {
    state.deactivatingBot = true;
  });

  builder.addCase(deactivateBot.fulfilled, (state, action) => {
    state.deactivatingBot = false;
    state.botDeactivated = true;
    state.bots = state.bots || [];
    state.bots = state.bots.map((bot) =>
      bot._id === action.payload._id ? action.payload : bot
    );
  });

  builder.addCase(deactivateBot.rejected, (state, action) => {
    state.deactivatingBot = false;
    state.deactivateBotError =
      action?.payload || "Unable to deactivate this bot";
  });
};
