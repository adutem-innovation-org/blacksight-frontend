import { BotState } from "@/interfaces";
import { getAllBots } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAllBotsBuilder = (
  builder: ActionReducerMapBuilder<BotState>
) => {
  builder.addCase(getAllBots.pending, (state) => {
    state.fetchingAllBots = true;
  });

  builder.addCase(getAllBots.fulfilled, (state, action) => {
    state.fetchingAllBots = false;
    state.allBotsFetched = true;
    state.bots = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(getAllBots.rejected, (state, action) => {
    state.fetchingAllBots = false;
    state.allBotsFetched = false;
    state.fetchAllBotsErrorMessage = action.payload as string;
  });
};
