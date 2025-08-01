import { AgentApiService } from "@/apis";
import {
  AskAgentBody,
  AskAgentRes,
  ConnectToAgentRes,
  SpeechToTextBody,
  StoreState,
} from "@/interfaces";
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

export const askAgent = createAsyncThunk<
  AskAgentRes["data"],
  AskAgentBody,
  { rejectValue: { message: string } }
>("ask_agent", async (data, { rejectWithValue, getState }) => {
  try {
    const { sessionId, agentData, apiKey } = (getState() as StoreState)[
      "Agent"
    ];
    if (!sessionId || !agentData?._id || !apiKey)
      return rejectWithValue({
        message: "Unable to ask agent. Missing API key, session ID or agent ID",
      });
    const res = await agentApiService.ask(
      apiKey,
      agentData._id!,
      sessionId!,
      data
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const transcribeSpeech = createAsyncThunk<
  string,
  SpeechToTextBody,
  { rejectValue: { message: string } }
>("transcribe_speech", async (data, { rejectWithValue, getState }) => {
  try {
    const { sessionId, agentData, apiKey } = (getState() as StoreState)[
      "Agent"
    ];
    if (!sessionId || !agentData?._id || !apiKey)
      return rejectWithValue({
        message: "Unable to ask agent. Missing API key, session ID or agent ID",
      });
    const res = await agentApiService.speechToText(
      apiKey,
      agentData._id!,
      sessionId!,
      data
    );
    return res.text;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
