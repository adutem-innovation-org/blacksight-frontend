import { createReminderSectionFields } from "@/constants";

export const getCreateReminderSectionFields = (secIndex: number) => {
  if (secIndex >= Object.keys(createReminderSectionFields).length) return null;
  if (secIndex in createReminderSectionFields)
    return createReminderSectionFields[secIndex];
  return null;
};
