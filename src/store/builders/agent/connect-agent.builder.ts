import { AgentState } from "@/interfaces";
import { connectAgent } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const connectAgentBuilder = (
  builder: ActionReducerMapBuilder<AgentState>
) => {
  builder
    .addCase(connectAgent.pending, (state, action) => {
      state.connecting = true;
      state.connected = false;
      state.sessionId = action.meta.arg.sessionId;
    })
    .addCase(connectAgent.fulfilled, (state, action) => {
      state.connecting = false;
      state.connected = true;
      state.agentData = action.payload.agent;
      state.chatHistory = action.payload.chatHistory;
    })
    .addCase(connectAgent.rejected, (state, action) => {
      state.connecting = false;
      state.connectionError = action.payload?.message ?? "Unable to connect";
    });
};
