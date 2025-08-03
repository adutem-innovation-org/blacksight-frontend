import { KnowledgeBaseApiService } from "@/apis";
import {
  GenerateKnowledgeBaseBody,
  GenerateKnowledgeBaseRes,
  KnowledgeBase,
} from "@/interfaces";
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

export const generateKnowledgeBase = createAsyncThunk<
  GenerateKnowledgeBaseRes,
  GenerateKnowledgeBaseBody,
  { rejectValue: { message: string } }
>("generate_knowledgebase", async (data, { rejectWithValue }) => {
  try {
    const response = await knowledgeBaseApiService.generateKnowledgeBase(data);
    return response;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateKBStatus = createAsyncThunk<
  KnowledgeBase,
  { id: string; status: boolean },
  { rejectValue: string }
>(
  "update_kb_status",
  async (
    { id, status }: { id: string; status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const updateApi = status
        ? knowledgeBaseApiService.activateKB
        : knowledgeBaseApiService.deactivateKB;
      const res = await updateApi(id);
      return res.knowledgeBase;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
