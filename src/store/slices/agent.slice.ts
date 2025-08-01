import { initialAgentState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  askAgentBuilder,
  connectAgentBuilder,
  transcribeSpeechBuilder,
} from "../builders";
import {
  setAgentConnectionErrorReducer,
  resetAskAgentReducer,
  resetTranscribeSpeechReducer,
  newEnquiryReducer,
} from "../reducers";

const agentSlice = createSlice({
  name: "Agent",
  initialState: initialAgentState,
  reducers: {
    setAgentConnectionError: setAgentConnectionErrorReducer,
    newEnquiry: newEnquiryReducer,
    resetAskAgent: resetAskAgentReducer,
    resetTranscribeSpeech: resetTranscribeSpeechReducer,
  },
  extraReducers(builder) {
    connectAgentBuilder(builder);
    askAgentBuilder(builder);
    transcribeSpeechBuilder(builder);
  },
});

export const agentReducer = agentSlice.reducer;
export const {
  setAgentConnectionError,
  newEnquiry,
  resetAskAgent,
  resetTranscribeSpeech,
} = agentSlice.actions;
