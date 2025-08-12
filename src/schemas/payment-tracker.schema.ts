import { emailRegex } from "@/constants";
import { PaymentInterval, ReminderChannels, ReminderTypes } from "@/enums";
import * as yup from "yup";

export const uploadPaymentsFileSchema = yup.object({
  tag: yup.string().required("Please provide tag"),
  file: yup.mixed().required("Please upload a file"),
});

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
