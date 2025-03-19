import { DashboardTabs, Sidebar } from "@/components";
import { SideBarStateEnum } from "@/enums";
import { useStore } from "@/hooks";
import styled from "styled-components";

export const Dashboard = () => {
  const { getState } = useStore();
  const { sidebarState } = getState("Layout");

  return (
    <div className="w-dvw h-dvh bg-gray-100 overflow-hidden">
      <DashboardLayoutContainer
        sidebarState={sidebarState}
        className="w-full h-full grid grid-rows-1"
      >
        <Sidebar />
        <DashboardTabs />
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

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
