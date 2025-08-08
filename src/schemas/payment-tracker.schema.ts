import { emailRegex } from "@/constants";
import { PaymentInterval } from "@/enums";
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
