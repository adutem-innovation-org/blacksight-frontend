import { AgentApiService } from "@/apis";
import { ConnectToAgentRes } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

const agentApiService = AgentApiService.getInstance();

export const connectAgent = createAsyncThunk<
  ConnectToAgentRes,
  { apiKey: string; agentId: string; sessionId: string },
  { rejectValue: { message: string } }
>(
  "connect_agent",
  async ({ apiKey, agentId, sessionId }, { rejectWithValue }) => {
    try {
      const data = await agentApiService.connect(apiKey, agentId, sessionId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
