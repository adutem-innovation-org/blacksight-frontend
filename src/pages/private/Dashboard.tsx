import { DashboardTabs, Sidebar } from "@/components";
import { SideBarMobileStateEnum, SideBarStateEnum } from "@/enums";
import { useStore } from "@/hooks";
import { changeSidebarMobileState } from "@/store";
import { LayoutDashboard } from "lucide-react";
import styled from "styled-components";

export const Dashboard = () => {
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

        <div className="w-full h-full overflow-auto">
          {/* Mobile header */}
          <div className="sm:hidden flex p-4 bg-white mb-4 left-0 right-0 top-0 fixed h-20 z-35">
            <button onClick={showSidebar}>
              <LayoutDashboard />
            </button>
          </div>

          {/* Dashboard header */}
          <div className="hidden sm:flex h-20 bg-white border-l items-center px-4 sticky top-0 z-20">
            <h2 className="capitalize font-urbanist font-semibold text-2xl sm:text-3xl text-brand">
              {currentTab}
            </h2>
          </div>

          {/* Dashboard tabs */}
          <DashboardTabs />
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
      ? "80px 1fr"
      : "250px 1fr"};

  transition: 0.4s ease;

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
