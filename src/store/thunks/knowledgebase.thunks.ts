import { KnowledgeBaseApiService } from "@/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

const knowledgeBaseApiService = KnowledgeBaseApiService.getInstance();

export const getKnowledgeBaseAnalytics = createAsyncThunk(
  "get_knowledgebase_analytics",
  async (_: void, thunkAPI) => {
    try {
      const data = await knowledgeBaseApiService.getKnowledgeBaseAnalytics();
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const getAllKnowledgeBases = createAsyncThunk(
  "get_all_knowledgebases",
  async (_: void, thunkAPI) => {
    try {
      const { data, meta } = await knowledgeBaseApiService.getKnowledgeBases();
      return { data, meta };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const addKnowledgeBase = createAsyncThunk(
  "add_knowledgebase",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await knowledgeBaseApiService.addKnowledgeBase(data);
      return response.knowledgeBase;
    } catch (error) {
      return thunkAPI.rejectWithValue(JSON.stringify(error));
    }
  }
);

export const deleteKnowledgeBase = createAsyncThunk(
  "delete_knowledgebase",
  async (id: string, thunkAPI) => {
    try {
      const response = await knowledgeBaseApiService.deleteKnowledgeBase(id);
      return response.knowledgeBase;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);
