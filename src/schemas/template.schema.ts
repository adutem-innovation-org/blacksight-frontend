import * as yup from "yup";
import { TemplateCategory, TemplateType } from "@/enums";

export const emailTemplateSchema = yup.object({
  name: yup.string().required("Please provide template name"),
  description: yup.string().required("Please provide template description"),
  type: yup
    .string()
    .required("Please provide template type")
    .oneOf(Object.values(TemplateType), {
      message: "Unsupported template type",
    }),
  category: yup
    .string()
    .required("Please select a category")
    .oneOf(Object.values(TemplateCategory), {
      message: "Unsupported category",
    }),
  dynamicFields: yup
    .array()
    .required("Please select at least one dynamic field")
    .of(yup.string())
    .min(1, "Please select at least one dynamic field"),
  keywords: yup
    .array()
    .required("Please select at least one keyword")
    .of(yup.string())
    .min(1, "Please select at least one keyword"),
});
