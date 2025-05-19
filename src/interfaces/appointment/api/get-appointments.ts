import { ApiSuccessResponse } from "@/interfaces/api-response";
import { PaginatedRes } from "@/interfaces/pagination";
import { Appointment } from "../store";

export type GetAppointmentsRes = ApiSuccessResponse & PaginatedRes<Appointment>;
