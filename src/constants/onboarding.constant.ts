import { UserRole } from "@/enums";
import businessOwner from "@/assets/images/roles/business-owner.png";
import manager from "@/assets/images/roles/manager.png";
import freelancer from "@/assets/images/roles/freelancer.png";
import developer from "@/assets/images/roles/programmer.png";

export const onboardingSectionFields: Record<string, string[]> = {
  0: ["role"],
  1: ["name", "website", "businessEmail"],
  2: [
    "industry",
    "industry_others",
    "numberOfEmployees",
    "primaryGoal",
    "primaryGoal_others",
  ],
  3: ["leadSource", "leadSource_others", "preferredFeature"],
  4: [
    "receiveUpdates",
    "preferredContentType",
    "feedbackCallConsent",
    "preferredContactMethod",
  ],
};

export const roles = [
  {
    role: UserRole.BUSINESS_OWNER,
    imageUrl: businessOwner,
  },
  {
    role: UserRole.MANAGER,
    imageUrl: manager,
  },
  {
    role: UserRole.FREELANCER,
    imageUrl: freelancer,
  },
  {
    role: UserRole.DEVELOPER,
    imageUrl: developer,
  },
];
