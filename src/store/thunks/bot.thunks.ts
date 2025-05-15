import { BotApiService } from "@/apis";
import { ConfigureBotBody } from "@/interfaces";
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
