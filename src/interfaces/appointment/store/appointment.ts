import { AppointmentStatus } from "@/enums";
import { Bot } from "@/interfaces/bot";
import { CalendarProvider } from "@/interfaces/calendar";

export interface Appointment {
  _id: string;
  summary?: string;
  businessId: string;
  botId: string;
  bot?: Bot; // Virtual property
  providerId?: string;
  provider?: CalendarProvider; // Virtual property
  conversationId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  appointmentDateInCustomerTimezone: string;
  appointmentTimeInCustomerTimezone: string;
  appointmentDateInUTC: string;
  appointmentTimeInUTC: string;
  timezone: string;
  dateTimeInCustomerTimezone: Date;
  dateTimeInUTC: Date;
  duration: number;
  meetingLink?: string;
  status: AppointmentStatus;
  confirmationEmailSent: boolean;
  metadata: any;
  scheduledByProvider: boolean;
  createdAt: Date;
}
