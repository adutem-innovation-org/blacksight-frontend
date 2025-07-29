import { Loader } from "@/components";
import { pathToTabMap, privatePagesMap } from "@/constants";
import { UserTypes } from "@/enums";
import { useAuth, useStore } from "@/hooks";
import { changeTab } from "@/store";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthorized, isOnboarded, skippedOnboarding, loading, userRole } =
    useAuth();
  const location = useLocation();
  const { dispatch } = useStore();

  useEffect(() => {
    if (
      userRole &&
      privatePagesMap[userRole].includes(location.pathname) &&
      location.pathname !== "/onboard"
    ) {
      dispatch(changeTab(pathToTabMap[location.pathname]));
    }
  }, [location, userRole]);

  if (!isAuthorized && !loading) {
    return <Navigate to={`/${userRole || "user"}/signin`} replace={true} />;
  }

  if (!sessionStorage.getItem("blacksight_access_token")) {
    return <Navigate to={`/${userRole || "user"}/signin`} replace />;
  }

  if (location.pathname === "/onboard" && (isOnboarded || skippedOnboarding)) {
    window.location.replace("/dashboard");
    return <Loader />;
  }

  // if (
  //   (isOnboarded || skippedOnboarding) &&
  //   isAuthorized &&
  //   !loading &&
  //   // location.pathname !== "/dashboard"
  // userRole && privatePagesMap[userRole].includes(location.pathname)
  // ) {
  //   // return <Navigate to={"/dashboard"} />;
  //   return <Navigate to={location.pathname} />;
  // }

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

  if (userRole && !privatePagesMap[userRole].includes(location.pathname)) {
    window.location.replace("/dashboard");
    return <Loader />;
  }

  if (loading) {
    return <Loader className="w-dvw h-dvh" />;
  }

  return <Outlet />;
};
