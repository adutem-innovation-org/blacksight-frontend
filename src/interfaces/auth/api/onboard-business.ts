import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Business } from "../store";
import { UserRole } from "@/enums";

export interface OnboardBusinessRes extends ApiSuccessResponse {
  business: Business;
}

export type OnboardBusinessBody = {
  role: UserRole;

  // Basic information
  name: string;
  website: string;
  // address: string;
  businessEmail: string;

  // Personalization
  industry: string;
  numberOfEmployees: string;
  primaryGoal: string;

  // Product Feedback
  leadSource: string;
  preferredFeature: string;

  // Marketing and Communication Preferences
  preferredContentType: string[];
  feedbackCallConsent: string;
  preferredContactMethod: string;
  contactInfo?: string;
  receiveUpdates: boolean;
};
