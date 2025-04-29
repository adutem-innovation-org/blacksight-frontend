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
        <DashboardTableLayoutDiv className="no-scrollbar overflow-auto">
          <div>
            <h2 className="font-medium text-2xl text-gray-800">
              Account Settings
            </h2>
          </div>

          {/* Content */}
          <div className="bg-white w-full h-full rounded-md p-6 grid grid-cols-[180px_1fr]">
            <ProfileSideMenu
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div>
              <ProfileTabs activeTab={activeTab} />
            </div>
          </div>
        </DashboardTableLayoutDiv>
      </DashboardContent>
    </React.Fragment>
  );
};
