import { Conversation, Message } from "@/interfaces/bot";
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

  // Transcribing speech
  transcribingSpeech: boolean;
  speechTranscribed: boolean;
  transcribedText: string;
  transcribeSpeechError: string;
}
