import { AgentState } from "@/interfaces";

export const initialAgentState: AgentState = {
  connecting: false,
  connected: false,
  connectionError: "",
  agentData: null,
  chatHistory: null,
  sessionId: null,
  apiKey: null,

  askingAgent: false,
  askAgentError: "",
  action: null,

  transcribingSpeech: false,
  speechTranscribed: false,
  transcribedText: "",
  transcribeSpeechError: "",

  // Book appointment
  bookingAppointment: false,
  appointmentBooked: false,
  bookAppointmentErrors: {},
  bookAppointmentErrorMessage: "",

  // Submit ticket
  submittingTicket: false,
  ticketSubmitted: false,
  submitTicketErrors: {},
  submitTicketErrorMessage: "",
};
