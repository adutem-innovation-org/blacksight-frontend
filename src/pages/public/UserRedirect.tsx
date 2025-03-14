import { UserTypes } from "@/enums";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { NotFound } from "./NotFound";

export const UserRedirect = () => {
  const params = useParams();
  const location = useLocation();

  if (!Object.values(UserTypes).includes(params?.basePath as UserTypes))
    return <NotFound />;

  if (location.pathname === "/admin/signup")
    return <Navigate to={"/admin/signin"} replace />;

  return <Outlet />;
};
