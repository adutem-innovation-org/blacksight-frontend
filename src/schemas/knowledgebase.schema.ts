import { KnowledgeBaseSources } from "@/enums";
import * as yup from "yup";

export const knowledgeBaseSchema = yup.object({
  tag: yup.string().required("Please provide tag"),
  source: yup
    .string()
    .oneOf(Object.values(KnowledgeBaseSources), "Invalid source type"),
  text: yup.string().when("source", {
    is: (source: KnowledgeBaseSources) =>
      source === KnowledgeBaseSources.TEXT_INPUT,
    then: (schema) => schema.required("Please provide your knowledge base..."),
    otherwise: (schema) => schema.notRequired(),
  }),
  file: yup.string().when("source", {
    is: (source: KnowledgeBaseSources) => source === KnowledgeBaseSources.FILE,
    then: (schema) =>
      schema.required("File is required when adding a new knowledge base"),
    otherwise: (schema) => schema.notRequired(),
  }),
  url: yup
    .string()
    .url("Please enter a valid url")
    .when("source", {
      is: (source: KnowledgeBaseSources) => source === KnowledgeBaseSources.URL,
      then: (schema) => schema.required("Please provide a valid url"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
