import { onboardingSectionFields } from "@/constants";

export const getOnboardingSectionFields = (secIndex: number) => {
  if (secIndex >= Object.keys(onboardingSectionFields).length) return null;
  if (secIndex in onboardingSectionFields)
    return onboardingSectionFields[secIndex];
  return null;
};
