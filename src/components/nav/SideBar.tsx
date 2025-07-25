import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { useProfile, useStore } from "@/hooks";
import {
  changeSidebarMobileState,
  changeSidebarState,
  changeTab,
} from "@/store";
import { SideBarMobileStateEnum, SideBarStateEnum } from "@/enums";
import { cn } from "@/lib/utils";
import brandLogo from "@/assets/images/blacksight_logo_side.png";
import brandLogoVertical from "@/assets/images/blacksight_logo.png";
import { sideTabs, SideTabType } from "@/constants";
import React, { useMemo } from "react";
import man from "@/assets/images/man.png";
import styled from "styled-components";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "../ui/tooltip";

const SidebarHeader = () => {
  const { dispatch, getState } = useStore();
  const { sidebarState } = getState("Layout");

  const isSidebarCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  const expandSidebar = () => {
    dispatch(changeSidebarState(SideBarStateEnum.EXPANDED));
  };

  const collapseSidebar = () => {
    dispatch(changeSidebarState(SideBarStateEnum.COLLAPSED));
  };

  return (
    <div
      className={cn("p-4 px-5 flex items-center justify-between gap-4", {
        "flex-wrap": isSidebarCollapsed,
      })}
    >
      <div
        className={cn("h-12 flex items-center", {
          "mx-auto": isSidebarCollapsed,
        })}
      >
        {isSidebarCollapsed ? (
          <img
            src={brandLogoVertical}
            alt=""
            className="w-full object-contain h-8"
          />
        ) : (
          <img src={brandLogo} alt="" className="w-full object-contain h-8" />
        )}
      </div>

      <button
        className={cn(
          "p-1 text-gray-900 cursor-pointer bg-gray-100 rounded-sm mx-auto hidden sm:block",
          {
            "sm:hidden": sidebarState === SideBarStateEnum.EXPANDED,
          }
        )}
        onClick={expandSidebar}
      >
        <ChevronRight />
      </button>
      <button
        className={cn(
          "p-1 text-gray-900 cursor-pointer bg-gray-100 rounded-sm hidden sm:block",
          {
            "sm:hidden": sidebarState === SideBarStateEnum.COLLAPSED,
          }
        )}
        onClick={collapseSidebar}
      >
        <ChevronLeft />
      </button>
    </div>
  );
};

const TabItem = ({ name, iconClass, tabId }: SideTabType) => {
  const { dispatch, getState } = useStore();
  const { currentTab, sidebarState } = getState("Layout");

  const isActiveTab = useMemo(() => currentTab === tabId, [currentTab]);

  const isSidebarCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  const changeCurrentTab = () => {
    dispatch(changeTab(tabId));
    dispatch(changeSidebarMobileState(SideBarMobileStateEnum.HIDDEN));
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <li
            className={cn(
              "flex flex-start gap-2 items-center cursor-pointer w-full px-2 py-3 rounded-[12px] duration-300",
              {
                "bg-gray-200": isActiveTab,
                "px-4 py-4": isSidebarCollapsed,
                // "hover:bg-gray-100": !isActiveTab,
              }
            )}
            onClick={changeCurrentTab}
          >
            <div className="w-10 rounded-md flex justify-center items-center">
              <i
                className={cn(iconClass, "text-gray-800 flex text-2xl", {
                  "text-brand": isActiveTab,
                })}
              ></i>
            </div>
            <span
              className={cn("font-dmsans text-sm text-gray-800 font-semibold", {
                "text-brand": isActiveTab,
                "sm:hidden": isSidebarCollapsed,
              })}
            >
              {name}
            </span>
          </li>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SidebarTabs = () => {
  const { user } = useProfile();

  const userSideTabs = useMemo(
    () => (user ? sideTabs[user.userType] : []),
    [user]
  );

  return (
    <div className="px-5 py-8 overflow-auto h-full bg-red">
      <ul className={cn("flex flex-col items-center gap-2")}>
        {userSideTabs.map((tab) => (
          <TabItem {...tab} />
        ))}
      </ul>
    </div>
  );
};

const SidebarFooter = () => {
  const { user } = useProfile();
  const { getState } = useStore();
  const { sidebarState } = getState("Layout");

  const isSidederCollapsed = useMemo(
    () => sidebarState === SideBarStateEnum.COLLAPSED,
    [sidebarState]
  );
  return (
    <div className="mt-auto p-4 border-t border-t-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex gap-2.5 items-center">
          <div className="w-12 h-12 rounded-[6px] overflow-hidden bg-gray-100">
            <img
              src={user?.imageUrl || man}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={cn({ "sm:*:hidden": isSidederCollapsed })}>
            <h4 className="font-semibold text-sm text-gray-800 mb-0.5 overflow-hidden text-ellipsis max-w-32 whitespace-nowrap">
              {user?.firstName} {user?.lastName}
            </h4>
            <p className="text-xs max-w-32 text-ellipsis overflow-hidden text-gray-800">
              {user?.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          className={cn("text-gray-800", { "sm:hidden": isSidederCollapsed })}
        >
          <EllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const { getState, dispatch } = useStore();
  const { sidebarMobileState } = getState("Layout");

  const hideSidebar = () =>
    dispatch(changeSidebarMobileState(SideBarMobileStateEnum.HIDDEN));

  return (
    // Removed rounded-2xl
    <React.Fragment>
      {sidebarMobileState === SideBarMobileStateEnum.VISIBLE && (
        <button
          className="w-dvw h-dvh bg-black opacity-30 sm:hidden fixed top-0 right-0 left-0 bottom-0 z-40"
          onClick={hideSidebar}
        ></button>
      )}
      <SidebarContainer
        className={
          "w-[250px] sm:w-full h-full bg-white flex flex-col overflow-hidden fixed sm:relative top-0 bottom-0 left-0 shadow-2xl sm:shadow-none rounded-r-3xl sm:rounded-none sm:border-r sm:border-r-gray-200"
        }
        hiddenState={sidebarMobileState === SideBarMobileStateEnum.HIDDEN}
      >
        <SidebarHeader />
        <SidebarTabs />
        {/* <SidebarFooter /> */}
      </SidebarContainer>
    </React.Fragment>
  );
};

const SidebarContainer = styled.div<{ hiddenState: boolean }>`
  @media screen and (max-width: 640px) {
    transform: translateX(${(props) => (props.hiddenState ? "-250px" : "0px")});
    transition: 0.4s ease;
    z-index: 100;
  }
`;
