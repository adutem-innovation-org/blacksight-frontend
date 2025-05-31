import { getAuthUser } from "@/helpers";
import { UserData } from "@/interfaces";
import { useEffect, useState } from "react";
import { useStore } from "./useStore";

export const useProfile = (deps?: any[]) => {
  const { getState } = useStore();
  const { profileFetched, profileUpdated, addressUpdated } = getState("Auth");
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = () => {
      try {
        setLoadingProfile(true);
        const userData = getAuthUser();
        setUser(userData);
      } catch (error) {
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, deps ?? [profileFetched, profileUpdated, addressUpdated]);

  return { user, loadingProfile };
};
