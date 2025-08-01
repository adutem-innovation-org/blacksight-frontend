import { AgentState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const setAgentConnectionErrorReducer = (
  state: AgentState,
  action: PayloadAction<string>
) => {
  state.connectionError = action.payload;
};
