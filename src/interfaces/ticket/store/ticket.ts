import { TicketPriority, TicketRoleEnum, TicketStatus } from "@/enums";
import { Bot } from "@/interfaces/bot";

export interface Ticket {
  _id: string;
  businessId: string;
  botId: string;
  bot?: Bot;
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
