import {
  EventTrigger,
  ProdReminderTypes,
  RecurrencePattern,
  ReminderCategory,
  ReminderChannels,
  ReminderTypes,
} from "@/enums";
import * as yup from "yup";
import { phoneRegex } from "@/constants";

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

export const updateReminderSchema = yup.object({
  // General
  tag: yup.string().required("Please provide tag"),
  message: yup.string().required("Please provide message"),
  subject: yup.string(),
  channel: yup
    .string()
    .required("Please select reminder channel")
    .oneOf(Object.values(ReminderChannels), "Unsupported reminder channel"),
  category: yup
    .string()
    .required("Please select reminder category")
    .oneOf(Object.values(ReminderCategory), "Unsupported reminder category"), // Uneditable
  type: yup
    .string()
    .required("Please select reminder type")
    .oneOf(Object.values(ProdReminderTypes), "Unsupported reminder type"),

  // Scheduled
  remindAt: yup.string().when("type", {
    is: (type: ProdReminderTypes) => type === ProdReminderTypes.SCHEDULED,
    then: (schema) =>
      schema.required("Reminder date is required for scheduled reminders"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Recurring
  recurrencePattern: yup
    .string()
    .when("type", {
      is: (type: ProdReminderTypes) => type === ProdReminderTypes.RECURRING,
      then: (schema) =>
        schema.required(
          "Recurrent pattern is required for recurring reminders"
        ),
      otherwise: (schema) => schema.notRequired(),
    })
    .oneOf(Object.values(RecurrencePattern), "Unsupported recurrence pattern"),
  recurrenceInterval: yup
    .number()
    .min(1, "Recurrence interval must be at least 1")
    .optional(),
  startDate: yup.string().when("type", {
    is: (type: ProdReminderTypes) => type === ProdReminderTypes.RECURRING,
    then: (schema) =>
      schema.required("Start date is required for recurring reminders"),
    otherwise: (schema) => schema.notRequired(),
  }),
  endDate: yup.string().optional(),
  maxExecutions: yup
    .number()
    .min(1, "Max executions must be at least 1")
    .optional(),
  customCronExpression: yup.string().optional(),

  // Event based
  eventDate: yup.string().when("type", {
    is: (type: ProdReminderTypes) => type === ProdReminderTypes.EVENT_BASED,
    then: (schema) =>
      schema.required("Event date is required for event-based reminders"),
    otherwise: (schema) => schema.notRequired(),
  }),
  eventTrigger: yup
    .string()
    .when("type", {
      is: (type: ProdReminderTypes) => type === ProdReminderTypes.EVENT_BASED,
      then: (schema) =>
        schema.required("Event trigger is required for event-based reminders"),
      otherwise: (schema) => schema.notRequired(),
    })
    .oneOf(Object.values(EventTrigger), "Unsupported event trigger"),
  triggerOffset: yup
    .number()
    .when("type", {
      is: (type: ProdReminderTypes) => type === ProdReminderTypes.EVENT_BASED,
      then: (schema) =>
        schema.required("Trigger offset is required for event-based reminders"),
      otherwise: (schema) => schema.notRequired(),
    })
    .min(0, "Trigger offset must be at least 0"),

  // Others
  timezone: yup.string(),
  priority: yup.number().optional().min(1, "Priority must be at least 1"),
  maxRetries: yup.number().optional().min(0, "Max retries must be at lest 0"),

  // Date source
  fileId: yup.string().when("category", {
    is: ReminderCategory.PAYMENT,
    then: (schema) => schema.required("File source is required"),
    otherwise: (schema) => schema.notRequired(),
  }), // Uneditable
  isBulk: yup.boolean().default(false),
  email: yup
    .string()
    .email("Invalid email format")
    .when(["channel", "isBulk"], {
      is: (channel: ReminderChannels, isBulk: boolean) =>
        channel === ReminderChannels.EMAIL && !isBulk,
      then: (schema) =>
        schema.required("Email required for email based reminder"),
      otherwise: (schema) => schema.notRequired(),
    }),
  phone: yup.string().when(["channel", "isBulk"], {
    is: (channel: ReminderChannels, isBulk: boolean) =>
      channel === ReminderChannels.SMS && !isBulk,
    then: (schema) =>
      schema.required("Phone number required for sms based reminder"),
    otherwise: (schema) => schema.notRequired(),
  }),
  emails: yup.array().when(["channel", "isBulk"], {
    is: (channel: ReminderChannels, isBulk: boolean) =>
      (channel === ReminderChannels.EMAIL ||
        channel === ReminderChannels.BOTH) &&
      isBulk,
    then: (schema) =>
      schema
        .required("Emails required for bulk email reminder")
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
    .when(["channel", "isBulk"], {
      is: (channel: ReminderChannels, isBulk: boolean) =>
        (channel === ReminderChannels.SMS ||
          channel === ReminderChannels.BOTH) &&
        isBulk,
      then: (schema) =>
        schema
          .required("Phone numbers required for bulk sms reminder")
          .min(1, "At least one phone number is required")
          .test(
            "all-valid-phones",
            "Each item in phones must be a valid phone number",
            (phones: string[]) =>
              Array.isArray(phones) &&
              phones.every((phone) =>
                yup.string().matches(phoneRegex).isValidSync(phone)
              )
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

  // Template
  template: yup.string(),
  templateId: yup.string(),
  templateData: yup.object(),
});
