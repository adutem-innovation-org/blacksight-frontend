import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { useProfile, useStore } from "@/hooks";
import { changeSidebarState, changeTab } from "@/store";
import { SideBarStateEnum } from "@/enums";
import { cn } from "@/lib/utils";
import brandLogo from "@/assets/images/blacksight-logo.png";
import { sideTabs, SideTabType } from "@/constants";
import { useMemo } from "react";
import man from "@/assets/images/man.png";

const SidebarHeader = () => {
  const { dispatch, getState } = useStore();
  const { sidebarState } = getState("Layout");

  const expandSidebar = () => {
    dispatch(changeSidebarState(SideBarStateEnum.EXPANDED));
  };

  const collapseSidebar = () => {
    dispatch(changeSidebarState(SideBarStateEnum.COLLAPSED));
  };

  return (
    <div
      className={cn(
        "p-4 flex items-center border-b justify-between border-b-gray-100 gap-4",
        {
          "flex-wrap": sidebarState === SideBarStateEnum.COLLAPSED,
        }
      )}
    >
      <div className="flex items-center gap-2">
        <div className={cn("w-12 h-12 p-2 bg-gray-100 rounded-[12px]")}>
          <img src={brandLogo} alt="" className="w-full h-full" />
        </div>
        <p
          className={cn("text-gray-900 text-sm", {
            hidden: sidebarState === SideBarStateEnum.COLLAPSED,
          })}
        >
          Blacksight
        </p>
      </div>

      <button
        className={cn(
          "p-1 text-gray-900 cursor-pointer bg-gray-100 rounded-sm mx-auto",
          {
            hidden: sidebarState === SideBarStateEnum.EXPANDED,
          }
        )}
        onClick={expandSidebar}
      >
        <ChevronRight />
      </button>
      <button
        className={cn(
          "p-1 text-gray-900 cursor-pointer bg-gray-100 rounded-sm",
          {
            hidden: sidebarState === SideBarStateEnum.COLLAPSED,
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

  const changeCurrentTab = () => dispatch(changeTab(tabId));

  return (
    <button
      type="button"
      className={cn(
        "flex flex-start gap-2 items-center cursor-pointer w-full rounded-xl px-2 py-1 transition-colors hover:bg-gray-100 duration-500",
        {
          "bg-gray-100": isActiveTab,
        }
      )}
      onClick={changeCurrentTab}
    >
      <div className="h-10 w-10 rounded-md flex justify-center items-center">
        <i
          className={cn(iconClass, "text-gray-800 flex text-2xl", {
            "text-brand": isActiveTab,
          })}
        ></i>
      </div>
      <span
        className={cn("font-sfpro text-base text-gray-800", {
          "text-brand": isActiveTab,
          hidden: sidebarState === SideBarStateEnum.COLLAPSED,
        })}
      >
        {name}
      </span>
    </button>
  );
};

const SidebarTabs = () => {
  const { user } = useProfile();

  const userSideTabs = useMemo(
    () => (user ? sideTabs[user.userType] : []),
    [user]
  );

  return (
    <div className="p-4 overflow-auto h-full bg-red">
      <div className={cn("flex flex-col items-center gap-3")}>
        {userSideTabs.map((tab) => (
          <TabItem {...tab} />
        ))}
      </div>
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
          <div className={cn({ hidden: isSidederCollapsed })}>
            <h4 className="font-semibold text-sm text-gray-800 mb-0.5 overflow-hidden text-ellipsis">
              {user?.firstName} {user?.lastName}
            </h4>
            <p className="text-xs max-w-32 text-ellipsis overflow-hidden text-gray-800">
              {user?.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          className={cn("text-gray-300", { hidden: isSidederCollapsed })}
        >
          <EllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  return (
    // Removed rounded-2xl
    <div className="w-full h-full bg-white md:flex flex-col hidden overflow-hidden">
      <SidebarHeader />
      <SidebarTabs />
      <SidebarFooter />
    </div>
  );
};
