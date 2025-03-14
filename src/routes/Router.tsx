import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./public";
import { privatePages } from "@/constants";
import { PrivateRoute } from "./private/Private.routes";
import { NotFound, RootRedirect, UserRedirect } from "@/pages";

export const Router = () => {
  return (
    <Routes>
      <Route path=":basePath" element={<UserRedirect />}>
        {PublicRoute()}
      </Route>
      <Route path="/" element={<RootRedirect />} />
      <Route element={<PrivateRoute />}>
        {privatePages.map(({ path, Element }) => (
          <Route path={path} element={<Element />} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
