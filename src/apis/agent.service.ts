import { ConnectToAgentRes } from "@/interfaces";
import { ApiService } from "./api.service";
import { AGENT_URLS } from "./endpoints";

export class AgentApiService {
  private static instance: AgentApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof AGENT_URLS = AGENT_URLS;

  constructor() {
    this.apiService = new ApiService("agent");
  }

  static getInstance(): AgentApiService {
    if (!this.instance) {
      this.instance = new AgentApiService();
    }
    return this.instance;
  }

  connect = (apiKey: string, agentId: string) => {
    return this.apiService.get<ConnectToAgentRes>(this.urls.CONNECT_TO_AGENT, {
      headers: {
        "x-api-key": apiKey,
        "x-agent-id": agentId,
      },
      timeout: 30000,
    });
  };
}
