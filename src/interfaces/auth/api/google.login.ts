import { TempAuthData, FullAuthData } from "../store";

export type GoogleLoginBody = {
  id: string;
  accessToken: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
};

export type GoogleLoginRes = TempAuthData | FullAuthData;
