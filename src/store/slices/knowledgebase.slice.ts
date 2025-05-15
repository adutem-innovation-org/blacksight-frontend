import { createSlice } from "@reduxjs/toolkit";
import {
  resetAddKnowledgeBaseReducer,
  resetGetAllKnowledgeBasesReducer,
  resetGetKnowledgeBaseAnalyticsReducer,
  resetDeleteKnowledgeBaseReducer,
} from "../reducers";
import { initialKnowledgeBaseState } from "@/constants";
import {
  addKnowledgeBaseBuilder,
  deleteKnowledgeBaseBuilder,
  getAllKnowledgeBasesBuilder,
  getKnowledgeBaseAnalyticsBuilder,
} from "../builders";

const knowledgeBaseSlice = createSlice({
  name: "KnowledgeBase",
  initialState: initialKnowledgeBaseState,
  reducers: {
    resetAddKnowledgeBase: resetAddKnowledgeBaseReducer,
    resetGetAllKnowledgeBases: resetGetAllKnowledgeBasesReducer,
    resetGetKnowledgeBaseAnalytics: resetGetKnowledgeBaseAnalyticsReducer,
    resetDeleteKnowledgeBase: resetDeleteKnowledgeBaseReducer,
  },
  extraReducers(builder) {
    getKnowledgeBaseAnalyticsBuilder(builder);
    getAllKnowledgeBasesBuilder(builder);
    addKnowledgeBaseBuilder(builder);
    deleteKnowledgeBaseBuilder(builder);
  },
});

export const knowledgeBaseReducer = knowledgeBaseSlice.reducer;
export const {
  resetAddKnowledgeBase,
  resetGetAllKnowledgeBases,
  resetGetKnowledgeBaseAnalytics,
  resetDeleteKnowledgeBase,
} = knowledgeBaseSlice.actions;
