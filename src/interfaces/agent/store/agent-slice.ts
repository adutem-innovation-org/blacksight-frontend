import { Conversation, Message } from "@/interfaces/bot";
import { Agent } from "./agent";

export interface AgentState {
  connecting: boolean;
  connected: boolean;
  connectionError: string;
  agentData: Agent | null;
  chatHistory: Message[] | null;
  sessionId: string | null;
}
