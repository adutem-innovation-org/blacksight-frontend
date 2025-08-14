import {
  DeleteTicketRes,
  GetAllTicketsRes,
  GetTicketAnalyticsRes,
  ReplyTicketBody,
  ReplyTicketRes,
  UpdateTicketPriorityBody,
  UpdateTicketStatusBody,
  UpdateTicketStatusRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { TICKET_URLS } from "./endpoints";

export class TicketApiService {
  private static instance: TicketApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof TICKET_URLS = TICKET_URLS;

  constructor() {
    this.apiService = new ApiService("tickets");
  }

  static getInstance(): TicketApiService {
    if (!this.instance) {
      this.instance = new TicketApiService();
    }
    return this.instance;
  }

  getAllTickets = () => {
    return this.apiService.get<GetAllTicketsRes>(this.urls.GET_ALL_TICKETS);
  };

  getTicketAnalytics = () => {
    return this.apiService.get<GetTicketAnalyticsRes>(
      this.urls.GET_TICKET_ANALYTICS
    );
  };

  getTicketById = (id: string) => {
    return this.apiService.get<any>(
      this.urls.GET_TICKET_BY_ID.replace(":id", id)
    );
  };

  updateTicketStatus = (id: string, data: UpdateTicketStatusBody) => {
    return this.apiService.update<
      UpdateTicketStatusBody,
      UpdateTicketStatusRes
    >(this.urls.UPDATE_TICKET_STATUS.replace(":id", id), data);
  };

  updateTicketPriority = (id: string, data: UpdateTicketPriorityBody) => {
    return this.apiService.update<
      UpdateTicketPriorityBody,
      UpdateTicketStatusRes
    >(this.urls.UPDATE_TICKET_PRIORITY.replace(":id", id), data);
  };

  deleteTicket = (id: string) => {
    return this.apiService.delete<DeleteTicketRes>(
      this.urls.DELETE_TICKET.replace(":id", id)
    );
  };

  replyTicket = (id: string, data: ReplyTicketBody) => {
    return this.apiService.post<ReplyTicketBody, ReplyTicketRes>(
      this.urls.REPLY_TICKET.replace(":id", id),
      data
    );
  };
}
