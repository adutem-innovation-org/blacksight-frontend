import {
  DashboardTabsEnum,
  SideBarMobileStateEnum,
  SideBarStateEnum,
} from "@/enums";
import { LayoutState } from "@/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const changeSidebarStateReducer = (
  state: LayoutState,
  action: PayloadAction<SideBarStateEnum>
) => {
  state.sidebarState = action.payload;
};

export const changeSidebarMobileStateReducer = (
  state: LayoutState,
  action: PayloadAction<SideBarMobileStateEnum>
) => {
  state.sidebarMobileState = action.payload;
};

export const changeTabReducer = (
  state: LayoutState,
  action: PayloadAction<DashboardTabsEnum>
) => {
  state.currentTab = action.payload;
};
