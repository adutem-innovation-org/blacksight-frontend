import { emailRegex, urlRegex } from "@/constants/regex";
import * as yup from "yup";

export const personalInfoSchema = yup.object({
  firstName: yup.string().required("Please provide first name"),
  lastName: yup.string().required("Please provide last name"),
  phone: yup.string().min(9, "Please enter a valid number"),
});

export const addressInfoSchema = yup.object({
  country: yup.string().required("Please provide country"),
  state: yup.string().required("Please provide state"),
  city: yup.string().required("Please provide city"),
  zipCode: yup
    .string()
    .required("Please provide postal/zip code")
    .min(5, "Please enter a valid zip code"),
});

export const basicInfoSchema = yup.object({
  name: yup.string().required("Please provide your business name"),
  website: yup
    .string()
    .required("Please provide your business website")
    .matches(urlRegex, "Please provide a valid url"),
  address: yup.string().required("Please provide your business address"),
  industry: yup.string().required("Please specify your business's industry"),
});

export const contactInfoSchema = yup.object({
  contactName: yup.string().required("Please provide contact name"),
  contactEmail: yup
    .string()
    .required("Please provide contact email")
    .matches(emailRegex, "Please provide a valid email"),
  contactTel: yup.string().required("Please provide your contact phone number"),
});
