import { DashboardContent } from "@/components/design";
import React from "react";
import meetIcon from "@/assets/images/meet.png";
import teamIcon from "@/assets/images/team.png";
import zoomIcon from "@/assets/images/zoom.png";
import { ProviderCard } from "./provider";
import { useProfile, useStore } from "@/hooks";

const ProviderTabHeader = () => {
  return (
    <div>
      <h2 className="font-medium text-2xl text-gray-800 tracking-tighter">
        Connect meeting providers
      </h2>
    </div>
  );
};

const Providers = () => {
  const { user } = useProfile();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] xl:grid-cols-3 gap-4">
      <ProviderCard
        name="Google Meet"
        description=" Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers"
        icon={meetIcon}
        connected={user?.hasConnectedGoogleMeet ?? false}
      />
      <ProviderCard
        name="Microsoft Teams"
        description="Virtually connect one on one, lead a team training, or host an interactive webinar for up to 1,000 attendees. Explore online meetings and webinars."
        icon={teamIcon}
        connected={user?.hasConnectedZoomMeet ?? false}
      />
      <ProviderCard
        name="Zoom"
        description="Modernize workflows with Zoom's trusted collaboration tools: including video meetings, team chat, VoIP phone, webinars, whiteboard, etc."
        icon={zoomIcon}
        connected={user?.hasConnectedZoomMeet ?? false}
      />
    </div>
  );
};

export const ProvidersTab = () => {
  return (
    <React.Fragment>
      <DashboardContent>
        <div className="no-scrollbar overflow-hidden flex flex-col flex-1 h-full w-full bg-white rounded-[12px] p-8 gap-10">
          <ProviderTabHeader />

          <div className="flex-1 overflow-auto">
            <Providers />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
