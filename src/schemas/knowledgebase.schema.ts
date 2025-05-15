import * as yup from "yup";

export const knowledgeBaseSchema = yup.object({
  tag: yup.string().required("Please provide tag"),
  file: yup
    .string()
    .required("File is required when adding a new knowledge base"),
});
