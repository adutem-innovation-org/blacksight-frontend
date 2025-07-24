import * as yup from "yup";

export const connectCalComSchema = yup.object({
  eventTypeId: yup.string().required("Event Type ID is required"),
  apiKey: yup.string().required("API Key is required"),
});
