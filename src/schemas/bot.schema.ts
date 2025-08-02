import { TIME_ZONES } from "@/constants/appointment.constant"; // Export explicitly due to cyclic dependency
import { emailRegex } from "@/constants/regex"; // Export explicitly due to cyclic dependency
import * as yup from "yup";

export const botSchema = (isWelcomeMessageOptional: boolean = true) =>
  yup.object({
    name: yup.string().required("Please provide name"),
    knowledgeBaseIds: yup
      .array()
      .of(yup.string())
      .min(1, "Please select at least one knowledge base"),
    scheduleMeeting: yup
      .boolean()
      .required("Please specify if meeting should be scheduled")
      .default(false),
    meetingProviderId: yup.string().when("scheduleMeeting", {
      is: (scheduleMeeting: Boolean) => scheduleMeeting,
      then: (schema) => schema.required("Please select a calendar provider"),
      otherwise: (schema) => schema.notRequired(),
    }),
    welcomeMessage: isWelcomeMessageOptional
      ? yup.string()
      : yup.string().required("Please provide welcome message.").trim(),
    instructions: yup.string(),
  });

export const agentScheduleAppointmentSchema = yup.object({
  customerName: yup.string().required("Please provide your name"),
  customerEmail: yup
    .string()
    .required("Please provide your email")
    .matches(emailRegex, "Please provide a valid email"),
  customerPhone: yup.string().required("Please provide your phone number"),
  dateTime: yup.string().required("Please select a date and time"),
  timezone: yup
    .string()
    .required("Please select a timezone")
    .oneOf(
      TIME_ZONES.map((x) => x.value) as unknown as string[],
      "Unsupported timezone"
    ),
});

export const agentEscalateIssueSchema = yup.object({
  customerName: yup.string().required("Please provide your name"),
  customerEmail: yup
    .string()
    .required("Please provide your email")
    .matches(emailRegex, "Please provide a valid email"),
  message: yup.string().required("Please provide your message"),
});
