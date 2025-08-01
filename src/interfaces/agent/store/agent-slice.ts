import { Agent } from "./agent";

export interface AgentState {
  connecting: boolean;
  connected: boolean;
  connectionError: string;
  agentData: Agent | null;
}
