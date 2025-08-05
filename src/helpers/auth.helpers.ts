import { AuthApiService } from "@/apis";
import { MFAMethods, UserTypes } from "@/enums";
import { UserData } from "@/interfaces";

export const saveSession = (token: string, user: UserData) => {
  sessionStorage.setItem("blacksight_auth_user", JSON.stringify(user));
  sessionStorage.setItem("blacksight_access_token", token);
};

export const saveTempSession = (
  tempToken: string,
  tempData: {
    requiresMFA: boolean;
    mfaMethods: MFAMethods[];
    tempToken: string;
  }
) => {
  sessionStorage.setItem("blacksight_temp_token", tempToken);
  sessionStorage.setItem("blacksight_temp_data", JSON.stringify(tempData));
};

export const clearSession = () => {
  sessionStorage.removeItem("blacksight_auth_user");
  sessionStorage.removeItem("blacksight_access_token");
};

export const clearTempSession = () => {
  sessionStorage.removeItem("blacksight_temp_token");
  sessionStorage.removeItem("blacksight_temp_data");
};

export const getAuthUser = (): UserData | null => {
  const userJSON = sessionStorage.getItem("blacksight_auth_user");
  if (!userJSON) return null;
  try {
    const userData = JSON.parse(userJSON);
    return userData;
  } catch (error) {
    return null;
  }
};

export const getTempData = (): {
  requiresMFA: boolean;
  mfaMethods: MFAMethods[];
  tempToken: string;
  expiresAt: number;
} | null => {
  const tempDataJSON = sessionStorage.getItem("blacksight_temp_data");
  if (!tempDataJSON) return null;
  try {
    const tempData = JSON.parse(tempDataJSON);
    return tempData;
  } catch (error) {
    return null;
  }
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

/** Check if the current entity is a user  */
export const isUser = (auth: UserData) => auth.userType === UserTypes.USER;

/** Check if the current entity is an admin */
export const isAdmin = (auth: UserData) => auth.userType === UserTypes.ADMIN;

/** Check if the current entity is a super admin */
export const isSuperAdmin = (auth: UserData) =>
  isAdmin(auth) && auth.isSuperAdmin;
