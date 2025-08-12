import man from "@/assets/images/man.png";
import { useProfile, useStore } from "@/hooks";
import { UserAnalytics } from "@/interfaces";
import { MapPinCheckInside } from "lucide-react";

export const ProfileHeader = () => {
  const { getState } = useStore();
  const { analytics } = getState("Analytics");

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row lg:justify-between">
        <MyProfile />
        <ProfileAnalytics analytics={analytics} />
      </div>
    </div>
  );
};

const MyProfile = () => {
  const { user } = useProfile();

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 sm:items-center">
      {/* Image */}
      <div className="rounded-full overflow-hidden p-1 w-24 h-24 bg-white">
        <img
          src={user?.imageUrl || man}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* User details */}
      <div className="flex flex-col">
        <h4 className="text-white font-medium text-2xl">
          {user?.firstName} {user?.lastName}
        </h4>
        <p className="text-gray-100 font-light text-sm">Owner & Founder</p>
        {(user?.addressInfo?.country || user?.addressInfo?.city) && (
          <p className="mt-3 text-gray-400 text-sm flex gap-1 items-center">
            <MapPinCheckInside className="w-4 h-4" />
            {`${user?.addressInfo?.city},`} {user?.addressInfo?.country}
          </p>
        )}
      </div>
    </div>
  );
};

const ProfileAnalytics = ({ analytics }: { analytics: UserAnalytics }) => {
  return (
    <div className="flex gap-8 items-start">
      <div className="flex flex-col items-start lg:items-center ">
        <h4 className="text-white font-medium text-2xl">
          {analytics?.data.totalAppointments ?? 0}
        </h4>
        <p className="text-gray-400 text-sm">Appointments</p>
      </div>
      <div className="flex flex-col items-start lg:items-center ">
        <h4 className="text-white font-medium text-2xl">
          {analytics?.data.totalReminders ?? 0}
        </h4>
        <p className="text-gray-400 text-sm">Reminders</p>
      </div>
    </div>
  );
};
