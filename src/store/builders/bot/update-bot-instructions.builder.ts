import { BotState } from "@/interfaces";
import { updateBotInstructions } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const updateBotInstructionsBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(updateBotInstructions.pending, (state) => {
    state.updatingBotInstructions = true;
  });

  builder.addCase(updateBotInstructions.fulfilled, (state, action) => {
    state.updatingBotInstructions = false;
    state.botInstructionsUpdated = true;
    state.bots = state.bots || [];
    state.bots = state.bots.map((bot) =>
      bot._id === action.payload._id ? action.payload : bot
    );
    if (state.currentBot?._id === action.payload._id) {
      state.currentBot = action.payload;
    }
  });

  builder.addCase(updateBotInstructions.rejected, (state, action) => {
    const error = JSON.parse(action.payload as string);
    state.updatingBotInstructions = false;
    state.botInstructionsUpdated = false;
    state.updateBotInstructionsErrors = error.errors;
    state.updateBotInstructionsErrorMessage = error.message;
  });
};
