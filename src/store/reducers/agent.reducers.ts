import { RoleEnum } from "@/enums";
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
