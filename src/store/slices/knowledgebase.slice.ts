import { createSlice } from "@reduxjs/toolkit";
import {
  resetAddKnowledgeBaseReducer,
  resetGetAllKnowledgeBasesReducer,
  resetGetKnowledgeBaseAnalyticsReducer,
  resetDeleteKnowledgeBaseReducer,
  resetUpdateKBStatusReducer,
} from "../reducers";
import { initialKnowledgeBaseState } from "@/constants";
import {
  addKnowledgeBaseBuilder,
  deleteKnowledgeBaseBuilder,
  getAllKnowledgeBasesBuilder,
  getKnowledgeBaseAnalyticsBuilder,
} from "../builders";
import { updateKBStatusBuilder } from "../builders/knowledge-base/update-kb-status.builder";

const knowledgeBaseSlice = createSlice({
  name: "KnowledgeBase",
  initialState: initialKnowledgeBaseState,
  reducers: {
    resetAddKnowledgeBase: resetAddKnowledgeBaseReducer,
    resetGetAllKnowledgeBases: resetGetAllKnowledgeBasesReducer,
    resetGetKnowledgeBaseAnalytics: resetGetKnowledgeBaseAnalyticsReducer,
    resetDeleteKnowledgeBase: resetDeleteKnowledgeBaseReducer,
    resetUpdateKBStatus: resetUpdateKBStatusReducer,
  },
  extraReducers(builder) {
    getKnowledgeBaseAnalyticsBuilder(builder);
    getAllKnowledgeBasesBuilder(builder);
    addKnowledgeBaseBuilder(builder);
    deleteKnowledgeBaseBuilder(builder);
    updateKBStatusBuilder(builder);
  },
});

export const knowledgeBaseReducer = knowledgeBaseSlice.reducer;
export const {
  resetAddKnowledgeBase,
  resetGetAllKnowledgeBases,
  resetGetKnowledgeBaseAnalytics,
  resetDeleteKnowledgeBase,
  resetUpdateKBStatus,
} = knowledgeBaseSlice.actions;
