import { getAuthUser } from "@/helpers";
import { UserData } from "@/interfaces";
import { useEffect, useState } from "react";

export const useProfile = (deps?: any[]) => {
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
  }, deps ?? []);

  return { user, loadingProfile };
};
