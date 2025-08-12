import { emailRegex } from "@/constants";
import {
  EventTrigger,
  PaymentInterval,
  ProdReminderTypes,
  RecurrencePattern,
  ReminderCategory,
  ReminderChannels,
} from "@/enums";
import * as yup from "yup";

export const uploadPaymentsFileSchema = yup.object({
  tag: yup.string().required("Please provide tag"),
  file: yup.mixed().required("Please upload a file"),
});

export const instantFileReminderSchema = yup.object({
  tag: yup.string().required("Please provide tag"),
  message: yup.string().required("Please provide message"),
  subject: yup.string(),
  channel: yup
    .string()
    .required("Please select reminder channel")
    .oneOf(Object.values(ReminderChannels), "Unsupported reminder channel"),
  fileId: yup.string().required("Please select a file"),
  isBulk: yup.boolean().default(false),
  template: yup.string(),
  templateId: yup.string(),
  templateData: yup.object(),
});

export const scheduledFileReminderSchema = yup.object({
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
    .oneOf(Object.values(ReminderCategory), "Unsupported reminder category"),
  type: yup
    .string()
    .required("Please select reminder type")
    .oneOf(Object.values(ProdReminderTypes), "Unsupported reminder type"),
  isBulk: yup.boolean().default(false),
  remindAt: yup.string().when("type", {
    is: (type: ProdReminderTypes) => type === ProdReminderTypes.SCHEDULED,
    then: (schema) =>
      schema.required("Reminder date is required for scheduled reminders"),
    otherwise: (schema) => schema.notRequired(),
  }),
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
  template: yup.string(),
  templateId: yup.string(),
  fileId: yup.string().required("Please select a file"),
  templateData: yup.object(),
  timezone: yup.string(),
  priority: yup.number().optional().min(1, "Priority must be at least 1"),
  maxRetries: yup.number().optional().min(0, "Max retries must be at lest 0"),
});
