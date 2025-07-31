import { initialTemplateState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  resetCreateTemplateReducer,
  resetGetTemplateAnalyticsReducer,
  resetGetTemplatesReducer,
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
} = templateSlice.actions;
