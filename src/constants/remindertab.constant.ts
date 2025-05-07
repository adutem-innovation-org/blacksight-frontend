export const createReminderSectionFields: Record<string, string[]> = {
  0: ["tag", "channel", "type"],
  1: ["isBulk", "emails", "phones", "email", "phone", "file"],
};

export const getCreateReminderSectionFields = (secIndex: number) => {
  if (secIndex >= Object.keys(createReminderSectionFields).length) return null;
  if (secIndex in createReminderSectionFields)
    return createReminderSectionFields[secIndex];
  return null;
};
