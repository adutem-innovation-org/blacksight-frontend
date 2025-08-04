import { MFAMethods } from "@/enums";

export const availableMFAMethods = [
  {
    label: "Email",
    method: MFAMethods.EMAIL,
    enabled: false,
    // description: "Receive verification code via email",
    description:
      "User your email address as your two-factor authentication. You'll be asked to enter the security code sent to the address associated with your account.",
    iconClass: "fi fi-rr-envelope",
  },
  {
    label: "SMS",
    method: MFAMethods.SMS,
    enabled: false,
    // description: "Receive verification code via SMS",
    description:
      "User your phone number as your two-factor authentication. You'll be asked to enter the security code sent to your phone via SMS message.",
    iconClass: "fi fi-rr-paper-plane",
  },
];
