import { BotApiService } from "@/apis";
import {
  ConfigureBotBody,
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
      return thunkAPI.rejectWithValue(error.message as string);
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
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);
