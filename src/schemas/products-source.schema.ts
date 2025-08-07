import { ApiSourceAuthMethod, ProductsFileSources } from "@/enums";
import * as yup from "yup";

export const productsSourceSchema = yup.object({
  tag: yup.string().required("Please provide tag"),
  source: yup
    .string()
    .oneOf(Object.values(ProductsFileSources), "Invalid source type"),
  text: yup.string().when("source", {
    is: (source: ProductsFileSources) =>
      source === ProductsFileSources.TEXT_INPUT,
    then: (schema) => schema.required("Please provide your products catalog"),
    otherwise: (schema) => schema.notRequired(),
  }),
  file: yup.string().when("source", {
    is: (source: ProductsFileSources) => source === ProductsFileSources.FILE,
    then: (schema) =>
      schema.required("File is required when adding a products source"),
    otherwise: (schema) => schema.notRequired(),
  }),
  apiUrl: yup
    .string()
    .url("Please enter a valid url")
    .when("source", {
      is: (source: ProductsFileSources) => source === ProductsFileSources.API,
      then: (schema) => schema.required("Please provide a valid url"),
      otherwise: (schema) => schema.notRequired(),
    }),
  authMethod: yup
    .string()
    .when("source", {
      is: (source: ProductsFileSources) => source === ProductsFileSources.API,
      then: (schema) => schema.required("Please provide authentication method"),
      otherwise: (schema) => schema.notRequired(),
    })
    .oneOf(Object.values(ApiSourceAuthMethod), "Invalid authentication method"),
  apiKey: yup.string().when(["source", "authMethod"], {
    is: (source: ProductsFileSources, authMethod: ApiSourceAuthMethod) =>
      source === ProductsFileSources.API &&
      authMethod === ApiSourceAuthMethod.X_API_KEY,
    then: (schema) => schema.required("Please provide API key"),
    otherwise: (schema) => schema.notRequired(),
  }),
  bearerToken: yup.string().when(["source", "authMethod"], {
    is: (source: ProductsFileSources, authMethod: ApiSourceAuthMethod) =>
      source === ProductsFileSources.API &&
      authMethod === ApiSourceAuthMethod.BEARER,
    then: (schema) => schema.required("Please provide bearer token"),
    otherwise: (schema) => schema.notRequired(),
  }),
  username: yup.string().when(["source", "authMethod"], {
    is: (source: ProductsFileSources, authMethod: ApiSourceAuthMethod) =>
      source === ProductsFileSources.API &&
      authMethod === ApiSourceAuthMethod.BASIC,
    then: (schema) => schema.required("Please provide username"),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: yup.string().when(["source", "authMethod"], {
    is: (source: ProductsFileSources, authMethod: ApiSourceAuthMethod) =>
      source === ProductsFileSources.API &&
      authMethod === ApiSourceAuthMethod.BASIC,
    then: (schema) => schema.required("Please provide password"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
