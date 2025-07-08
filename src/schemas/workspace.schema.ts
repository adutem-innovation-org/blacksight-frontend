import { emailRegex, passwordRegex } from "@/constants";
import * as yup from "yup";

export const createAdminSchema = yup.object({
  firstName: yup.string().required("Please provide first name"),
  lastName: yup.string().required("Please provide last name"),
  email: yup
    .string()
    .required("Please provide admin email")
    .matches(emailRegex, "Please provide a valid email"),
  password: yup
    .string()
    .required("Please enter password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, a number and special character."
    ),
});
