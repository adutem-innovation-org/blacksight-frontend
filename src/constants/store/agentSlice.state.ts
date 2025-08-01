import { AgentState } from "@/interfaces";

export const initialAgentState: AgentState = {
  connecting: false,
  connected: false,
  connectionError: "",
  agentData: null,
};
