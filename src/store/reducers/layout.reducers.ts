import {
  BotTabsEnum,
  DashboardTabsEnum,
  SideBarMobileStateEnum,
  SideBarStateEnum,
  TemplateTabsEnum,
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

export const changeBotTabReducer = (
  state: LayoutState,
  action: PayloadAction<BotTabsEnum>
) => {
  state.activeBotTab = action.payload;
};

export const changeTemplateTabReducer = (
  state: LayoutState,
  action: PayloadAction<TemplateTabsEnum>
) => {
  state.activeTemplateTab = action.payload;
};
