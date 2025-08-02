import { Message } from "@/interfaces/bot";
import { BotActions } from "@/enums/bot";
import { Agent } from "./agent";

export interface AgentState {
  connecting: boolean;
  connected: boolean;
  connectionError: string;
  agentData: Agent | null;
  chatHistory: (Message & { isError?: boolean })[] | null;
  sessionId: string | null;
  apiKey: string | null;

  // Ask agent
  askingAgent: boolean;
  askAgentError: string;
  action: BotActions | null;

  // Transcribing speech
  transcribingSpeech: boolean;
  speechTranscribed: boolean;
  transcribedText: string;
  transcribeSpeechError: string;

  // Book appointment
  bookingAppointment: boolean;
  appointmentBooked: boolean;
  bookAppointmentErrors: Record<string, string>;
  bookAppointmentErrorMessage: string;

  // Submit ticket
  submittingTicket: boolean;
  ticketSubmitted: boolean;
  submitTicketErrors: Record<string, string>;
  submitTicketErrorMessage: string;
}
