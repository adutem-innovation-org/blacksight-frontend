import { AuthApiService } from "@/apis";
import { UserTypes } from "@/enums";
import { UserData } from "@/interfaces";
import { useEffect, useState } from "react";
import { useStore } from "./useStore";

export const useAuth = () => {
  const { getState } = useStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserTypes | null>(null);
  const { onboarded } = getState("Auth");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authApiService = AuthApiService.getInstance();
        const response = await authApiService.getCurrentSession();
        if (response.success) {
          setIsAuthorized(true);
          setIsOnboarded(response.user.isOnboarded);
          setUserRole(response.user.userType);
          sessionStorage.setItem(
            "blacksight_auth_user",
            JSON.stringify(response.user)
          );
        }
      } catch (error) {
        setIsAuthorized(false);
        setIsOnboarded(false);
        const storedUser = sessionStorage.getItem("blacksight_auth_user");
        if (storedUser) {
          const storedUserJSON = JSON.parse(storedUser) as UserData;
          setUserRole(storedUserJSON.userType);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [onboarded]);

  return { isAuthorized, isOnboarded, loading, userRole };
};
