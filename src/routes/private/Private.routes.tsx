import { Loader } from "@/components";
import { useAuth } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthorized, loading, userRole } = useAuth();

  if (!isAuthorized && !loading) {
    return <Navigate to={`/${userRole || "user"}/signin`} replace={true} />;
  }

  if (!sessionStorage.getItem("blacksight_access_token")) {
    return <Navigate to={`/${userRole || "user"}/signin`} replace />;
  }

  if (loading) {
    return <Loader className="w-dvw h-dvh" />;
  }

  return <Outlet />;
};
