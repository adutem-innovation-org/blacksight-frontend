import { UserTypes } from "@/enums";

type AddressInfo = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
};

export type UserData = {
  _id: string;
  id: string;
  businessId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isOnboarded: boolean;
  skippedOnboarding: boolean;
  isSuspended: boolean;
  isSuperAdmin: boolean;
  userType: UserTypes;
  hasConnectedGoogleMeet?: boolean;
  hasConnectedZoomMeet?: boolean;
  hasConnectedMicrosoftTeams?: boolean;
  lastLogin: string;
  createdAt: string;
  passwordChangedAt: string;
  addressInfo: AddressInfo;
  businessInfo: Business;
};

export interface Business {
  _id: string;
  ownerId: string;
  businessId: string;
  name: string;
  website: string;
  industry: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactTel: string;
  objectives: string[];
  companyStructure: string;
}

export type PaginatedUserData = {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
  isActive: boolean;
  isSuspended: boolean;
  totalBots?: number;
  totalKnowledgeBases?: number;
  createdAt: string;
  updatedAt: string;
};
