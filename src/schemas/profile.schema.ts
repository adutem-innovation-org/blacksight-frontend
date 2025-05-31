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
