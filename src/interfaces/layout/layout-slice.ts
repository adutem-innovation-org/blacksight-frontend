import { DashboardTabsEnum, SideBarStateEnum } from "@/enums";

export interface LayoutState {
  currentTab: DashboardTabsEnum;
  sidebarState: SideBarStateEnum;
}
