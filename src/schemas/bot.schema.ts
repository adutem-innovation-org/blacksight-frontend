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
      then: (schema) => schema.required("Please select a meeting provider"),
      otherwise: (schema) => schema.notRequired(),
    }),
    welcomeMessage: isWelcomeMessageOptional
      ? yup.string()
      : yup.string().required("Please provide welcome message.").trim(),
    instructions: yup.string(),
  });
