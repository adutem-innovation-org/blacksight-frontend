import { initialAnalyticsState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import { resetGetAnalyticsBuilder } from "../reducers";
import { getAnalyticsBuilder } from "../builders";

const analyticsSlice = createSlice({
  name: "Analytics",
  initialState: initialAnalyticsState,
  reducers: {
    resetGetAnalytics: resetGetAnalyticsBuilder,
  },
  extraReducers(builder) {
    getAnalyticsBuilder(builder);
  },
});

export const analyticsReducer = analyticsSlice.reducer;
export const { resetGetAnalytics } = analyticsSlice.actions;
