import {
  Dashboard,
  ForgotPassword,
  Login,
  Logout,
  Register,
  ResetPassword,
  VerifyAccount,
} from "@/pages";
import { JSX } from "react";

type RouteType = { path: string; Element: () => JSX.Element };

export const authenticationPages: RouteType[] = [
  {
    path: "signin",
    Element: Login,
  },
  {
    path: "signup",
    Element: Register,
  },
  {
    path: "verify-email",
    Element: VerifyAccount,
  },
  {
    path: "logout",
    Element: Logout,
  },
  {
    path: "forgot-password",
    Element: ForgotPassword,
  },
  {
    path: "reset-password",
    Element: ResetPassword,
  },
];

export const privatePages: RouteType[] = [
  {
    path: "/dashboard",
    Element: Dashboard,
  },
];
