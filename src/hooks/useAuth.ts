import { AuthApiService } from "@/apis";
import { UserTypes } from "@/enums";
import { UserData } from "@/interfaces";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserTypes | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authApiService = AuthApiService.getInstance();
        const response = await authApiService.getCurrentSession();
        if (response.success) {
          setIsAuthorized(true);
          setUserRole(response.user.userType);
          sessionStorage.setItem(
            "blacksight_auth_user",
            JSON.stringify(response.user)
          );
        }
      } catch (error) {
        setIsAuthorized(false);
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
  }, []);

  return { isAuthorized, loading, userRole };
};
