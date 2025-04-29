import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Reminder } from "../store";
import { PaginatedRes } from "@/interfaces/pagination";

export type GetRemindersRes = ApiSuccessResponse & PaginatedRes<Reminder>;
