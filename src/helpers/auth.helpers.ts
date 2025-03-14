import { UserData } from "@/interfaces";

export const saveSession = (token: string, user: UserData) => {
  sessionStorage.setItem("blacksight_auth_user", JSON.stringify(user));
  sessionStorage.setItem("blacksight_access_token", token);
};

export const getAuthUser = (): UserData | null => {
  const userJSON = sessionStorage.getItem("blacksight_auth_user");
  if (!userJSON) return null;
  const userData = JSON.parse(userJSON);
  return userData;
};
