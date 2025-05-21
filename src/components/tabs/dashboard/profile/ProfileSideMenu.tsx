import { profileTabs } from "@/constants";
import { ProfileTabsEnum } from "@/enums";
import { cn } from "@/lib/utils";

type Props = {
  activeTab: ProfileTabsEnum;
  setActiveTab: (tabId: ProfileTabsEnum) => void;
};

export const ProfileSideMenu = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="border-r border-r-gray-200 py-6 pl-6">
      <ul className="flex flex-col gap-2">
        {profileTabs.map((tab) => (
          <li
            onClick={() => setActiveTab(tab.tabId)}
            className={cn(
              "py-3 px-5 rounded-full text-gray-800 w-max cursor-pointer font-medium",
              {
                "bg-brand-10 text-brand": activeTab === tab.tabId,
              }
            )}
          >
            {tab.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
