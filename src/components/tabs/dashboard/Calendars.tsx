import { DashboardContent } from "@/components/design";
import React, { useEffect, useState } from "react";
import meetIcon from "@/assets/images/meet.png";
import { CalComAuthPopup, ProviderCard } from "./calendar";
import { useProfile, useStore } from "@/hooks";
import {
  disconnectProvider,
  getConnectedProviders,
  getProfile,
  getProviderAuthUrl,
  resetDisconnectProvider,
  resetGetProviderAuthUrl,
  setConnectingProviderStatus,
} from "@/store";
import { Loader } from "@/components/progress";
import { CalendarProvidersEnum } from "@/enums";
import toast from "react-hot-toast";
import { Provider } from "react-redux";

const CalendarTabHeader = () => {
  return (
    <div>
      <h2 className="font-medium text-2xl text-gray-800 tracking-tighter">
        Connect calender
      </h2>
    </div>
  );
};

const Calendars = () => {
  const { dispatch, getState } = useStore();
  const { fetchingProfile, profileFetched } = getState("Auth");
  const {
    fetchingProviderAuthUrl,
    providerAuthUrlFetched,
    providerAuthUrl,
    fetchProviderAuthUrlError,
    connectingProvider,
    disconnectingProvider,
    providerDisconnected,
    disconnectProviderError,
  } = getState("Calendar");
  const { user } = useProfile([profileFetched]);
  const [calComAuthPopupOpen, setCalComAuthPopupOpen] = useState(false);

  const openCalComAuthPopup = () => setCalComAuthPopupOpen(true);

  const handleConnectProvider = (provider: CalendarProvidersEnum) => {
    switch (provider) {
      case CalendarProvidersEnum.GOOGLE:
        dispatch(setConnectingProviderStatus(true));
        dispatch(getProviderAuthUrl(provider));

        break;
      case CalendarProvidersEnum.CALCOM:
        openCalComAuthPopup();
        break;
      default:
        break;
    }
  };

  const connectGoogle = () =>
    handleConnectProvider(CalendarProvidersEnum.GOOGLE);
  const connectCalCom = () =>
    handleConnectProvider(CalendarProvidersEnum.CALCOM);

  const handleDisconnectProvider = (provider: CalendarProvidersEnum) => {
    dispatch(disconnectProvider(provider));
  };

  const disconnectGoogle = () =>
    handleDisconnectProvider(CalendarProvidersEnum.GOOGLE);

  const disconnectCalCom = () =>
    handleDisconnectProvider(CalendarProvidersEnum.CALCOM);

  useEffect(() => {
    if (providerAuthUrlFetched && providerAuthUrl) {
      const popup = window.open(
        providerAuthUrl,
        "_blank",
        "width=500,height=600"
      );

      const messageListener = (event: MessageEvent) => {
        // if (event.origin !== window.location.origin) return;

        const { provider: returnedProvider, success } = event.data || {};

        if (returnedProvider && success) {
          toast.success("Provider connected successfully");
          popup?.close();
          dispatch(getProfile());
          dispatch(getConnectedProviders());
        } else {
          popup?.close();
        }
        window.removeEventListener("message", messageListener);
        dispatch(setConnectingProviderStatus(false));
        dispatch(resetGetProviderAuthUrl());
      };

      const cleanup = () => {
        window.removeEventListener("message", messageListener);
        if (popupChecker) clearInterval(popupChecker);
      };

      window.addEventListener("message", messageListener);

      const popupChecker = setInterval(() => {
        if (popup?.closed) {
          cleanup();
          dispatch(setConnectingProviderStatus(false));
          dispatch(resetGetProviderAuthUrl());
        }
      }, 500);
    }
  }, [providerAuthUrlFetched]);

  useEffect(() => {
    if (fetchProviderAuthUrlError) {
      toast.error(
        fetchProviderAuthUrlError ?? "An error occured. Please try again later."
      );
      dispatch(resetGetProviderAuthUrl());
      dispatch(setConnectingProviderStatus(false));
    }
  }, [fetchProviderAuthUrlError]);

  useEffect(() => {
    if (providerDisconnected) {
      toast.success("Provider disconnected successfully");
      dispatch(resetDisconnectProvider());
    }
  }, [providerDisconnected]);

  useEffect(() => {
    if (disconnectProviderError) {
      toast.error(
        disconnectProviderError ?? "An error occured. Please try again."
      );
      dispatch(resetDisconnectProvider());
    }
  }, [disconnectProviderError]);

  if (fetchingProfile) return <Loader />;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] xl:grid-cols-3 gap-4">
      {(fetchingProviderAuthUrl ||
        connectingProvider ||
        disconnectingProvider) && <Loader className="bg-[#0000004d]" />}
      <ProviderCard
        name="Google Calendar"
        description="With Google Calendar, you can quickly schedule meetings and events and get reminders about upcoming activities, so you always know what’s next."
        icon={meetIcon}
        connected={user?.hasConnectedGoogleMeet ?? false}
        onConnect={connectGoogle}
        onDisconnect={disconnectGoogle}
      />

      <ProviderCard
        name="Cal.com"
        description="Cal.com is an open-source scheduling platform that allows you to book meetings, appointments, and events with ease. It is designed for individuals, teams and businesses."
        icon="https://cal.com/favicon.ico"
        connected={user?.hasConnectedCalCom ?? false}
        onConnect={connectCalCom}
        onDisconnect={disconnectCalCom}
      />
      {/* <ProviderCard
        name="Microsoft Teams"
        description="Virtually connect one on one, lead a team training, or host an interactive webinar for up to 1,000 attendees. Explore online meetings and webinars."
        icon={teamIcon}
        connected={user?.hasConnectedMicrosoftTeams ?? false}
        onConnect={connectZoom}
        onDisconnect={() => {}}
        comingSoon
      />
      <ProviderCard
        name="Zoom"
        description="Modernize workflows with Zoom's trusted collaboration tools: including video meetings, team chat, VoIP phone, webinars, whiteboard, etc."
        icon={zoomIcon}
        connected={user?.hasConnectedZoomMeet ?? false}
        onConnect={connectTeams}
        onDisconnect={() => {}}
        comingSoon
      /> */}

      <CalComAuthPopup
        isOpen={calComAuthPopupOpen}
        onOpenChange={setCalComAuthPopupOpen}
      />
    </div>
  );
};

export const CalendarsTab = () => {
  return (
    <React.Fragment>
      <DashboardContent>
        <div className="no-scrollbar overflow-hidden flex flex-col flex-1 h-full w-full bg-white rounded-[12px] p-8 gap-10">
          <CalendarTabHeader />

          <div className="flex-1 overflow-auto">
            <Calendars />
          </div>
        </div>
      </DashboardContent>
    </React.Fragment>
  );
};
