import { ApiSuccessResponse } from "@/interfaces/api-response";
import { IReminder } from "../store";
import { PaginatedRes } from "@/interfaces/pagination";

export type GetRemindersRes = ApiSuccessResponse & PaginatedRes<IReminder>;
