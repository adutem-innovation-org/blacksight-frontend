import { RegisterUserRes } from "./register-user";

export type LoginUserRes = RegisterUserRes;

export type LoginUserBody = { email: string; password: string };
