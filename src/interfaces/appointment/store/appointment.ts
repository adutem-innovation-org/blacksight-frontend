import { AppointmentStatus } from "@/enums";

export interface Appointment {
  businessId: string;
  conversationId: string;
  customerEmail: string;
  appointmentDate: Date;
  appointmentTime: Date;
  meetingLink: string;
  status: AppointmentStatus;
  dateTime?: Date; // Virtual property
}
