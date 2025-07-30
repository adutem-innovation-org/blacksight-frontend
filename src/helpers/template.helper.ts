import { saveTemplateSectionFields } from "@/constants";

export const getSaveTemplateSectionFields = (secIndex: number) => {
  if (secIndex >= Object.keys(saveTemplateSectionFields).length) return null;
  if (secIndex in saveTemplateSectionFields)
    return saveTemplateSectionFields[secIndex];
  return null;
};
