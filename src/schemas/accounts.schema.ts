import * as yup from "yup";

export const accountSuspensionSchema = yup.object({
  userId: yup.string().required("Must provide user to suspend"),
  reason: yup.string().required("Please provide suspension reason"),
});
