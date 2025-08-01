import { initialAgentState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import { connectAgentBuilder } from "../builders";
import { setAgentConnectionErrorReducer } from "../reducers";

const agentSlice = createSlice({
  name: "Agent",
  initialState: initialAgentState,
  reducers: {
    setAgentConnectionError: setAgentConnectionErrorReducer,
  },
  extraReducers(builder) {
    connectAgentBuilder(builder);
  },
});

export const agentReducer = agentSlice.reducer;
export const { setAgentConnectionError } = agentSlice.actions;
