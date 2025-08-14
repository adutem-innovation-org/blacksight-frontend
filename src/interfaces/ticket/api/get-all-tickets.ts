import { ApiSuccessResponse } from "@/interfaces/api-response";
import { PaginatedRes } from "@/interfaces/pagination";
import { Ticket } from "../store";

export type GetAllTicketsRes = ApiSuccessResponse & PaginatedRes<Ticket>;
