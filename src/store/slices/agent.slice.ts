import { initialAgentState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  askAgentBuilder,
  bookAppointmentBuilder,
  connectAgentBuilder,
  submitTicketBuilder,
  transcribeSpeechBuilder,
} from "../builders";
import {
  setAgentConnectionErrorReducer,
  resetAskAgentReducer,
  resetTranscribeSpeechReducer,
  newEnquiryReducer,
  clearBotActionReducer,
  resetBookAppointmentReducer,
  resetSubmitTicketReducer,
} from "../reducers";

const agentSlice = createSlice({
  name: "Agent",
  initialState: initialAgentState,
  reducers: {
    setAgentConnectionError: setAgentConnectionErrorReducer,
    newEnquiry: newEnquiryReducer,
    resetAskAgent: resetAskAgentReducer,
    resetTranscribeSpeech: resetTranscribeSpeechReducer,
    clearBotAction: clearBotActionReducer,
    resetBookAppointment: resetBookAppointmentReducer,
    resetSubmitTicket: resetSubmitTicketReducer,
  },
  extraReducers(builder) {
    connectAgentBuilder(builder);
    askAgentBuilder(builder);
    transcribeSpeechBuilder(builder);
    bookAppointmentBuilder(builder);
    submitTicketBuilder(builder);
  },
});

export const agentReducer = agentSlice.reducer;
export const {
  setAgentConnectionError,
  newEnquiry,
  resetAskAgent,
  resetTranscribeSpeech,
  clearBotAction,
  resetBookAppointment,
  resetSubmitTicket,
} = agentSlice.actions;
