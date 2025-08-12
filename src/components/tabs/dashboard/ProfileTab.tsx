import { DashboardContent, DashboardTableLayoutDiv } from "@/components/design";
import React, { useEffect, useState } from "react";
import { ProfileSideMenu } from "./profile/ProfileSideMenu";
import { ProfileTabs } from "./profile/ProfileTabs";
import { ProfileTabsEnum } from "@/enums";
import { cn } from "@/lib/utils";
import {
  CoverImage,
  BusinessContactInfo,
  ProfileAboutSection,
  ProfileHeader,
  ProfileTopTab,
  PersonalAddressInfo,
  AboutBusiness,
} from "./profile-tab";
import { useProfile, useStore } from "@/hooks";
import { getAnalytics } from "@/store";

export const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState(ProfileTabsEnum.OVERVIEW);
  const { dispatch, getState } = useStore();
  const { analytics, fetchingAnalytics, analyticsFetched } =
    getState("Analytics");
  const { user } = useProfile();

  useEffect(() => {
    if (user && !analytics && !fetchingAnalytics) {
      dispatch(getAnalytics(user.userType));
    }
  }, [user]);

  return (
    <React.Fragment>
      <DashboardContent
        className="p-0"
        style={{
          height: "calc(100dvh - 60px)",
        }}
      >
        {/* <DashboardTableLayoutDiv className="no-scrollbar overflow-hidden">
          <div>
            <h2 className="font-medium text-2xl text-gray-800">
              Account Settings
            </h2>
          </div>

          <div className="bg-white w-full flex-1 rounded-md grid grid-cols-[234px_1fr] overflow-hidden grid-rows-1">
            <ProfileSideMenu
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="">
              <ProfileTabs activeTab={activeTab} />
            </div>
          </div>
        </DashboardTableLayoutDiv> */}
        <div className="flex-1 flex flex-col overflow-y-auto h-full no-scrollbar">
          <div className={cn("w-full flex-1 no-scrollbar")}>
            {/* Cover image */}
            <CoverImage />

            {/* Page content container */}
            <div className="px-6 pt-6 relative z-10 mt-3">
              <ProfileHeader />
              <ProfileTopTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 pb-6">
                <div className="col-span-1 flex flex-col gap-4">
                  <ProfileAboutSection />
                  <PersonalAddressInfo />
                </div>
                <div className="col-span-1 xl:col-span-3 flex flex-col gap-4">
                  <AboutBusiness />
                  <BusinessContactInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
