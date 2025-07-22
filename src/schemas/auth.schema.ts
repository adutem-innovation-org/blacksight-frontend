import { emailRegex, passwordRegex, urlRegex } from "@/constants/regex";
import { PreferredContactMethodEnum, UserRole } from "@/enums";
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

export const onboardingSchema = yup.object({
  role: yup.string().oneOf(Object.values(UserRole), "Please select a role"),

  name: yup.string(),
  // .required("Please provide your business name"),
  website: yup
    .string()
    .optional()
    // .required("Please provide your business website")
    .matches(urlRegex, "Please provide a valid url"),
  // address: yup.string().required("Please provide your business address"),
  businessEmail: yup
    .string()
    .optional()
    .matches(emailRegex, "Please provide a valid email"),

  // industry: yup.string().required("Please specify your business's industry"),
  industry: yup.string(),
  industry_others: yup.string().when("industry", {
    is: (industry: string) => industry === "Others",
    then: (schema) => schema.required("Please specify your business industry"),
    otherwise: (schema) => schema.notRequired(),
  }),
  numberOfEmployees: yup.string(),
  // .required("Please specify the number of employees in your business"),
  primaryGoal: yup.string(),
  primaryGoal_others: yup.string().when("primaryGoal", {
    is: (primaryGoal: string) => primaryGoal === "Others",
    then: (schema) => schema.required("Please specify your primary goal."),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Product feedback
  leadSource: yup.string(),
  // .required("Please tell us how you found out about us?"),
  leadSource_others: yup.string().when("leadSource", {
    is: (leadSource: string) => leadSource === "Others",
    then: (schema) =>
      schema.required("Please specify how you heard about blacksight."),
    otherwise: (schema) => schema.notRequired(),
  }),
  preferredFeature: yup.string(),

  receiveUpdates: yup.boolean().default(false),
  preferredContentType: yup.array().of(yup.string()),
  feedbackCallConsent: yup.string(),
  preferredContactMethod: yup
    .string()
    .when("feedbackCallConsent", {
      is: (feedbackCallConsent: string) => feedbackCallConsent === "Yes",
      then: (schema) =>
        schema.required("Please select a preferred contact method"),
      otherwise: (schema) => schema.notRequired(),
    })
    .oneOf(
      Object.values(PreferredContactMethodEnum),
      "Unsupported contact method"
    ),
  contactInfo: yup
    .string()
    .when(
      ["preferredContactMethod", "feedbackCallConsent"],
      ([preferredContactMethod, feedbackCallConsent], schema: any) => {
        if (!preferredContactMethod?.trim() || feedbackCallConsent !== "Yes")
          return schema.notRequired();

        let result = schema.required("Please provide contact information");

        if (preferredContactMethod === PreferredContactMethodEnum.EMAIL) {
          result = result.matches(
            emailRegex,
            "Please provide a valid contact email"
          );
        }

        return result;
      }
    ),
  //     .when("preferredContactMethod", {
  //       is: (preferredContactMethod: string) => !!preferredContactMethod.trim(),
  //       then: (schema) => schema.required("Please provide contact information"),
  //       otherwise: (schema) => schema.notRequired(),
  //     })
  //     .when("preferredContactMethod", {
  //       is: (preferredContactMethod: PreferredContactMethodEnum) =>
  //         preferredContactMethod === PreferredContactMethodEnum.EMAIL,
  //       then: (schema) =>
  //         schema.matches(emailRegex, "Please provide a valid contact email"),
  //       otherwise: (schema) => schema,
  //     }),
});
