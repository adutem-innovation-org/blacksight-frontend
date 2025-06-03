import { BotApiService } from "@/apis";
import {
  AskChatbotBody,
  Bot,
  ConfigureBotBody,
  Conversation,
  PaginationMetaData,
  SpeechToTextBody,
  StartConversationBody,
  UpdateBotConfigBody,
  UpdateBotInstructionsBody,
} from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const botApiService = BotApiService.getInstance();

export const getBotAnalytics = createAsyncThunk(
  "get_bot_analytics",
  async (_: void, thunkAPI) => {
    try {
      const data = await botApiService.getBotAnalytics();
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const getConversationAnalytics = createAsyncThunk<
  { totalConversations: number },
  void,
  { rejectValue: string }
>("get_conversation_analytics", async (_: void, thunkAPI) => {
  try {
    const data = await botApiService.getConversationAnalytics();
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message as string);
  }
});

export const getAllBots = createAsyncThunk(
  "get_all_bots",
  async (_: void, thunkAPI) => {
    try {
      const { data, meta } = await botApiService.getBots();
      return { data, meta };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const getAllConversations = createAsyncThunk<
  { data: Conversation[]; meta: PaginationMetaData },
  void,
  { rejectValue: string }
>("get_all_conversations", async (_: void, thunkAPI) => {
  try {
    const { data, meta } = await botApiService.getAllConversations();
    return { data, meta };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const configureBot = createAsyncThunk(
  "configure_bot",
  async (data: ConfigureBotBody, thunkAPI) => {
    try {
      const response = await botApiService.configureBot(data);
      return response.bot;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const updateBotConfig = createAsyncThunk(
  "update_bot_config",
  async ({ id, data }: { id: string; data: UpdateBotConfigBody }, thunkAPI) => {
    try {
      const res = await botApiService.updateBotConfig(id, data);
      return res.bot;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBotInstructions = createAsyncThunk(
  "update_bot_instructions",
  async (
    { id, data }: { id: string; data: UpdateBotInstructionsBody },
    thunkAPI
  ) => {
    try {
      const res = await botApiService.updateBotInstructions(id, data);
      return res.bot;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const startConversation = createAsyncThunk(
  "start_conversation",
  async (data: StartConversationBody, { rejectWithValue }) => {
    try {
      const res = await botApiService.startConversation(data);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const askChatbot = createAsyncThunk(
  "ask_chatbot",
  async (data: AskChatbotBody, { rejectWithValue, getState }) => {
    try {
      const res = await botApiService.askChatbot(data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const getTrainingConversation = createAsyncThunk(
  "get_training_conversation",
  async (botId: string, { rejectWithValue }) => {
    try {
      const res = await botApiService.getTrainingConversation(botId);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearTrainingConversation = createAsyncThunk(
  "clear_training_conversation",
  async (
    { botId, conversationId }: { botId: string; conversationId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await botApiService.clearTrainingConversation(
        botId,
        conversationId
      );
      console.log(res);
      return res.conversation;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBotStatus = createAsyncThunk<
  Bot,
  { id: string; status: boolean },
  { rejectValue: string }
>(
  "update_bot_status",
  async (
    { id, status }: { id: string; status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const updateApi = status
        ? botApiService.activateBot
        : botApiService.deactivateBot;
      const res = await updateApi(id);
      return res.bot;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBot = createAsyncThunk<Bot, string, { rejectValue: string }>(
  "delete_bot",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await botApiService.deleteBot(id);
      return res.bot;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const speechToText = createAsyncThunk<
  string,
  SpeechToTextBody,
  { rejectValue: string }
>("speech_to_text", async (data, { rejectWithValue }) => {
  try {
    const res = await botApiService.speechToText(data);
    return res.text;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
