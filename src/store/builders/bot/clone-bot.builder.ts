import { BotState } from "@/interfaces";
import { cloneBot } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const cloneBotBuilder = (builder: ActionReducerMapBuilder<BotState>) => {
  builder
    .addCase(cloneBot.pending, (state) => {
      state.cloningBot = true;
    })
    .addCase(cloneBot.fulfilled, (state, action) => {
      state.cloningBot = false;
      state.botCloned = true;
      state.bots = state.bots || [];
      state.bots.unshift(action.payload);
    })
    .addCase(cloneBot.rejected, (state, action) => {
      state.cloningBot = false;
      state.botCloned = false;
      state.cloneBotErrorMessage =
        action.payload?.message ?? "Unable to clone bot. Please try again";
    });
};
