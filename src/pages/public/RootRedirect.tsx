import { Navigate } from "react-router-dom";

export const RootRedirect = () => {
  return <Navigate to={"/user/signin"} />;
};
