import { initialLayoutState } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeBotTabReducer,
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
    changeBotTab: changeBotTabReducer,
  },
});

export const layoutReducer = layoutSlice.reducer;
export const {
  changeSidebarState,
  changeTab,
  changeSidebarMobileState,
  changeBotTab,
} = layoutSlice.actions;
