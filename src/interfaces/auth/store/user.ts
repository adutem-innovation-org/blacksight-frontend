import { UserTypes } from "@/enums";

export type UserData = {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isSuperAdmin: boolean;
  userType: UserTypes;
  lastLogin: string;
  createdAt: string;
  passwordChangedAt: string;
};
