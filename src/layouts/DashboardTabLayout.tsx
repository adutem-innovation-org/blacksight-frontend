import { DashboardTabs, Sidebar } from "@/components";
import { SideBarMobileStateEnum, SideBarStateEnum } from "@/enums";
import { useStore } from "@/hooks";
import { changeSidebarMobileState } from "@/store";
import { LayoutDashboard } from "lucide-react";
import styled from "styled-components";
import { DashboardHeader } from "./Header";
import { PropsWithChildren } from "react";

export const DashboardTabLayout = (props: PropsWithChildren) => {
  const { getState, dispatch } = useStore();
  const { sidebarState, currentTab } = getState("Layout");

  const showSidebar = () =>
    dispatch(changeSidebarMobileState(SideBarMobileStateEnum.VISIBLE));

  return (
    <div className="w-dvw h-dvh bg-gray-100 overflow-hidden">
      <DashboardLayoutContainer
        sidebarState={sidebarState}
        className="w-full h-full grid grid-rows-1"
      >
        <Sidebar />

        <div className="w-full flex flex-col h-full overflow-hidden">
          {/* Mobile header */}
          <div className="sm:hidden flex p-4 bg-white mb-4 left-0 right-0 top-0 fixed h-20 z-35">
            <button onClick={showSidebar}>
              <LayoutDashboard />
            </button>
          </div>
          {/* Dashboard header */}
          <DashboardHeader currentTab={currentTab} />

          {/* Dashboard content */}
          <div className="w-full h-full overflow-hidden">{props.children}</div>
        </div>
      </DashboardLayoutContainer>
    </div>
  );
};

const DashboardLayoutContainer = styled.div<{
  sidebarState: SideBarStateEnum;
}>`
  grid-template-columns: ${(props) =>
    props.sidebarState === SideBarStateEnum.COLLAPSED
      ? "100px 1fr"
      : "280px 1fr"};

  transition: 0.1s ease;

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
