import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./public";
import { privatePages } from "@/constants";
import { PrivateRoute } from "./private/Private.routes";
import { NotFound, RootRedirect, UserRedirect } from "@/pages";
import { DashboardTabLayout } from "@/layouts";

export const Router = () => {
  return (
    <Routes>
      <Route path=":basePath" element={<UserRedirect />}>
        {PublicRoute()}
      </Route>
      <Route path="/" element={<RootRedirect />} />
      <Route element={<PrivateRoute />}>
        {privatePages.map(({ path, Element }) =>
          path === "/onboard" ? (
            <Route path={path} element={<Element />} />
          ) : (
            <Route
              path={path}
              element={
                <DashboardTabLayout>
                  <Element />
                </DashboardTabLayout>
              }
            />
          )
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
