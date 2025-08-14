// import * as yup from "yup";
// import { emailRegex, phoneRegex } from "@/constants";
// import { PaymentInterval, ReminderChannels } from "@/enums";
// import {
//   instantFileReminderSchema,
//   scheduledFileReminderSchema,
// } from "./payment-tracker.schema";

// export const updateBCPSchema = yup.object({
//   name: yup.string().required("Please provide name"),
//   email: yup
//     .string()
//     .required("Please provide customer email")
//     .matches(emailRegex, "Please provide a valid email"),
//   phone: yup.string(),
//   paymentInterval: yup
//     .string()
//     .required("Please specify payment interval")
//     .oneOf(Object.values(PaymentInterval), "Unsupported payment interval"),
//   lastPayment: yup.string(),
// });

// export const instantBCPReminderSchema = instantFileReminderSchema.shape({
//   email: yup.string().when("channel", {
//     is: ReminderChannels.EMAIL || ReminderChannels.BOTH,
//     then: (schema) =>
//       schema.required("Email required for email based reminder channel"),
//     otherwise: (schema) => schema.notRequired(),
//   }),
//   phone: yup.string().when("channel", {
//     is: ReminderChannels.SMS || ReminderChannels.BOTH,
//     then: (schema) =>
//       schema.required("Phone number required for sms based reminder channel"),
//     otherwise: (schema) => schema.notRequired(),
//   }),
// });

// export const instantReminderForMultipleBCPsSchema =
//   instantFileReminderSchema.shape({
//     emails: yup.array().when("channel", {
//       is: ReminderChannels.EMAIL || ReminderChannels.BOTH,
//       then: (schema) =>
//         schema
//           .required("Emails required for bulk email reminder")
//           .min(1, "At least one email is required")
//           .test(
//             "all-valid-emails",
//             "Each item in emails must be a valid email address",
//             (emails) =>
//               Array.isArray(emails) &&
//               emails.every((email) => yup.string().email().isValidSync(email))
//           ),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//     phones: yup
//       .array()
//       .of(yup.string().required("Each phone number must be a string"))
//       .when("channel", {
//         is: ReminderChannels.SMS || ReminderChannels.BOTH,
//         then: (schema) =>
//           schema
//             .required("Phone numbers required for bulk sms reminder")
//             .min(1, "At least one phone number is required")
//             .test(
//               "all-valid-phones",
//               "Each item in phones must be a valid phone number",
//               (phones) =>
//                 Array.isArray(phones) &&
//                 phones.every((phone) =>
//                   yup.string().matches(phoneRegex).isValidSync(phone)
//                 )
//             ),
//         otherwise: (schema) => schema.notRequired(),
//       }),
//   });

// export const scheduledBCPReminderSchema = scheduledFileReminderSchema.shape({
//   email: yup.string().when("channel", {
//     is: ReminderChannels.EMAIL || ReminderChannels.BOTH,
//     then: (schema) =>
//       schema.required("Email required for email based reminder channel"),
//     otherwise: (schema) => schema.notRequired(),
//   }),
//   phone: yup.string().when("channel", {
//     is: ReminderChannels.SMS || ReminderChannels.BOTH,
//     then: (schema) =>
//       schema.required("Phone number required for sms based reminder channel"),
//     otherwise: (schema) => schema.notRequired(),
//   }),
// });

