import { PaginatedRes } from "@/interfaces/pagination";
import { EmailTemplate } from "../store";
import { ApiSuccessResponse } from "@/interfaces/api-response";

export type GetTemplatesRes = ApiSuccessResponse & PaginatedRes<EmailTemplate>;
