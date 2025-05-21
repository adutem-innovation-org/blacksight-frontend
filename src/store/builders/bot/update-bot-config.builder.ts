import { BotState } from "@/interfaces";
import { updateBotConfig } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateBotConfigBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(updateBotConfig.pending, (state) => {
    state.updatingBotConfig = true;
  });

  builder.addCase(updateBotConfig.fulfilled, (state, action) => {
    state.updatingBotConfig = false;
    state.botConfigUpdated = true;
    state.bots = state.bots || [];
    state.bots = state.bots.map((bot) =>
      bot._id === action.payload._id ? action.payload : bot
    );
    if (state.currentBot?._id === action.payload._id) {
      state.currentBot = action.payload;
    }
  });

  builder.addCase(updateBotConfig.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.updatingBotConfig = false;
    state.botConfigUpdated = false;
    state.updateBotConfigErrors = error.errors;
    state.updateBotConfigErrorMessage = error.message;
  });
};
