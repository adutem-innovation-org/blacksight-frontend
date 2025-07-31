import { initialTemplateState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  resetCreateTemplateReducer,
  resetEditorStateReducer,
  resetGetTemplateAnalyticsReducer,
  resetGetTemplatesReducer,
  updateEditorStateReducer,
} from "../reducers";
import {
  createTemplateBuilder,
  getTemplateAnalyticsBuilder,
  getTemplatesBuilder,
} from "../builders";

const templateSlice = createSlice({
  name: "Template",
  initialState: initialTemplateState,
  reducers: {
    resetGetTemplateAnalytics: resetGetTemplateAnalyticsReducer,
    resetCreateTemplate: resetCreateTemplateReducer,
    resetGetTemplates: resetGetTemplatesReducer,
    updateEditorState: updateEditorStateReducer,
    resetEditorState: resetEditorStateReducer,
  },
  extraReducers(builder) {
    getTemplateAnalyticsBuilder(builder);
    createTemplateBuilder(builder);
    getTemplatesBuilder(builder);
  },
});

export const templateReducer = templateSlice.reducer;
export const {
  resetGetTemplateAnalytics,
  resetCreateTemplate,
  resetGetTemplates,
  updateEditorState,
  resetEditorState,
} = templateSlice.actions;
