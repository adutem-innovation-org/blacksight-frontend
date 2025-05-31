import { Button, NotificationDropdown } from "@/components";
import { useProfile, useStore } from "@/hooks";
import man from "@/assets/images/man.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { changeTab, logout } from "@/store";
import { DashboardTabsEnum } from "@/enums";

type Props = {
  currentTab: string;
};

export const DashboardHeader = ({ currentTab }: Props) => {
  return (
    <div className="hidden sm:flex justify-between min-h-20 bg-white border-b border-b-gray-200 items-center px-4 sticky top-0 z-20">
      <h2 className="capitalize font-inter font-semibold text-xl sm:text-2xl text-brand">
        {currentTab}
      </h2>

      {/* Right header content */}
      <div className="flex items-center gap-3">
        <NotificationDropdown />

        <HeaderDropDown />
      </div>
    </div>
  );
};

const HeaderDropDown = () => {
  const { user } = useProfile();
  const { dispatch } = useStore();

  const openProfileTab = () => {
    dispatch(changeTab(DashboardTabsEnum.PROFILE));
  };

  const openAnalyticsTab = () => {
    dispatch(changeTab(DashboardTabsEnum.ANALYTICS));
  };

  const logoutUser = () => {
    dispatch(logout());
    location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <div className="rounded-full overflow-hidden w-9 h-9 bg-brand">
          <img
            className="w-full h-full object-cover"
            src={user?.imageUrl || man}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[240px] max-w-max">
        <div className="flex gap-1.5 items-center p-2">
          <div className="rounded-full overflow-hidden w-12 h-12 bg-brand">
            <img
              className="w-full h-full object-cover"
              src={user?.imageUrl || man}
            />
          </div>
          <div>
            <p className="text-sm font-semibold font-inter mb-0.5 text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs font-medium text-gray-400 font-inter">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="m-2 p-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer rounded-md"
          onClick={openAnalyticsTab}
        >
          <i className="fi fi-rr-house-chimney-crack flex text-lg"></i>
          <span className="font-dmsans text-sm font-medium">Home</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="m-2 p-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer rounded-md"
          onClick={openProfileTab}
        >
          <i className="fi fi-rr-settings flex text-lg"></i>
          <span className="font-dmsans text-sm font-medium">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="m-2 p-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer rounded-md"
          onClick={logoutUser}
        >
          <i className="fi fi-rr-leave flex text-lg"></i>
          <span className="font-dmsans text-sm font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
