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
import { groupedSideTabs, SidebarGroupType, SideTabType } from "@/constants";
import React, { useMemo } from "react";
import man from "@/assets/images/man.png";
import styled from "styled-components";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "../ui/tooltip";
import { useNavigate } from "react-router-dom";

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
          // "p-1 text-gray-900 cursor-pointer bg-gray-100 rounded-sm mx-auto hidden sm:block",
          "p-1 text-gray-900 cursor-pointer bg-white border border-gray-200 rounded-sm mx-auto hidden sm:block",
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
          // "p-1 text-gray-900 cursor-pointer bg-gray-100 rounded-sm hidden sm:block",
          "p-1 text-gray-900 cursor-pointer bg-white border border-gray-200 rounded-sm hidden sm:block",
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

const TabItem = ({ name, iconClass, tabId, path }: SideTabType) => {
  const { dispatch, getState } = useStore();
  const { currentTab, sidebarState } = getState("Layout");
  const navigate = useNavigate();

  const isActiveTab = useMemo(() => currentTab === tabId, [currentTab]);

  const isSidebarCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  const changeCurrentTab = () => {
    dispatch(changeTab(tabId));
    dispatch(changeSidebarMobileState(SideBarMobileStateEnum.HIDDEN));
    navigate(path);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <li
            className={cn(
              "flex flex-start gap-1 items-center cursor-pointer w-full py-2 rounded-[12px] duration-300",
              {
                "bg-gray-200 pl-1": isActiveTab,
                "px-2 py-3 pl-2": isSidebarCollapsed,
                // "hover:bg-gray-100": !isActiveTab,
              }
            )}
            onClick={changeCurrentTab}
          >
            <div className="w-8 rounded-md flex justify-center items-center">
              <i
                className={cn(iconClass, "text-gray-500 flex text-xl", {
                  "text-brand": isActiveTab,
                })}
              ></i>
            </div>
            <span
              className={cn("font-dmsans text-sm text-gray-500 font-semibold", {
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

const SidebarGroup = ({ group }: { group: SidebarGroupType }) => {
  const { getState } = useStore();
  const { sidebarState } = getState("Layout");

  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <div className="flex flex-col gap-2">
      <p
        className={cn("font-dmsans text-base text-gray-700 font-semibold", {
          "sm:hidden": isCollapsed,
        })}
      >
        {group.name}
      </p>
      <ul
        className={cn("flex flex-col gap-1", {
          "items-center": isCollapsed,
        })}
      >
        {group.tabs.map((tab) => (
          <TabItem key={tab.tabId} {...tab} />
        ))}
      </ul>
    </div>
  );
};

const SidebarTabs = () => {
  const { user } = useProfile();
  const { getState } = useStore();
  const { sidebarState } = getState("Layout");

  const userSidebarGroups = useMemo(
    () => (user ? groupedSideTabs[user.userType] : []),
    [user]
  );

  const isCollapsed = sidebarState === SideBarStateEnum.COLLAPSED;

  return (
    <div className="px-5 py-8 overflow-auto h-full no-scrollbar">
      <ul
        className={cn("flex flex-col gap-5", {
          "sm:gap-6 sm:items-center": isCollapsed,
        })}
      >
        {userSidebarGroups.map((group) => (
          <SidebarGroup group={group} />
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

export const GroupedSidebar = () => {
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
