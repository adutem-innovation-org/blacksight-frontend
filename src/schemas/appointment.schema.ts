import { AppointmentStatus } from "@/enums";
import * as yup from "yup";
import {
  instantFileReminderSchema,
  scheduledFileReminderSchema,
} from "./payment-tracker.schema";
import { createEmailValidation, createPhoneValidation } from "./bcp.schema";

export const updateAppointmentStatusSchema = yup.object({
  reason: yup.string().when("status", {
    is: AppointmentStatus.CANCELLED,
    then: (schema) => schema.required("Reason is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const instantAppointmentReminderSchema = instantFileReminderSchema.shape(
  {
    email: createEmailValidation(),
    phone: createPhoneValidation(),
    fileId: yup.string().notRequired(),
  }
);

export const scheduledAppointmentReminderSchema =
  scheduledFileReminderSchema.shape({
    email: createEmailValidation(),
    phone: createPhoneValidation(),
    fileId: yup.string().notRequired(),
  });
