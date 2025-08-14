import { AppointmentStatus } from "@/enums";
import * as yup from "yup";

export const updateAppointmentStatusSchema = yup.object({
  reason: yup.string().when("status", {
    is: AppointmentStatus.CANCELLED,
    then: (schema) => schema.required("Reason is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
