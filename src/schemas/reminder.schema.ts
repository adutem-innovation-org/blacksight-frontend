import { ReminderChannels, ReminderTypes } from "@/enums";
import * as yup from "yup";

export const reminderSchema = yup.object({
  tag: yup.string().required("Please provide tag"),

  channel: yup
    .string()
    .required("Please select reminder channel")
    .oneOf(Object.values(ReminderChannels), "Unsupported reminder channel"),

  type: yup
    .string()
    .required("Please select reminder type")
    .oneOf(Object.values(ReminderTypes), "Unsupported reminder type"),

  isBulk: yup.boolean().default(false),

  source: yup
    .string()
    .when("isBulk", {
      is: (isBulk: boolean) => isBulk,
      then: (schema) =>
        schema.required("Please specify the source of recipients"),
      otherwise: (schema) => schema.notRequired(),
    })
    .oneOf(["multiple-input", "file"], "Invalid source type"),

  remindAt: yup
    .date()
    .required("Please provide reminder date")
    .test("is-future-date", "Reminder time must be in the future", (value) =>
      value ? value > new Date() : false
    ),

  email: yup
    .string()
    .email("Invalid email format")
    .when(["channel", "isBulk"], {
      is: (channel: ReminderChannels, isBulk: boolean) =>
        channel === ReminderChannels.EMAIL && !isBulk,
      then: (schema) =>
        schema.required("Email required for email-channel reminder"),
      otherwise: (schema) => schema.notRequired(),
    }),

  phone: yup.string().when(["channel", "isBulk"], {
    is: (channel: ReminderChannels, isBulk: boolean) =>
      channel === ReminderChannels.SMS && !isBulk,
    then: (schema) =>
      schema.required("Phone number required for sms-channel reminder"),
    otherwise: (schema) => schema.notRequired(),
  }),

  emails: yup
    .array()
    // .of(
    //   yup.string().email("Each item in emails must be a valid email address")
    // )
    .when(["channel", "isBulk", "source"], {
      is: (channel: ReminderChannels, isBulk: boolean, source: string) =>
        channel === ReminderChannels.EMAIL &&
        isBulk &&
        source === "multiple-input",
      then: (schema) =>
        schema
          .required("Emails required for bulk reminder with an email-channel")
          .min(1, "At least one email is required")
          .test(
            "all-valid-emails",
            "Each item in emails must be a valid email address",
            (emails) =>
              Array.isArray(emails) &&
              emails.every((email) => yup.string().email().isValidSync(email))
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

  phones: yup
    .array()
    .of(yup.string().required("Each phone number must be a string"))
    .when(["channel", "isBulk", "source"], {
      is: (channel: ReminderChannels, isBulk: boolean, source: string) =>
        channel === ReminderChannels.SMS &&
        isBulk &&
        source === "multiple-input",
      then: (schema) =>
        schema
          .required("Phone numbers required for bulk reminder with SMS-channel")
          .min(1, "At least one phone number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  file: yup.string().when(["isBulk", "source"], {
    is: (isBulk: boolean, source: string) => isBulk && source === "file",
    then: (schema) =>
      schema.required(
        "File is required when using file source for bulk reminder"
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
});
