import { initialLayoutState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeSidebarMobileStateReducer,
  changeSidebarStateReducer,
  changeTabReducer,
} from "../reducers";

const layoutSlice = createSlice({
  name: "Layout",
  initialState: initialLayoutState,
  reducers: {
    changeSidebarState: changeSidebarStateReducer,
    changeSidebarMobileState: changeSidebarMobileStateReducer,
    changeTab: changeTabReducer,
  },
});

export const layoutReducer = layoutSlice.reducer;
export const { changeSidebarState, changeTab, changeSidebarMobileState } =
  layoutSlice.actions;
