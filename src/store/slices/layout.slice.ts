import { initialLayoutState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import { changeSidebarStateReducer, changeTabReducer } from "../reducers";

const layoutSlice = createSlice({
  name: "Layout",
  initialState: initialLayoutState,
  reducers: {
    changeSidebarState: changeSidebarStateReducer,
    changeTab: changeTabReducer,
  },
});

export const layoutReducer = layoutSlice.reducer;
export const { changeSidebarState, changeTab } = layoutSlice.actions;