// export const scheduledReminderForMultipleBCPsSchema =
//   scheduledFileReminderSchema.shape({
//     emails: yup.array().when("channel", {
//       is: ReminderChannels.EMAIL || ReminderChannels.BOTH,
//       then: (schema) =>
//         schema
//           .required("Emails required for bulk email reminder")
//           .min(1, "At least one email is required")
//           .test(
//             "all-valid-emails",
//             "Each item in emails must be a valid email address",
//             (emails) =>
//               Array.isArray(emails) &&
//               emails.every((email) => yup.string().email().isValidSync(email))
//           ),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//     phones: yup
//       .array()
//       .of(yup.string().required("Each phone number must be a string"))
//       .when("channel", {
//         is: ReminderChannels.SMS || ReminderChannels.BOTH,
//         then: (schema) =>
//           schema
//             .required("Phone numbers required for bulk sms reminder")
//             .min(1, "At least one phone number is required")
//             .test(
//               "all-valid-phones",
//               "Each item in phones must be a valid phone number",
//               (phones) =>
//                 Array.isArray(phones) &&
//                 phones.every((phone) =>
//                   yup.string().matches(phoneRegex).isValidSync(phone)
//                 )
//             ),
//         otherwise: (schema) => schema.notRequired(),
//       }),
//   });
import * as yup from "yup";
import { emailRegex, phoneRegex } from "@/constants";
import { PaymentInterval, ReminderChannels } from "@/enums";
import {
  instantFileReminderSchema,
  scheduledFileReminderSchema,
} from "./payment-tracker.schema";

// Helper functions for reusable validation logic
export const createEmailValidation = (isArray = false) => {
  const baseValidation = (
    isArray
      ? yup.array().min(1, `At least one email is required`)
      : yup.string()
  ) as any;

  return baseValidation.when("channel", {
    is: (channel: ReminderChannels) =>
      channel === ReminderChannels.EMAIL || channel === ReminderChannels.BOTH,
    then: (schema: yup.Schema) => {
      const requiredSchema = schema.required(
        isArray
          ? "Emails required for bulk email reminder"
          : "Email required for email based reminder channel"
      );

      return isArray
        ? requiredSchema.test(
            "all-valid-emails",
            "Each item in emails must be a valid email address",
            (emails: string[]) =>
              Array.isArray(emails) &&
              emails.every((email) => yup.string().email().isValidSync(email))
          )
        : requiredSchema;
    },
    otherwise: (schema: yup.Schema) => schema.notRequired(),
  });
};

export const createPhoneValidation = (isArray = false) => {
  const baseValidation = (
    isArray
      ? yup
          .array()
          .of(yup.string().required("Each phone number must be a string"))
          .min(1, "At least one phone number is required")
      : yup.string()
  ) as any;

  return baseValidation.when("channel", {
    is: (channel: ReminderChannels) =>
      channel === ReminderChannels.SMS || channel === ReminderChannels.BOTH,
    then: (schema: yup.Schema) => {
      const requiredSchema = schema.required(
        isArray
          ? "Phone numbers required for bulk sms reminder"
          : "Phone number required for sms based reminder channel"
      );

      return isArray
        ? requiredSchema.test(
            "all-valid-phones",
            "Each item in phones must be a valid phone number",
            (phones: string[]) =>
              Array.isArray(phones) &&
              phones.every((phone) =>
                yup.string().matches(phoneRegex).isValidSync(phone)
              )
          )
        : requiredSchema;
    },
    otherwise: (schema: yup.Schema) => schema.notRequired(),
  });
};

// Original schema remains the same
export const updateBCPSchema = yup.object({
  name: yup.string().required("Please provide name"),
  email: yup
    .string()
    .required("Please provide customer email")
    .matches(emailRegex, "Please provide a valid email"),
  phone: yup.string(),
  paymentInterval: yup
    .string()
    .required("Please specify payment interval")
    .oneOf(Object.values(PaymentInterval), "Unsupported payment interval"),
  lastPayment: yup.string(),
});

// Simplified schemas using helper functions
export const instantBCPReminderSchema = instantFileReminderSchema.shape({
  email: createEmailValidation(),
  phone: createPhoneValidation(),
});

export const instantReminderForMultipleBCPsSchema =
  instantFileReminderSchema.shape({
    emails: createEmailValidation(true),
    phones: createPhoneValidation(true),
  });

export const scheduledBCPReminderSchema = scheduledFileReminderSchema.shape({
  email: createEmailValidation(),
  phone: createPhoneValidation(),
});

export const scheduledReminderForMultipleBCPsSchema =
  scheduledFileReminderSchema.shape({
    emails: createEmailValidation(true),
    phones: createPhoneValidation(true),
  });
