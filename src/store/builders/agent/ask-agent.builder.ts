import { RoleEnum } from "@/enums";
import { AgentState } from "@/interfaces";
import { askAgent } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const askAgentBuilder = (
  builder: ActionReducerMapBuilder<AgentState>
) => {
  builder.addCase(askAgent.pending, (state) => {
    state.askingAgent = true;
    state.askAgentError = "";
  });

  builder.addCase(askAgent.fulfilled, (state, action) => {
    state.askingAgent = false;
    state.chatHistory = state.chatHistory || [];
    state.chatHistory.push(action.payload);
  });

  builder.addCase(askAgent.rejected, (state, action) => {
    state.askingAgent = false;
    state.askAgentError = action.payload?.message ?? "Unable to ask agent";
    state.chatHistory = state.chatHistory || [];
    state.chatHistory.push({
      content: action.payload?.message ?? "Unable to ask agent",
      role: RoleEnum.ASSISTANT,
      isError: true,
    });
  });
};
