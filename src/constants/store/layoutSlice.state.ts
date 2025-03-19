import { DashboardTabsEnum, SideBarStateEnum } from "@/enums";
import { LayoutState } from "@/interfaces";

export const initialLayoutState: LayoutState = {
  currentTab: DashboardTabsEnum.ANALYTICS,
  sidebarState: SideBarStateEnum.COLLAPSED,
};
