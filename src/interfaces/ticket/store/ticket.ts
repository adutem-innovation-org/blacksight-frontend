import { TicketPriority, TicketRoleEnum, TicketStatus } from "@/enums";

export interface Ticket {
  _id: string;
  businessId: string;
  botId: string;
  sessionId: string;
  customerEmail: string;
  customerName: string;
  messages: TicketMessage[];
  status: TicketStatus;
  priority: TicketPriority;
  closedBy: string;
  closedOn: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketMessage {
  role: TicketRoleEnum;
  content: string;
  createdAt?: Date;
}
