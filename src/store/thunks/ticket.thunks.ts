import { TicketApiService } from "@/apis";
import { TicketPriority, TicketStatus } from "@/enums";
import {
  GetAllTicketsRes,
  GetTicketAnalyticsRes,
  ReplyTicketRes,
  Ticket,
  UpdateTicketPriorityRes,
  UpdateTicketStatusRes,
} from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

const ticketApiService = TicketApiService.getInstance();

export const getAllTickets = createAsyncThunk<
  GetAllTicketsRes,
  void,
  { rejectValue: string }
>("get_all_tickets", async (_, { rejectWithValue }) => {
  try {
    const resp = await ticketApiService.getAllTickets();
    return resp;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const getTicketAnalytics = createAsyncThunk<
  GetTicketAnalyticsRes["data"],
  void,
  { rejectValue: string }
>("get_ticket_analytics", async (_, { rejectWithValue }) => {
  try {
    const resp = await ticketApiService.getTicketAnalytics();
    return resp.data;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const updateTicketStatus = createAsyncThunk<
  Ticket,
  { ticketId: string; status: TicketStatus },
  { rejectValue: string }
>("update_ticket_status", async ({ ticketId, status }, { rejectWithValue }) => {
  try {
    const resp = await ticketApiService.updateTicketStatus(ticketId, {
      status,
    });
    return resp.ticket;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const replyTicket = createAsyncThunk<
  Ticket,
  { ticketId: string; message: string },
  { rejectValue: string }
>("reply_ticket", async ({ ticketId, message }, { rejectWithValue }) => {
  try {
    const resp = await ticketApiService.replyTicket(ticketId, { message });
    return resp.ticket;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const deleteTicket = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("delete_ticket", async (ticketId, { rejectWithValue }) => {
  try {
    const resp = await ticketApiService.deleteTicket(ticketId);
    return resp.ticket._id;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const updateTicketPriority = createAsyncThunk<
  Ticket,
  { ticketId: string; priority: TicketPriority },
  { rejectValue: string }
>(
  "update_ticket_priority",
  async ({ ticketId, priority }, { rejectWithValue }) => {
    try {
      const resp = await ticketApiService.updateTicketPriority(ticketId, {
        priority,
      });
      return resp.ticket;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);
