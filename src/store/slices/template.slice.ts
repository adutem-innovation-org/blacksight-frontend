import { initialTemplateState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import { resetGetTemplateAnalyticsReducer } from "../reducers";
import { getTemplateAnalyticsBuilder } from "../builders";

const templateSlice = createSlice({
  name: "Template",
  initialState: initialTemplateState,
  reducers: {
    resetGetTemplateAnalytics: resetGetTemplateAnalyticsReducer,
  },
  extraReducers(builder) {
    getTemplateAnalyticsBuilder(builder);
  },
});

export const templateReducer = templateSlice.reducer;
export const { resetGetTemplateAnalytics } = templateSlice.actions;
