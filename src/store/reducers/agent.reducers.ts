import { RoleEnum, UserActions } from "@/enums";
import { AgentState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const setAgentConnectionErrorReducer = (
  state: AgentState,
  action: PayloadAction<string>
) => {
  state.connectionError = action.payload;
};

export const resetAskAgentReducer = (state: AgentState) => {
  state.askingAgent = false;
  state.askAgentError = "";
};

export const newEnquiryReducer = (
  state: AgentState,
  action: PayloadAction<{ role: RoleEnum; content: string }>
) => {
  state.chatHistory = state.chatHistory || [];
  state.chatHistory.push(action.payload);
};

export const resetTranscribeSpeechReducer = (state: AgentState) => {
  state.transcribingSpeech = false;
  state.speechTranscribed = false;
  state.transcribeSpeechError = "";
  state.transcribedText;
};

export const clearAgentActionReducer = (
  state: AgentState,
  action: PayloadAction<{
    role: RoleEnum;
    content: string;
    action: UserActions;
  }>
) => {
  state.action = null;
  state.chatHistory = state.chatHistory || [];
  state.chatHistory.push(action.payload);
};

export const resetBookAppointmentReducer = (state: AgentState) => {
  state.bookingAppointment = false;
  state.appointmentBooked = false;
  state.bookAppointmentErrors = {};
  state.action = null;
  state.bookAppointmentErrorMessage = "";
};

export const resetSubmitTicketReducer = (state: AgentState) => {
  state.submittingTicket = false;
  state.ticketSubmitted = false;
  state.submitTicketErrors = {};
  state.action = null;
  state.submitTicketErrorMessage = "";
};
