import {
  BotTabsEnum,
  DashboardTabsEnum,
  SideBarMobileStateEnum,
  SideBarStateEnum,
} from "@/enums";

export interface LayoutState {
  currentTab: DashboardTabsEnum;
  sidebarState: SideBarStateEnum;
  sidebarMobileState: SideBarMobileStateEnum;
  activeBotTab: BotTabsEnum;
}
