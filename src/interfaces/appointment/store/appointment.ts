import { AppointmentStatus } from "@/enums";

export interface Appointment {
  _id: string;
  businessId: string;
  conversationId: string;
  customerEmail: string;
  appointmentDate: Date;
  appointmentTime: Date;
  meetingLink: string;
  status: AppointmentStatus;
  dateTime?: Date; // Virtual property
}
