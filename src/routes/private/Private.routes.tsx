import { Loader } from "@/components";
import { UserTypes } from "@/enums";
import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthorized, isOnboarded, skippedOnboarding, loading, userRole } =
    useAuth();

  if (!isAuthorized && !loading) {
    return <Navigate to={`/${userRole || "user"}/signin`} replace={true} />;
  }

  if (!sessionStorage.getItem("blacksight_access_token")) {
    return <Navigate to={`/${userRole || "user"}/signin`} replace />;
  }

  if (
    (isOnboarded || skippedOnboarding) &&
    isAuthorized &&
    !loading &&
    location.pathname !== "/dashboard"
  ) {
    return <Navigate to={"/dashboard"} />;
  }

  if (
    !isOnboarded &&
    !skippedOnboarding &&
    isAuthorized &&
    !loading &&
    userRole === UserTypes.USER &&
    location.pathname !== "/onboard"
  ) {
    return <Navigate to={"/onboard"} replace />;
  }

  if (loading) {
    return <Loader className="w-dvw h-dvh" />;
  }

  return <Outlet />;
};
