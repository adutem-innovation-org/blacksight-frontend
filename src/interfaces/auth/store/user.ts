import { UserTypes } from "@/enums";

export type UserData = {
  _id: string;
  id: string;
  businessId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isSuperAdmin: boolean;
  userType: UserTypes;
  hasConnectedGoogleMeet?: boolean;
  hasConnectedZoomMeet?: boolean;
  hasConnectedMicrosoftTeams?: boolean;
  lastLogin: string;
  createdAt: string;
  passwordChangedAt: string;
};
