import { BotState } from "@/interfaces";
import { configureBot } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const configureBotBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(configureBot.pending, (state) => {
    state.configuringBot = true;
  });

  builder.addCase(configureBot.fulfilled, (state, action) => {
    state.configuringBot = false;
    state.botConfigured = true;
    state.bots = state.bots || [];
    state.bots.unshift(action.payload);
  });

  builder.addCase(configureBot.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.configuringBot = false;
    state.botConfigured = false;
    state.configureBotErrors = error.errors;
    state.configureBotErrorMessage = error.message;
  });
};
