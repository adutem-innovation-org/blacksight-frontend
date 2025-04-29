import { AuthApiService } from "@/apis";
import { UserData } from "@/interfaces";

export const saveSession = (token: string, user: UserData) => {
  sessionStorage.setItem("blacksight_auth_user", JSON.stringify(user));
  sessionStorage.setItem("blacksight_access_token", token);
};

export const clearSession = () => {
  sessionStorage.removeItem("blacksight_auth_user");
  sessionStorage.removeItem("blacksight_access_token");
};

export const getAuthUser = (): UserData | null => {
  const userJSON = sessionStorage.getItem("blacksight_auth_user");
  if (!userJSON) return null;
  const userData = JSON.parse(userJSON);
  return userData;
};

export const getOAuthReqBody = async (access_token: string) => {
  const authApiService = AuthApiService.getInstance();
  const { data } = (await authApiService.getOAuthData(access_token)) as {
    data: any;
  };
  if (!data) throw new Error("Could not authenticate user");
  return {
    id: data.sub,
    accessToken: access_token,
    email: data.email,
    firstName: data.given_name,
    lastName: data.family_name,
    photoUrl: data.picture,
  };
};
