import { Button } from "@/components/form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { NotificationTabEnums } from "@/enums";
import { CheckCheck, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { EmptyNotification, NotificationTopTab } from "./notification";

const NotificationFooter = () => {
  return (
    <div className="h-10 flex justify-end items-center">
      <Button
        className="text-brand h-auto p-1 hover:text-brand flex items-center gap-1.5 !font-bold font-urbanist tracking-tight"
        variant={"ghost"}
      >
        <CheckCheck className="!w-5 !h-5" />
        Mark all as read
      </Button>
    </div>
  );
};

const NotificationsTabs = ({
  activeTab,
}: {
  activeTab: NotificationTabEnums;
}) => {
  return (
    <div className="flex-1 overflow-auto basis-[200px]">
      <EmptyNotification />
    </div>
  );
};

const NotificationHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-medium">Notifications</p>
      <Button className="bg-transparent cursor-pointer outline-none border-none text-primary py-2 pl-2 pr-0 w-auto h-auto">
        <RefreshCcw />
      </Button>
    </div>
  );
};

export const NotificationDropdown = () => {
  const [activeTab, setActiveTab] = useState<NotificationTabEnums>(
    NotificationTabEnums.ALL
  );

  const changeTab = (tab: NotificationTabEnums) => {
    setActiveTab(tab);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer bg-transparent flex items-center justify-center text-brand h-10 w-10 duration-300 border border-transparent hover:border-brand/30 hover:bg-gray-100 rounded-[12px]">
        <i className="fi fi-rr-bell text-2xl flex"></i>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[300px] w-[400px] max-w-[500px] px-4 pb-4 pt-2 rounded-2xl overflow-hidden"
        style={{ maxHeight: "calc(100dvh - 160px)" }}
      >
        <div className="flex flex-col gap-2">
          <NotificationHeader />
          <NotificationTopTab activeTab={activeTab} changeTab={changeTab} />
          <NotificationsTabs activeTab={activeTab} />
          <NotificationFooter />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
