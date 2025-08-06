import { FullAuthData, TempAuthData } from "../store";

export type LoginUserRes = TempAuthData | FullAuthData;

export type LoginUserBody = { email: string; password: string };
