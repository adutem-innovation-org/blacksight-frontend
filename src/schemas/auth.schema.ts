import { passwordRegex } from "@/constants";
import * as yup from "yup";

const passwordValidationError =
  "Password must contain at least one uppercase letter, one lowercase letter, a number and special character.";

export const passwordUpdateSchema = (isOldPasswordRequired: boolean = false) =>
  yup.object({
    oldPassword: isOldPasswordRequired
      ? yup
          .string()
          .required("Please provide old password")
          .matches(passwordRegex, passwordValidationError)
      : yup.string(),
    password: yup
      .string()
      .required("Please enter your new password")
      .matches(passwordRegex, passwordValidationError),
    confirmPassword: yup
      .string()
      .required("Please re-enter your new password")
      .matches(passwordRegex, passwordValidationError)
      .oneOf([yup.ref("password")], "Password must match"),
  });
