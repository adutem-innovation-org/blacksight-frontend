import { BotState } from "@/interfaces";
import { deleteBot } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const deleteBotBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(deleteBot.pending, (state) => {
    state.deletingBot = true;
  });

  builder.addCase(deleteBot.fulfilled, (state, action) => {
    state.deletingBot = false;
    state.botDeleted = true;
    state.bots = state.bots || [];
    state.bots = state.bots.filter((bot) => bot._id !== action.payload._id);
  });

  builder.addCase(deleteBot.rejected, (state, action) => {
    state.deletingBot = false;
    state.deleteBotError = action?.payload || "Unable to delete this bot";
  });
};
