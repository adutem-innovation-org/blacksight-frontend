import { DashboardContent, DashboardTableLayoutDiv } from "@/components/design";
import React, { useState } from "react";
import { ProfileSideMenu } from "./profile/ProfileSideMenu";
import { ProfileTabs } from "./profile/ProfileTabs";
import { ProfileTabsEnum } from "@/enums";

export const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState(ProfileTabsEnum.MY_PROFILE);

  return (
    <React.Fragment>
      <DashboardContent>
        <DashboardTableLayoutDiv className="no-scrollbar overflow-hidden">
          <div>
            <h2 className="font-medium text-2xl text-gray-800">
              Account Settings
            </h2>
          </div>

          {/* Content */}
          <div className="bg-white w-full flex-1 rounded-md grid grid-cols-[234px_1fr] overflow-hidden grid-rows-1">
            <ProfileSideMenu
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="">
              <ProfileTabs activeTab={activeTab} />
            </div>
          </div>
        </DashboardTableLayoutDiv>
      </DashboardContent>
    </React.Fragment>
  );
};
