import { initialTemplateState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  resetCreateTemplateReducer,
  resetDeleteTemplateReducer,
  resetEditorStateReducer,
  resetGetTemplateAnalyticsReducer,
  resetGetTemplatesReducer,
  resetUpdateTemplateReducer,
  updateEditorStateReducer,
} from "../reducers";
import {
  createTemplateBuilder,
  deleteTemplateBuilder,
  getTemplateAnalyticsBuilder,
  getTemplatesBuilder,
  updateTemplateBuilder,
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
    resetUpdateTemplate: resetUpdateTemplateReducer,
    resetDeleteTemplate: resetDeleteTemplateReducer,
  },
  extraReducers(builder) {
    getTemplateAnalyticsBuilder(builder);
    createTemplateBuilder(builder);
    getTemplatesBuilder(builder);
    updateTemplateBuilder(builder);
    deleteTemplateBuilder(builder);
  },
});

export const templateReducer = templateSlice.reducer;
export const {
  resetGetTemplateAnalytics,
  resetCreateTemplate,
  resetGetTemplates,
  updateEditorState,
  resetEditorState,
  resetUpdateTemplate,
  resetDeleteTemplate,
} = templateSlice.actions;
