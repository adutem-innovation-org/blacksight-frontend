import { useProfile, useStore } from "@/hooks";
import { AddressInfo, HeroSection, PersonalInfo } from "./my-profile";

export const MyProfile = () => {
  const { user } = useProfile();

  return (
    <div className="px-8 py-4">
      <h4 className="font-semibold text-xl text-gray-800 mb-8">My Profile</h4>
      <div className="flex flex-col gap-6">
        <HeroSection user={user} />
        <PersonalInfo user={user} />
        <AddressInfo user={user} />
      </div>
    </div>
  );
};
