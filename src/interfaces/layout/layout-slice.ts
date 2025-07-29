import {
  BotTabsEnum,
  DashboardTabsEnum,
  SideBarMobileStateEnum,
  SideBarStateEnum,
  TemplateTabsEnum,
} from "@/enums";

export interface LayoutState {
  currentTab: DashboardTabsEnum;
  sidebarState: SideBarStateEnum;
  sidebarMobileState: SideBarMobileStateEnum;
  activeBotTab: BotTabsEnum;
  activeTemplateTab: TemplateTabsEnum;
}
