import {
  AskAgentBody,
  AskAgentRes,
  BookAppointmentBody,
  BookAppointmentRes,
  ConnectToAgentRes,
  SpeechToTextBody,
  SpeechToTextRes,
  SubmitTicketBody,
  SubmitTicketRes,
} from "@/interfaces";
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

  connect = (apiKey: string, agentId: string, sessionId: string) => {
    return this.apiService.get<ConnectToAgentRes>(this.urls.CONNECT_TO_AGENT, {
      headers: {
        "x-api-key": apiKey,
        "x-agent-id": agentId,
        "x-session-id": sessionId,
      },
      timeout: 30000,
    });
  };

  ask = (
    apiKey: string,
    agentId: string,
    sessionId: string,
    data: AskAgentBody
  ) => {
    return this.apiService.post<AskAgentBody, AskAgentRes>(
      this.urls.ASK_AGENT,
      data,
      {
        headers: {
          "x-api-key": apiKey,
          "x-agent-id": agentId,
          "x-session-id": sessionId,
        },
        timeout: 40000,
      }
    );
  };

  speechToText = (
    apiKey: string,
    agentId: string,
    sessionId: string,
    data: SpeechToTextBody
  ) => {
    return this.apiService.postWithFile<SpeechToTextBody, SpeechToTextRes>(
      this.urls.TRANSCRIBE_SPEECH,
      data,
      {
        headers: {
          "x-api-key": apiKey,
          "x-agent-id": agentId,
          "x-session-id": sessionId,
        },
        timeout: 40000,
      }
    );
  };

  bookAppointment = (
    apiKey: string,
    agentId: string,
    sessionId: string,
    data: BookAppointmentBody
  ) => {
    return this.apiService.post<BookAppointmentBody, BookAppointmentRes>(
      this.urls.BOOK_APPOINTMENT,
      data,
      {
        headers: {
          "x-api-key": apiKey,
          "x-agent-id": agentId,
          "x-session-id": sessionId,
        },
        timeout: 40000,
      }
    );
  };

  submitTicket = (
    apiKey: string,
    agentId: string,
    sessionId: string,
    data: SubmitTicketBody
  ) => {
    return this.apiService.post<SubmitTicketBody, SubmitTicketRes>(
      this.urls.SUBMIT_TICKET,
      data,
      {
        headers: {
          "x-api-key": apiKey,
          "x-agent-id": agentId,
          "x-session-id": sessionId,
        },
        timeout: 40000,
      }
    );
  };
}
