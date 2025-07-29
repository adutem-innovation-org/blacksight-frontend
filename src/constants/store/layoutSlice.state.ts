import {
  BotTabsEnum,
  DashboardTabsEnum,
  SideBarMobileStateEnum,
  SideBarStateEnum,
  TemplateTabsEnum,
} from "@/enums";
import { LayoutState } from "@/interfaces";

export const initialLayoutState: LayoutState = {
  currentTab: DashboardTabsEnum.ANALYTICS,
  sidebarState: SideBarStateEnum.COLLAPSED,
  sidebarMobileState: SideBarMobileStateEnum.HIDDEN,
  activeBotTab: BotTabsEnum.ANALYTICS,
  activeTemplateTab: TemplateTabsEnum.ANALYTICS,
};
